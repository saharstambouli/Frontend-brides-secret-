// import React, { useState } from "react";
// import "./ShopDetails.css";

// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../Features/Cart/cartSlice";
// import { addToWishList, removeFromWishList } from "../../../Features/Wishlist/wishListSlice";

// import Filter from "../Filters/Filter";
// import { Link } from "react-router-dom";
// import StoreData from "../../../Data/StoreData";
// import { FiHeart } from "react-icons/fi";
// import { FaStar } from "react-icons/fa";
// import { IoFilterSharp, IoClose } from "react-icons/io5";
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
// import { FaCartPlus } from "react-icons/fa";
// import toast from "react-hot-toast";

// const ShopDetails = () => {
//   const dispatch = useDispatch();

//   const wishlistItems = useSelector((state) => state.wishlist.items);
//   const cartItems = useSelector((state) => state.cart.items);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const handleWishlistClick = (product) => {
//     const isInWishlist = wishlistItems.some((item) => item.id === product.id);

//     if (isInWishlist) {
//       dispatch(removeFromWishList(product));
//       toast.error("Removed from wishlist", {
//         duration: 2000,
//         style: {
//           backgroundColor: "#ff4b4b",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#ff4b4b",
//         },
//       });
//     } else {
//       dispatch(addToWishList(product));
//       toast.success("Added to wishlist!", {
//         duration: 2000,
//         style: {
//           backgroundColor: "#07bc0c",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#07bc0c",
//         },
//       });
//     }
//   };

//   const handleAddToCart = (product) => {
//     const productInCart = cartItems.find(
//       (item) => item.productID === product.productID
//     );

//     if (productInCart && productInCart.quantity >= 20) {
//       toast.error("Product limit reached", {
//         duration: 2000,
//         style: {
//           backgroundColor: "#ff4b4b",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#ff4b4b",
//         },
//       });
//     } else {
//       dispatch(addToCart(product));
//       toast.success("Added to cart!", {
//         duration: 2000,
//         style: {
//           backgroundColor: "#07bc0c",
//           color: "white",
//         },
//         iconTheme: {
//           primary: "#fff",
//           secondary: "#07bc0c",
//         },
//       });
//     }
//   };

//   return (
//     <>
//       <div className="shopDetails">
//         <div className="shopDetailMain">
//           <div className="shopDetails__left">
//             <Filter />
//           </div>
//           <div className="shopDetails__right">
//             <div className="shopDetailsSorting">
//               <div className="shopDetailsBreadcrumbLink">
//                 <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//                   Home
//                 </Link>
//                 &nbsp;/&nbsp;
//                 <Link to="/shop">The Shop</Link>
//               </div>
//               <div className="filterLeft" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
//                 <IoFilterSharp />
//                 <p>Filter</p>
//               </div>
//               <div className="shopDetailsSort">
//                 <select name="sort" id="sort">
//                   <option value="default">Default Sorting</option>
//                   <option value="Featured">Featured</option>
//                   <option value="bestSelling">Best Selling</option>
//                 </select>
//               </div>
//             </div>
//             <div className="shopDetailsProducts">
//               <div className="shopDetailsProductsContainer">
//                 {StoreData.slice(0, 6).map((product) => {
//                   const isInWishlist = wishlistItems.some((item) => item.id === product.id);

//                   return (
//                     <div key={product.id} className="sdProductContainer">
//                       <div className="sdProductImages">
//                         <Link to="/Product" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//                           <img
//                             src={product.frontImg}
//                             alt=""
//                             className="sdProduct_front"
//                           />
//                           <img
//                             src={product.backImg}
//                             alt=""
//                             className="sdProduct_back"
//                           />
//                         </Link>
//                         <h4 onClick={() => handleAddToCart(product)}>
//                           Add to Cart
//                         </h4>
//                       </div>
//                       <div
//                         className="sdProductImagesCart"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <FaCartPlus />
//                       </div>
//                       <div className="sdProductInfo">
//                         <div className="sdProductCategoryWishlist">
//                           <p>Dresses</p>
//                           <FiHeart
//                             onClick={() => handleWishlistClick(product)}
//                             style={{
//                               color: isInWishlist ? "red" : "#767676",
//                               cursor: "pointer",
//                             }}
//                           />
//                         </div>
//                         <div className="sdProductNameInfo">
//                           <Link to="/product" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
//                             <h5>{product.productName}</h5>
//                           </Link>
//                           <p>${product.productPrice}</p>
//                           <div className="sdProductRatingReviews">
//                             <div className="sdProductRatingStar">
//                               {[...Array(5)].map((_, i) => (
//                                 <FaStar key={i} color="#FEC78A" size={10} />
//                               ))}
//                             </div>
//                             <span>{product.productReviews}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
import React, { useState, useEffect } from "react";
import "./OrientalRental.css";
import Filter from "../../Components/Product/Filter/Filter";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleProduct } from "../../APIS/WishList";
import { setWishList } from "../../Reducers/Wishlist/wishListSlice";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  console.log("products", products);
  const { wishList } = useSelector((state) => state.wishList);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourite, setIsFavourite] = useState({});
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Update the `isFavourite` state whenever `wishList` changes in Redux
  useEffect(() => {
    const updatedFavourites = {};
    (wishList || []).forEach((id) => {
      updatedFavourites[id] = true;
    });
    setIsFavourite(updatedFavourites);
    setLoading(false);
  }, [wishList]);

  // Function to toggle favourite status
  const toggleFav = async (productId) => {
    if (isAuthenticated) {
      try {
        const updatedWishList = await toggleProduct(productId);

        if (Array.isArray(updatedWishList)) {
          dispatch(setWishList(updatedWishList)); // Update the wishlist in Redux

          // Update the local `isFavourite` state
          setIsFavourite((prevState) => ({
            ...prevState,
            [productId]: !prevState[productId],
          }));
        } else {
          console.error("Unexpected API response format:", updatedWishList);
        }
      } catch (error) {
        console.error("Failed to toggle favourite product:", error);
      }
    } else {
      console.error("User is not authenticated.");
    }
  };

  // Filter products by category "sale"
  const rentProducts = products?.filter((item) => item.category === "rent");
  const orientalProducts = rentProducts?.filter((item) => item.subcategory === "oriental");
  console.log("orientalProducts", orientalProducts);


  useEffect(() => {
    if (displayedProducts.length === 0) {
      setDisplayedProducts(orientalProducts);
    }
     }, [orientalProducts]);


  const handleFilterChange = (filteredProducts) => {
    if (filteredProducts.length > 0) {
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(orientalProducts);
    }
  };

  const handleFilterChangeByStyle = (filteredByStyle) => {
    if (filteredByStyle.length > 0) {
      setDisplayedProducts(filteredByStyle);
    } else {
      setDisplayedProducts(orientalProducts);
    }
    console.log("filteredByStyle parent ", filteredByStyle);
  };





  return (
    <div className="shopDetails">
      <div className="shopDetailMain">
        <div className="shopDetails__left">
          <Filter rentProducts={orientalProducts} 
             onFilterChange={handleFilterChange}
             onStyleChange={handleFilterChangeByStyle}
          
          />
        </div>
        <div className="shopDetails__right">
          <div className="shopDetailsSorting">
            <div className="shopDetailsBreadcrumbLink">
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Home
              </Link>
              {/* &nbsp;/&nbsp; */}
              {/* <Link to="/shop">The Shop</Link> */}
            </div>
            <div className="filterLeft">
              <IoFilterSharp />
              <p>Filter</p>
            </div>
          
          </div>
          <div className="shopDetailsProducts">
            <div className="shopDetailsProductsContainer">
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}

              {displayedProducts?.slice(0, 6).map((item) => (
                <div key={item._id} className="sdProductContainer">
                  <div className="sdProductImages">
                    <Link
                      to={`/productDetails/${item._id}`}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                      <img src={item.image} alt={item.name} className="sdProduct_front" />
                      <img src={item.image} alt={item.name} className="sdProduct_back" />
                    </Link>
                    <Link to={`/product availability/${item._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                      <h4>Check Availability</h4>
                    </Link>
                  </div>
                  <div className="sdProductImagesCart">
                    <FaCartPlus />
                  </div>
                  <div className="sdProductInfo">
                    <div className="sdProductCategoryWishlist">
                      <p>{item.category}</p>
                      <FiHeart
                        onClick={() => toggleFav(item._id)}
                        style={{
                          color: isFavourite[item._id] ? "red" : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className="sdProductNameInfo">
                      <Link
                        to={`/product/${item._id}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <h5>{item.name}</h5>
                      </Link>
                      <p>${item.price}</p>
                      <div className="sdProductRatingReviews">
                        <div className="sdProductRatingStar">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color="#FEC78A" size={10} />
                          ))}
                        </div>
                      </div>
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
