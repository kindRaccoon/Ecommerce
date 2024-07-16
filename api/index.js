const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const productCart = require("./routes/cart");
const productOrder = require("./routes/order");
const paymentRoute = require("./routes/stripe");
const cors = require('cors');

const port = process.env.PORT || 5000;


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", productCart);
app.use("/api/orders", productOrder);
app.use("/api/" , paymentRoute);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("mongoose connected"))
.catch((err)=>{
    console.log(err);
});

app.listen(port, ()=>{
    console.log(`server listen on port ${port}`); 
});

