const { verifyToken, verifyTokenAuth, verifyTokenAuthAdmin } = require('./verifyToken');
const Order = require("../models/Order");

const router = require('express').Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//UPDATE
router.put("/:id", verifyTokenAuthAdmin, async (req, res)=>{   

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id , {
            $set: req.body
        }, 
        { new:true });
        res.status(200).json(updatedOrder);
    } catch(err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAuthAdmin, async (req, res) =>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order successfully deleted!");
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAuth, async (req, res)=>{
    try {
        const orders = await Order.find({userId: req.params.userId});        
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS 

router.get("/" , verifyTokenAuthAdmin, async (req, res) =>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME

router.get("/income" , verifyTokenAuthAdmin, async (req, res)=>{
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const perMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
       const income = await Order.aggregate([
         { $match:{ createdAt: { $gte: perMonth }, 
         ...(productId && {
            products:{$elemMatch:{productId}}
         }) 
        } 
    },
         {
            $project: {
                month: { $month: "$createdAt"},
                sales:"$amount",
            }
        },
        {            
            $group: {
                _id:"$month",
                total: { $sum: "$sales" }
            }
        }            
                
       ]);

    res.status(200).json(income);
    } catch(err) {
        res.status(500).json(err);
    }
})



module.exports = router;