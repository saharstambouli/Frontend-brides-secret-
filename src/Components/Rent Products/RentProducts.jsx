import React, { useState, useEffect } from "react";
import "./RentProducts.css";
import Filter from "../FiltersforRent/FilterForRent";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleProduct } from "../../APIS/WishList";
import { setWishList } from "../../Reducers/Wishlist/wishListSlice";
import { toggleFavourite } from "../../Reducers/Wishlist/wishListSlice";


const RentCollection = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { wishList } = useSelector((state) => state.wishList);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);

  const [isFavourite, setIsFavourite] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter products by category "rent"
  const rentProducts = products?.filter(item => item.category === "rent");

  const [displayedProducts, setDisplayedProducts] = useState([]); // State for displayed products

  ///////////////////////////ADD TO FAVORITE ///////////////////////////////

  // Update the `isFavourite` state whenever `wishList` changes in Redux
  useEffect(() => {
    const updatedFavourites = {};
    (rentProducts || []).forEach((product) => {
      updatedFavourites[product._id] = wishList.includes(product._id);
    });
    setIsFavourite(updatedFavourites);
    setLoading(false);
    // console.log("Updated isFavourite state after product ID change:", updatedFavourites);
  }, [wishList, rentProducts]);

  // Toggle favourite status
  const toggleFav = async (productId) => {
    if (isAuthenticated) {
      try {
        const response = await toggleProduct(productId);
        console.log(response);
        if (response) {
          dispatch(toggleFavourite(productId));
        }
      } catch (error) {
        console.error("Failed to toggle favourite:", error);
      }
    } else {
      console.error("User is not authenticated.");
    }
  };

  ////////////////////////////////////FILTER BY CATEGORY ///////////////////////////////////

  // Initialize displayed products with sale products
  useEffect(() => {
    if (displayedProducts.length === 0) {
      setDisplayedProducts(rentProducts);
    }
  }, [rentProducts]);
  

  // Callback function to update displayed products based on filter selection
  const handleFilterChange = (filteredProducts) => {
    console.log("Filtered Products by category  in Parent: in shop component  ", filteredProducts);
    // setDisplayedProducts(filteredProducts.length > 0 ? filteredProducts : rentProducts);
    setDisplayedProducts([...filteredProducts]);

  };



  
  // Callback function to update displayed products based on filter selection
  const handleFilterChangeByStyle = (filteredByStyle) => {
    console.log("Filtered Products  By style in Parent: shop component ", filteredByStyle);
    if (filteredByStyle.length > 0) {
      setDisplayedProducts(filteredByStyle);
    } else {
      setDisplayedProducts(rentProducts);
    }
  };

/////////////////////////PRICE //////////////////


// Callback function to update displayed products based on price filter selection
const handlePriceChange = (filteredByPrice) => {
  console.log("Filtered Products By Price in Parent:", filteredByPrice);
  if (filteredByPrice.length > 0) {
    setDisplayedProducts(filteredByPrice);
  } else {
    setDisplayedProducts(rentProducts);
  }
};









  return (
    <div className="shopDetails">
      <div className="shopDetailMain">
        <div className="shopDetails__left">
          <Filter rentProducts={rentProducts} onFilterChange={handleFilterChange} onStyleChange={handleFilterChangeByStyle} onPriceChange={handlePriceChange} />
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
              {!loading && !error && products.length === 0 && <p>No products available in the rent category.</p>}  {/* Handle empty products */}

              {displayedProducts?.slice(0, 6).map((item) => (
                <div key={item._id} className="sdProductContainer">
                  <div className="sdProductImages">
                    <Link to={`/productDetails/${item._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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
                        style={{
                          color: isFavourite[item._id] ? "#FF0000" : "#767676",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleFav(item._id)}
                      />
                    </div>
                    <div className="sdProductNameInfo">
                      <Link to={`/product/${item._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
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

export default RentCollection;



