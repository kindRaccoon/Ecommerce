import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
    <Announcement/>
        <Navbar/>
        <Categories/>
        <Products/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home