import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { toggleProduct } from "../../../APIS/WishList";
import { toggleFavourite } from "../../../Reducers/Wishlist/wishListSlice";
import { setWishList } from "../../../Reducers/Wishlist/wishListSlice";
import { addToCart, setCart } from "../../../Reducers/Cart/SliceCart";
import { getUser } from "../../../APIS/user";
import { addProductToCart } from "../../../APIS/cart";





const Trendy = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Filter products by category "rent"
  const saleProducts = products?.filter(item => item.category === "sale");
  // console.log("Sale Products:", saleProducts);

  //Filter products by subcategory 
  const mariageproducts = saleProducts?.filter(item => item.subcategory === "mariage");

  const orientalproducts = saleProducts?.filter(item => item.subcategory === "oriental");
  const cocktailproducts = saleProducts?.filter(item => item.subcategory === "cocktail");



  const [activeTab, setActiveTab] = useState("tab1");
  const { wishList } = useSelector((state) => state.wishList);
  const [isFavourite, setIsFavourite] = useState({});
  const [loading, setLoading] = useState(true);


  const { cart } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const [error, setError] = useState(null);
  const [isInCart, setIsInCart] = useState({});
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);



  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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






  return (
    <div className="trendyProducts">
      <h2>
        Our New <span>Collection</span>
      </h2>
      <div className="trendyTabs">
        <div className="tabs">
          <p
            onClick={() => handleTabClick("tab1")}
            className={activeTab === "tab1" ? "active" : ""}
          >
            All
          </p>
          <p
            onClick={() => handleTabClick("tab2")}
            className={activeTab === "tab2" ? "active" : ""}
          >
            Marriage
          </p>
          <p
            onClick={() => handleTabClick("tab3")}
            className={activeTab === "tab3" ? "active" : ""}
          >
            Oriental
          </p>
          <p
            onClick={() => handleTabClick("tab4")}
            className={activeTab === "tab4" ? "active" : ""}
          >
            Cocktail
          </p>
        </div>
        <div className="trendyTabContent">
          {/* Tab 1 */}
          {activeTab === "tab1" && (
            <div className="trendyMainContainer">
              {saleProducts.slice(0, 8).map((product) => (
                <div className="trendyProductContainer" key={product._id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_front"
                      />
                    </Link>
                    {/* <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4> */}
                    {/* Add to Cart Button */}
               
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    // onClick={() => handleAddToCart(product)}
                  >
                    <FaCartPlus />
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">
                         
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className={`addToCartButton ${isInCart[product._id] ? "added" : ""}`}
                    >
                      {isInCart[product._id] ? "Added" : "Add to Cart"}
                    </button>



                      <FiHeart
                        style={{
                          color: isFavourite[product._id] ? "#FF0000" : "#767676",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFav(product._id)}
                      />

                 

                    </div>



                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.name}</h5>
                      </Link>
                      <p>${product.price}</p>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color="#FEC78A" size={10} />
                          ))}
                        </div>
                        <span>{product.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tabs 2  */}
          {activeTab === "tab2" && (
            <div className="trendyMainContainer">
              {mariageproducts.slice(0, 8).map((product) => (
                <div className="trendyProductContainer" key={product._id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_front"
                      />
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_back"
                      />
                    </Link>
                    {/* <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    onClick={() => handleAddToCart(product)}
                  > */}
                    <FaCartPlus />
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">
                   
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className={`addToCartButton ${isInCart[product._id] ? "added" : ""}`}
                    >
                      {isInCart[product._id] ? "Added" : "Add to Cart"}
                    </button>


                      <FiHeart
                        style={{
                          color: isFavourite[product._id] ? "#FF0000" : "#767676",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFav(product._id)}
                      />

                      
                    </div>
                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.productName}</h5>
                      </Link>
                      <p>${product.productPrice}</p>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color="#FEC78A" size={10} />
                          ))}
                        </div>
                        <span>{product.productReviews}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tabs 3  */}


          {activeTab === "tab3" && (
            <div className="trendyMainContainer">
              {orientalproducts.slice(0, 8).map((product) => (
                <div className="trendyProductContainer" key={product._id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_front"
                      />
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_back"
                      />
                    </Link>
                    {/* <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    onClick={() => handleAddToCart(product)}
                  > */}
                    <FaCartPlus />
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className={`addToCartButton ${isInCart[product._id] ? "added" : ""}`}
                    >
                      {isInCart[product._id] ? "Added" : "Add to Cart"}
                    </button>

                      <FiHeart
                        style={{
                          color: isFavourite[product._id] ? "#FF0000" : "#767676",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFav(product._id)}
                      />
                    </div>
                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.name}</h5>
                      </Link>
                      <p>${product.price}</p>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color="#FEC78A" size={10} />
                          ))}
                        </div>
                        <span>{product.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}



          {/* Tabs 4  */}

          {activeTab === "tab4" && (
            <div className="trendyMainContainer">
              {cocktailproducts.slice(0, 8).map((product) => (
                <div className="trendyProductContainer" key={product._id}>
                  <div className="trendyProductImages">
                    <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_front"
                      />
                      <img
                        src={product.image}
                        alt=""
                        className="trendyProduct_back"
                      />
                    </Link>
                    {/* <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
                  </div>
                  <div
                    className="trendyProductImagesCart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaCartPlus /> */}
                  </div>
                  <div className="trendyProductInfo">
                    <div className="trendyProductCategoryWishlist">

                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className={`addToCartButton ${isInCart[product._id] ? "added" : ""}`}
                    >
                      {isInCart[product._id] ? "Added" : "Add to Cart"}
                    </button>



                      <p>Dresses</p>
                      <FiHeart
                        style={{
                          color: isFavourite[product._id] ? "#FF0000" : "#767676",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFav(product._id)}
                      />
                    </div>
                    <div className="trendyProductNameInfo">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <h5>{product.name}</h5>
                      </Link>
                      <p>${product.price}</p>
                      <div className="trendyProductRatingReviews">
                        <div className="trendyProductRatingStar">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} color="#FEC78A" size={10} />
                          ))}
                        </div>
                        <span>{product.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>
      </div>
      <div className="discoverMore">
        <Link to="/collection-for-rent" onClick={scrollToTop}>
          <button className="discoverMoreBtn">Discover More</button>
        </Link>
      </div>
    </div>
  );
};

export default Trendy;
