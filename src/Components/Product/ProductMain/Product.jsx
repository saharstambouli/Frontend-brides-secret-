import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Reducers/Cartnotme/cartSlice";
import { toggleFavourite } from "../../../Reducers/Wishlist/wishListSlice";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getProductByID } from "../../../APIS/product";
import { toggleProduct } from "../../../APIS/WishList";
import { setCart } from "../../../Reducers/Cart/SliceCart";
import { getUser } from "../../../APIS/user";
import { addProductToCart } from "../../../APIS/cart";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState({});
  const [error, setError] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const { wishList } = useSelector((state) => state.wishList);
  const [isFavourite, setIsFavourite] = useState(false);

  // Fetch product details by ID on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductByID(id);
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Update `isFavourite` state based on the wishlist
  useEffect(() => {
    if (id && wishList) {
      setIsFavourite(wishList.includes(id));
    }
  }, [wishList, id]);

  // Toggle Wishlist Function
  const toggleFav = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add products to your wishlist.", {
        duration: 2000,
      });
      return;
    }

    try {
      const updatedWishlist = await toggleProduct(id);
      if (updatedWishlist) {
        dispatch(toggleFavourite(id));
        setIsFavourite(!isFavourite);
        toast.success(
          isFavourite ? "Removed from Wishlist" : "Added to Wishlist",
          { duration: 2000 }
        );
      } else {
        toast.error("Failed to update wishlist.");
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
      toast.error("An error occurred while updating your wishlist.");
    }
  };
  /////////////////////////////ADD TO CART ////////////////////////////////////////////////

  // Update the `isInCart` state whenever the cart changes

  useEffect(() => {
    if (id && cart) {
      let exist = cart.includes(id);

      setIsInCart(exist);
    }
  }, [cart, id]);



  // Add to Cart 
  const handleAddToCart = async () => {
    console.log("handleAddToCart triggered with product ID:", id);
  
    if (!isAuthenticated) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
  
    try {
      const quantity = 1; // Default quantity
      const response = await addProductToCart(id, quantity);
      console.log("API Response:", response);
  
      // Log the response to inspect its structure
      console.log("API Response:", response);
  
      // Ensure response has the expected data (cart)
      if (response && response.cart) {
        // Update the Redux store with the new cart data
        dispatch(setCart(response.cart));
        setIsInCart(true); // Update the local state
        toast.success("Product added to cart successfully!");
      } else {
        console.error("Error: Cart not updated in response.");
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };
  


  return (
    <div className="productSection">
      <div className="productShowCase">
        <div className="productGallery">
          <div className="productFullImg">
            {product ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <p>Loading product image...</p>
            )}
          </div>
        </div>
        <div className="productDetails">
          <div className="productBreadcrumb">
            <div className="breadcrumbLink">
              <Link to="/">Home</Link>&nbsp;/&nbsp;
              <Link to="/shop">The Shop</Link>
            </div>
            <div className="prevNextLink">
              {product ? (
                <>
                  <Link to={`/product/${product._id}`}>
                    <GoChevronLeft />
                    <p>Prev</p>
                  </Link>
                  <Link to={`/product/${product._id}`}>
                    <p>Next</p>
                    <GoChevronRight />
                  </Link>
                </>
              ) : (
                <p>Loading navigation links...</p>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="productName">
            <h1>{product?.name || "Loading product name..."}</h1>
          </div>

          {/* Product Rating */}
          <div className="productRating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color="#FEC78A" size={10} />
            ))}
            <p>8k+ reviews</p>
          </div>

          {/* Product Price */}
          <div className="productPrice">
            <h3>${product?.price || "Loading price..."}</h3>
          </div>

      

          {/* Add to Cart Button */}
          <div className="productCartQuantity">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>

          {/* Wishlist and Share Buttons */}
          <div className="productWishShare">
            <button onClick={toggleFav} className="productWishList">
              <FiHeart color={isFavourite ? "red" : ""} size={17} />
              <p>{isFavourite ? "Remove from Wishlist" : "Add to Wishlist"}</p>
            </button>
            <div className="productShare">
              <PiShareNetworkLight size={22} />
              <p>Share</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Product;
