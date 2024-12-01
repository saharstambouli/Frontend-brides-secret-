import React, { useEffect, useState } from "react";
import "./FavoriteProducts.css";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import {  getUser } from "../../APIS/user";
import { addProductToCart } from "../../APIS/cart";
import { setCart } from "../../Reducers/Cart/SliceCart";
import {deleteFromWishList ,setWishList} from "../../Reducers/Wishlist/wishListSlice";
import {deleteItemFromWishList} from "../../APIS/WishList";


// Function to fetch product by ID (make sure this is defined somewhere)
const getProductByID = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproduct/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const FavoriteProducts = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.wishList);
  console.log("Wishlist:", wishList);
  const { cart } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const [products, setProducts] = useState([]);
  const [isInCart, setIsInCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [wishlistProducts, setWishListProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = [];

      // Fetch each product by ID
      for (const id of wishList) {
        try {
          const product = await getProductByID(id);
          if (product) {
            fetchedProducts.push(product);
        
          } else {
            console.warn(`⚠️ Product not found for ID: ${id}`);
          }
        } catch (error) {
          console.error(`❌ Error fetching product with ID ${id}:`, error);
        }
      }

      setProducts(fetchedProducts);
    };

    if (wishList.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [wishList]);

 /////////////////////////// ADD TO CART ///////////////////////////////


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
      try {
        const quantity = 1;
        const response = await addProductToCart(productId, quantity);
        console.log("API Response:", response);
  
        if (response && response.cart) {
          // Fetch the updated cart from the user data
          const userResponse = await getUser();
          console.log("User data after adding to cart:", userResponse);
  
          // Dispatch the updated cart to Redux state
          dispatch(setCart(userResponse.cart));
          console.log("Redux cart updated:", userResponse.cart);
  
          toast.success("Added to cart successfully!");
        } else {
          console.error("Invalid API response:", response);
          toast.error("Failed to add product to cart.");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("An error occurred while adding the product to the cart.");
      }
    } else {
      toast.error("You need to be logged in to add items to the cart.");
    }
  };


  /////////////////////////// REMOVE FROM WISHLIST ///////////////////////////////


  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = [];
      for (const id of wishList) {
        const product = await getProductByID(id);
        if (product) fetchedProducts.push(product);
      }
      setProducts(fetchedProducts);
    };
  
    if (wishList.length > 0) {
      fetchProducts();
    } else {
      setProducts([]); // Clear products if wishlist is empty
    }
  }, [wishList]);
  



  const handleRemoveFromWishlist = async (productID) => {
    try {
      console.log("Attempting to delete item from wishlist with ID:", productID);
      const isDeleted = await deleteItemFromWishList(productID);
  
      // Check if the API returned a truthy value (like true) for deletion success
      if (isDeleted === true || isDeleted?.success || isDeleted?.status === 200) {
        console.log("Product successfully deleted from wishlist");
  

        dispatch(deleteFromWishList(productID));

// Re-fetch products based on updated wishList
const updatedWishList = wishList.filter((id) => id !== productID);
const updatedProducts = products.filter((product) => updatedWishList.includes(product._id));
setProducts(updatedProducts);


  
        toast.success("Removed from wishlist!", {
          duration: 2000,
          style: {
            backgroundColor: "#e63946",
            color: "white",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#e63946",
          },
        });
      } else {
        console.error("Unexpected API response:", isDeleted);
        toast.error("Failed to delete item from wishlist.");
      }
    } catch (error) {
      console.error("Error while deleting item from wishlist:", error);
      toast.error("An error occurred while deleting the item from wishlist.");
    }
  };
  


  return (
    <div>
      <div className="shoppingCartSection">
        <h2>Favorites</h2>
        <div className="shoppingCartTabsContainer">
        
          <div className="shoppingCartTabsContent">
            <div className="shoppingBagSection">
              <div className="shoppingBagTableSection">
                <table className="shoppingBagTable">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th></th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td data-label="Product">
                            <div className="shoppingBagTableImg">
                              <Link to={`/product/${product._id}`}>
                                <img src={product.image} alt={product.name} />
                              </Link>
                            </div>
                          </td>
                          <td data-label="">
                            <div className="shoppingBagTableProductDetail">
                              <Link to={`/product/${product._id}`}>
                                <h4>{product.name}</h4>
                              </Link>
                              
                            </div>
                          </td>
                          <td data-label="Price" style={{ textAlign: "center" }}>
                            ${product.price}
                          </td>
                          <td data-label="">
                            <div className="actionButtons">
                              <button
                                className="addToCartButton"
                                onClick={() => handleAddToCart(product._id)}

                              >
                                Add to Cart
                              </button>
                            
                            </div>
                            
                          </td>
                          <MdOutlineClose className="removeIcon"
                           onClick={() => handleRemoveFromWishlist(product._id)}
                              />
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          Your wishlist is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProducts;
