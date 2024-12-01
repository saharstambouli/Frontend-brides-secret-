import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "../src/Pages/Home";
import About from "../src/Pages/About";
import Shop from "../src/Pages/Shop";
import RentCollection from "./Components/Rent Products/RentProducts";
import Contact from "../src/Pages/Contact";
import Blog from "../src/Pages/Blog";
import Header from "../src/Components/Header/Navbar";
import Footer from "../src/Components/Footer/Footer";
import ProductDetails from "./Pages/ProductDetails";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Authentication from "./Pages/Authentication";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import TermsConditions from "./Pages/TermsConditions";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import FavoriteProducts from "./Components/WishlistProducts/FavoriteProducts";
import Popup from "./Components/PopupBanner/Popup";
import Product from "./Components/Product/ProductMain/Product";
import MariageRental from "./Components/RentalMariage/MariageRental";
import OrientalRental from "./Components/RentalOriental/OrientalRental";
import CocktailRental from "./Components/RentalCocktail/CocktailRental";
import CheckoutForm from "./Components/ShoppingCart/checkoutSection/Checkout";
import ProductAvailability from "./Components/calender/ProductAvailability";
import Confirmation from "./Components/ShoppingCart/Confirmation/Confirmation";
import ProductForRent from "./Components/Product/ProductMain/ProductForRent";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";

import { useEffect } from "react";

import { Toaster } from "react-hot-toast";


const App = () => {


  useEffect(() => {
console.log("env", process.env.REACT_APP_API_ENDPOINT);
  }, []);

  return (
    <>
      <Popup />
      <ScrollToTop />


      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection-for-rent" element={<RentCollection />} />
          <Route path="/rental-mariage" element={<MariageRental/>} />
          <Route path="/rental-oriental" element={<OrientalRental />} />
          <Route path="/rental-cocktail" element={<CocktailRental />} />
          <Route path="/collection-for-sale" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/productDetails/:id" element={<ProductForRent/>} />
           <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element ={<ResetPass/>} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/wishlist" element={<FavoriteProducts/>} />
          <Route path="*" element={<NotFound />} />
         <Route path="/product availability/:id" element={<ProductAvailability />} />
         <Route path="/Confirmation" element={<Confirmation />} />
         <Route path="/UpdatePassword" element={<UpdatePassword />} />


        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
