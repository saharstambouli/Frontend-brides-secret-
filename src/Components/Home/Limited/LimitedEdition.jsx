import React, { useState } from "react";
import "./LimitedEdition.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Reducers/Cartnotme/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import { toggleProduct } from "../../../APIS/WishList";
import { toggleFavourite } from "../../../Reducers/Wishlist/wishListSlice";
import { useEffect } from "react";
import { setWishList } from "../../../Reducers/Wishlist/wishListSlice";



import toast from "react-hot-toast";

const LimitedEdition = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishList } = useSelector((state) => state.wishList);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState({});

  const rentProducts = products?.filter((item) => item.category === "rent");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


/////////////////////////// ADD TO FAVORITE ///////////////////////////////

useEffect(() => {
  const updatedFavourites = {};
  (rentProducts || []).forEach((product) => {
    updatedFavourites[product._id] = wishList.includes(product._id);
  });
  setIsFavourite(updatedFavourites);
  setLoading(false);
}, [wishList, rentProducts]);

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


  return (
    <>
      <div className="limitedProductSection">
        <h2>
          What <span> You Liked The Most</span>
        </h2>
        <div className="limitedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
            {rentProducts.slice(1, 6).map((product) => {
              return (
                <SwiperSlide key={product.productID}>
                  <div className="lpContainer">
                    <div className="lpImageContainer">
                      <Link to="/Product" onClick={scrollToTop}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="lpImage"
                        />
                      </Link>
                      <Link to={`/product availability/${product._id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <h4>Check Availability</h4>
                      </Link>
                    </div>
                    <div className="sdProductImagesCart">
                      <FaCartPlus />
                    </div>
                    <div className="limitedProductInfo">
                      <div className="lpCategoryWishlist">
                        <p>Dresses</p>
                        <FiHeart
                          onClick={() => toggleFav(product._id)}
                          style={{
                            color: isFavourite[product._id]
                              ? "red"
                              : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="productNameInfo">
                        <Link to="/Product" onClick={scrollToTop}>
                          <h5>{product.name}</h5>
                        </Link>
                        <p>${product.price}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>

                          <span>{product.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default LimitedEdition;
