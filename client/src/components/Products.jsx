import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from 'axios';
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

function Products({cat, filter, sort}) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setfilteredProducts] = useState([]);

    useEffect(() =>{
        const getProducts = async () =>{
            try {
                const res = await axios.get( 
                    cat ? `http://localhost:5000/api/products?category=${cat}` 
                : "http://localhost:5000/api/products"
            );
            setProducts(res.data);
            } catch (err) {

            }
        }
        getProducts();
    },[cat]);

    useEffect(() =>{
        cat && setfilteredProducts(
            products.filter(item => Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
            )
          )
        )
    },[products, cat, filter ]);

    useEffect(() =>{
        if(sort === "newest") {
            setfilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if(sort === "asc") {
                setfilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
                )            
        } else {
            setfilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
            );
        }    
    },[sort]);

  return (
   <Container>
     {cat ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products.slice(0, 8).map((item) =><Product item={item} key={item._id} />)
        }
   </Container>
  )
}

export default Products