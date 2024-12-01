
import React, { useState, useEffect } from "react";
import "./CocktailRental.css";
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
  const cocktailProducts = rentProducts?.filter((item) => item.subcategory === "cocktail");
  console.log("cocktailProducts", cocktailProducts);


  useEffect(() => {
    if (displayedProducts.length === 0) {
      setDisplayedProducts(cocktailProducts);
    }
     }, [cocktailProducts]);


  const handleFilterChange = (filteredProducts) => {
    if (filteredProducts.length > 0) {
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(cocktailProducts);
    }
  };

  const handleFilterChangeByStyle = (filteredByStyle) => {
    if (filteredByStyle.length > 0) {
      setDisplayedProducts(filteredByStyle);
    } else {
      setDisplayedProducts(cocktailProducts);
    }
    console.log("filteredByStyle parent ", filteredByStyle);
  };





  return (
    <div className="shopDetails">
      <div className="shopDetailMain">
        <div className="shopDetails__left">
          <Filter rentProducts={cocktailProducts} 
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
