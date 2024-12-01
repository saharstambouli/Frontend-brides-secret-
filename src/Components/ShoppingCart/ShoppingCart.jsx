import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import ShoppingBag from "./ShoppingBagSection/ShoppingBag";
import CheckoutForm from "./checkoutSection/Checkout";
import CartTotals from "./ShoppingCartTotals/ShoppingCartTotals";
import { purchase } from "../../APIS/user";
import { setPrice, setCart } from "../../Reducers/Cart/SliceCart";
import { removeFromCart } from "../../Reducers/Cartnotme/cartSlice";
import { deleteItemFromCart } from "../../APIS/cart";

const ShoppingCart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [cartProducts, setCartProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("cartTab1");
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartProductsFromFront = cart.map((userCart) =>
      products.find((product) => product._id === userCart.product._id)
    );
    setCartProducts(cartProductsFromFront);
  }, [cart, products]);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const productPrice = parseFloat(item.product.price);
      const productQuantity = item.quantity;
      return acc + (isNaN(productPrice) ? 0 : productPrice * productQuantity);
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleDeleteItem = async (productID) => {
    const isDeleted = await deleteItemFromCart(productID);
    if (isDeleted) {
      dispatch(removeFromCart(productID));
      const updatedCart = cart.filter((item) => item.product._id !== productID);
      dispatch(setCart(updatedCart));
      setCartProducts(updatedCart);
    } else {
      alert("Failed to delete item from cart");
    }
  };

  const handleQuantityChange = (productID, newQuantity) => {
    const productItem = cartProducts.find((item) => item._id === productID);
    if (newQuantity >= 1 && newQuantity <= productItem.quantity) {
      const updatedCart = cart.map((item) =>
        item.product._id === productID ? { ...item, quantity: newQuantity } : item
      );
      dispatch(setCart(updatedCart));
    } else {
      alert(`The maximum available quantity is ${productItem.quantity}.`);
    }
  };

  const increaseQuantity = (productID) => {
    const cartItem = cart.find((item) => item.product._id === productID);
    const productItem = cartProducts.find((item) => item._id === productID);
    if (cartItem.quantity < productItem.quantity) {
      handleQuantityChange(productID, cartItem.quantity + 1);
    } else {
      alert("Cannot increase quantity beyond available stock.");
    }
  };

  const decreaseQuantity = (productID) => {
    const cartItem = cart.find((item) => item.product._id === productID);
    handleQuantityChange(productID, cartItem.quantity > 1 ? cartItem.quantity - 1 : 1);
  };

  const handlePurchase = async () => {
    const res = await purchase();
    if (res) {
      alert("Payment Done");
      dispatch(setCart([]));
      dispatch(setPrice(0));
    } else {
      alert("Payment Failed");
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Simulate order confirmation data (replace with actual dynamic data as needed)
  const orderNumber = "ORD123456";
  const currentDate = new Date().toLocaleDateString();
  const selectedPayment = "Credit Card"; // Adjust based on actual payment method used

  return (
    <div className="shoppingCartTabsContainer">
      <div className={`shoppingCartTabs ${activeTab}`}>
        <button
          className={activeTab === "cartTab1" ? "active" : ""}
          onClick={() => handleTabClick("cartTab1")}
        >
          <div className="shoppingCartTabsNumber">
            {/* <h3>01</h3> */}
            <div className="shoppingCartTabsHeading">
              <h3>Shopping Bag</h3>
              <p>Manage Your Items List</p>
            </div>
          </div>
        </button>
        <button
          className={activeTab === "cartTab2" ? "active" : ""}
          onClick={() => handleTabClick("cartTab2")}
          disabled={cart.length === 0}
        >
          {/* <div className="shoppingCartTabsNumber">
            <h3>02</h3>
            <div className="shoppingCartTabsHeading">
              <h3>Shipping and Checkout</h3>
              <p>Checkout Your Items List</p>
            </div>
          </div> */}
        </button>
        <button
          className={activeTab === "cartTab3" ? "active" : ""}
          onClick={() => handleTabClick("cartTab3")}
          disabled={cart.length === 0}
        >
          {/* <div className="shoppingCartTabsNumber">
            <h3>02</h3>
            <div className="shoppingCartTabsHeading">
              <h3>Confirmation</h3>
              <p>Review and Submit Your Order</p>
            </div>
          </div> */}
        </button>
      </div>

      <div className="shoppingCartTabsContent">
        {activeTab === "cartTab1" && (
          <div className="shoppingCartContent">
            <ShoppingBag
              cart={cart}
              cartProducts={cartProducts}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              handleQuantityChange={handleQuantityChange}
              handleDeleteItem={handleDeleteItem}
              scrollToTop={scrollToTop}
            />
            <CartTotals
              totalPrice={totalPrice}
              cart={cart}
              handleTabClick={handleTabClick}
              scrollToTop={scrollToTop}
              handlePurchase={handlePurchase}
            />
          </div>
        )}

        {/* {activeTab === "cartTab2" && (
           <div className="checkoutContent">
           <CheckoutForm 
             cartProducts={cartProducts}
             totalPrice={totalPrice}
             handlePurchase={handlePurchase} 
             handleTabClick={handleTabClick}
             activeTab={activeTab} // Passing activeTab
             scrollToTop={scrollToTop}
           />
         </div>
        )} */}

        {/* {activeTab === "cartTab3" && (
          <div className="confirmationContent">
            <h2>Order Confirmation</h2>
            <p>Your order has been successfully placed. Thank you for shopping with us!</p>
            <div className="orderInfo">
              <div className="orderInfoItem">
                <p>Order Number</p>
                <h4>{orderNumber}</h4>
              </div>
              <div className="orderInfoItem">
                <p>Date</p>
                <h4>{currentDate}</h4>
              </div>
              <div className="orderInfoItem">
                <p>Total</p>
                <h4>${totalPrice.toFixed(2)}</h4>
              </div>
              <div className="orderInfoItem">
                <p>Payment Method</p>
                <h4>{selectedPayment}</h4>
              </div>
            </div>
            <div className="orderTotalContainer">
              <h3>Order Details</h3>
              <div className="orderItems">
                <table>
                  <thead>
                    <tr>
                      <th>PRODUCTS</th>
                      <th>SUBTOTALS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.productName} x {item.quantity}
                        </td>
                        <td>${(item.productPrice * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="orderTotal">
                <table>
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>$5</td>
                    </tr>
                    <tr>
                      <th>VAT</th>
                      <td>$11</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>${(totalPrice + 16).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ShoppingCart;
