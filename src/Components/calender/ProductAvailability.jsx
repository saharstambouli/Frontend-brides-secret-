import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../Reducers/Cart/SliceCart";
import { toggleFavourite } from "../../Reducers/Wishlist/wishListSlice";
import { FiHeart } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductByID } from "../../APIS/product";
import { toggleProduct } from "../../APIS/WishList";
import { addProductToCart } from "../../APIS/cart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ProductAvailability.css";
import axios from "axios";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [rents, setRents] = useState([]);
    const { cart } = useSelector((state) => state.cart);
    const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
    const { wishList } = useSelector((state) => state.wishList);

    // Fetch product details and rents data by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const productData = await getProductByID(id);
                const rentsData = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getrents/${id}`);

                if (productData) {
                    setProduct(productData);
                } else {
                    setError("Product not found");
                }

                setRents(rentsData.data);
            } catch (err) {
                setError("Failed to load product details or availability data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Update `isFavourite` and `isInCart` states based on wishlist and cart
    useEffect(() => {
        if (id && wishList) {
            setIsFavourite(wishList.includes(id));
        }
        if (id && cart) {
            setIsInCart(cart.includes(id));
        }
    }, [wishList, cart, id]);

    // Toggle Wishlist Function
    const toggleFav = async () => {
        if (!isAuthenticated) {
            toast.error("Please log in to add products to your wishlist.");
            return;
        }

        try {
            const updatedWishlist = await toggleProduct(id);
            if (updatedWishlist) {
                dispatch(toggleFavourite(id));
                setIsFavourite(!isFavourite);
                toast.success(isFavourite ? "Removed from Wishlist" : "Added to Wishlist");
            } else {
                toast.error("Failed to update wishlist.");
            }
        } catch (error) {
            toast.error("An error occurred while updating your wishlist.");
        }
    };

    // Add to Cart Function
    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error("You need to be logged in to add items to the cart.");
            return;
        }

        try {
            const quantity = 1;
            const response = await addProductToCart(id, quantity);

            if (response && response.cart) {
                dispatch(setCart(response.cart));
                setIsInCart(true);
                toast.success("Product added to cart successfully!");
            } else {
                toast.error("Failed to add product to cart.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the product to the cart.");
        }
    };

    // Helper function to check if a date is booked
    const isDateBooked = (date) => {
        return rents.some((rent) => {
            const start = new Date(rent.startDate);
            const end = new Date(rent.endDate);
            return date >= start && date <= end;
        });
    };

    // Tile styling for the calendar
    const tileClassName = ({ date }) => {
        return isDateBooked(date) ? "booked-date" : "available-date";
    };

    /////////////////////////////CONTACT THE STORE///////////////////////////////////////////

    // Open WhatsApp chat
    const handleContactStore = () => {
        const message = `Hello, I'm interested in your product: ${product?.name}. Can you provide more details?`;
        const phoneNumber = "+21627724062";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };






    return (
        <div className="productSection">
            <div className="productShowCase">
                {/* Product Image Gallery */}
                <div className="productGallery">
                    <div className="productFullImg">
                        {product ? (
                            <img src={product.image} alt={product.name} />
                        ) : (
                            <p>Loading product image...</p>
                        )}
                    </div>
                </div>
                <div className="rightsection">
                    {/* Calendar Section */}
                    <div className="productAvailabilityCalendar">
                        <h3>Check Availability</h3>
                        {loading && <p>Loading calendar...</p>}
                        {error && <p>{error}</p>}
                        {!loading && !error && (
                            <Calendar
                                tileClassName={tileClassName}
                                minDate={new Date()}
                            />
                        )}
                    </div>
                    <div className="Contact">
                        {/* Contact the Store Button */}
                        <div className="productContactStore">
                            <button onClick={handleContactStore}>
                                <FaWhatsapp size={20} color="green" />
                                <span>Contact the Store</span>
                            </button>
                        </div>

                        {/* Add to Wishlist Button */}
                        <div className="productWishList">
                            <button onClick={toggleFav}>
                                <FiHeart color={isFavourite ? "red" : ""} size={17} />
                                {isFavourite ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="productDetails">
                <h1>{product?.name || "Loading product name..."}</h1>
                <h3>${product?.price || "Loading price..."}</h3>
            </div>
        </div>
    );

};

export default Product;
