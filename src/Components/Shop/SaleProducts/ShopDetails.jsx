import React, { useState, useEffect } from "react";
import "./ShopDetails.css";
import Filter from "../Filtersfor sale/FilterForSale";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleProduct } from "../../../APIS/WishList"; // API function to toggle favorite
import { setWishList } from "../../../Reducers/Wishlist/wishListSlice"; // Redux action to set wishlist
import { addToCart, setCart } from "../../../Reducers/Cart/SliceCart";
import { getUser } from "../../../APIS/user";
import { addProductToCart } from "../../../APIS/cart";

import toast from "react-hot-toast";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState({});
  const [isInCart, setIsInCart] = useState({});
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Filter products for sale
  const saleProducts = products?.filter((item) => item.category === "sale");

  /////////////////////////// ADD TO FAVORITE ///////////////////////////////

  useEffect(() => {
    const updatedFavourites = {};
    (saleProducts || []).forEach((product) => {
      updatedFavourites[product._id] = wishList.includes(product._id);
    });
    setIsFavourite(updatedFavourites);
    setLoading(false);
  }, [wishList, saleProducts]);

  const toggleFav = async (productId) => {
    if (isAuthenticated) {
      try {
        const response = await toggleProduct(productId);
        if (response) {
          // Update wishlist in Redux store
          const updatedWishList = wishList.includes(productId)
            ? wishList.filter((id) => id !== productId)
            : [...wishList, productId];

          dispatch(setWishList(updatedWishList));

          // Corrected toast message
          toast.success(`Added to favorites!`, {
            duration: 2000,
            style: {
              backgroundColor: "#07bc0c",
              color: "white",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#07bc0c",
            },
          });

          // Optionally, sync with database if needed
          // await updateWishListInDatabase(updatedWishList);
        }
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    } else {
      console.error("User is not authenticated.");
    }
  };


  /////////////////////////// ADD TO CART ///////////////////////////////

  // Debugging: Log the initial products data
  useEffect(() => {
    // console.log("Redux Products:", products);
    // console.log("Filtered Sale Products:", saleProducts);
  }, [products, saleProducts]);

  // Update the `isInCart` state whenever the cart changes
  useEffect(() => {
    const updatedCart = {};
    cart.forEach((item) => {
      updatedCart[item._id] = true;
    });
    setIsInCart(updatedCart);
    console.log("Updated isInCart state:", updatedCart);
  }, [cart]);

  const handleAddToCart = async (productId) => {
    console.log("handleAddToCart triggered with product ID:", productId);

    if (isAuthenticated) {
      if (!saleProducts || saleProducts.length === 0) {
        console.error("Sale products not loaded yet or empty.");
        return;
      }

      const product = saleProducts.find((item) => item._id === productId);

      if (product) {
        console.log("Found product:", product);

        try {
          const quantity = 1; // Default quantity
          const response = await addProductToCart(product._id, quantity);
          console.log("API Response shop details :", response);


          if (response && response.cart) {
            // Fetch the updated cart from the user data
            const userResponse = await getUser();

            // Dispatch the updated cart to Redux state
            dispatch(setCart(userResponse.cart));

            toast.success(`Added to cart!`, {
              duration: 2000,
              style: {
                backgroundColor: "#07bc0c",
                color: "white",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#07bc0c",
              },
            });
          }
        } catch (error) {
          console.error("Error adding product to cart:", error);
          toast.error("An error occurred while adding the product to the cart.");
        }
      }
    } else {
      toast.error("You need to be logged in to add items to the cart.");
    }
  };


  //////////////////////////// FILTER BY CATEGORY ////////////////////////////////
  useEffect(() => {
    if (displayedProducts.length === 0) {
      setDisplayedProducts(saleProducts);
    }
     }, [saleProducts]);


  const handleFilterChange = (filteredProducts) => {
    if (filteredProducts.length > 0) {
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(saleProducts);
    }
  };

  const handleFilterChangeByStyle = (filteredByStyle) => {
    if (filteredByStyle.length > 0) {
      setDisplayedProducts(filteredByStyle);
    } else {
      setDisplayedProducts(saleProducts);
    }
  };

/////////////////////////PRICE //////////////////


// Callback function to update displayed products based on price filter selection
const handlePriceChange = (filteredByPrice) => {
  console.log("Filtered Products By Price in Parent:", filteredByPrice);
  if (filteredByPrice.length > 0) {
    setDisplayedProducts(filteredByPrice);
  } else {
    setDisplayedProducts(saleProducts);
  }
};








  return (
    <div className="shopDetails">
      <div className="shopDetailMain">
        <div className="shopDetails__left">
          <Filter
            saleProducts={saleProducts}
            onFilterChange={handleFilterChange}
            onStyleChange={handleFilterChangeByStyle}
            onPriceChange = {handlePriceChange}
          />
        </div>
        <div className="shopDetails__right">
          <div className="shopDetailsSorting">
            <div className="shopDetailsBreadcrumbLink">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Home
              </Link>
              {/* &nbsp;/&nbsp;
              <Link to="/shop">The Shop</Link> */}
            </div>
          </div>
          <div className="shopDetailsProducts">
            <div className="shopDetailsProductsContainer">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}

              {displayedProducts?.slice(0, 6).map((item) => (
                <div key={item._id} className="sdProductContainer">
                  <div className="sdProductImages">
                    <Link to={`/product/${item._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                     
                      <img src={item.image} alt={item.name} className="sdProduct_front" />
                      <img src={item.image} alt={item.name} className="sdProduct_back" />
                    </Link>


                    
                    {/* <h4 >Add to Cart</h4>
                  </div>
                  <div className="sdProductImagesCart">
                    <FaCartPlus
                      onClick={() => handleAddToCart(item._id)}
                      style={{
                        color: isInCart[item._id] ? "green" : "#767676",
                        cursor: "pointer",
                      }}
                    /> */}

                  </div>
              
                  <div className="sdProductInfo">
                    <div className="sdProductCategoryWishlist">
                    
                         {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className={`addToCartButton ${isInCart[item._id] ? "added" : ""}`}
                    >
                      {isInCart[item._id] ? "Added" : "Add to Cart"}
                    </button>
                      <FiHeart
                        onClick={() => toggleFav(item._id)}
                        style={{
                          color: isFavourite[item._id] ? "red" : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="sdProductNameInfo">
                      <Link to={`/product/${item._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <h5>{item.name}</h5>
                      </Link>
                      <p>${item.price}</p>
                    </div>

                 
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
