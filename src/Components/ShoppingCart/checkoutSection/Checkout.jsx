import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Checkout.css";
import { purchase } from "../../../APIS/user";
import { setPrice, setCart } from "../../../Reducers/Cart/SliceCart";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";




const CheckoutForm = ({ setPayments }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handlePurchase = async () => {
    // Validate formData
    // const { firstName, lastName, streetAddress, city, postcode, phone, email } = formData;
    // if (!firstName || !lastName || !streetAddress || !city || !postcode || !phone || !email) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    const res = await purchase();
    if (res) {
      alert("Payment Done");
      dispatch(setCart([]));
      dispatch(setPrice(0));
      navigate("/Confirmation");
    } else {
      alert("Payment Failed");
    }
  };



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    streetAddress: "",
    apt: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    notes: "",
    createAccount: false,
    shipToDifferentAddress: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  const handlePaymentChange = (e) => {
    // Handle payment method change
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.products);
  const [cartProducts, setCartProducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("cartTab1");

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

  if (!cartProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="shoppingCartTabs">
        <button
          className={activeTab === "cartTab1" ? "active" : ""}
          onClick={() => handleTabClick("cartTab1")}
        >
          <div className="shoppingCartTabsNumber">
            <h3>01</h3>
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
          <div className="shoppingCartTabsNumber">
            <h3>02</h3>
            <div className="shoppingCartTabsHeading">
              <h3>Shipping and Checkout</h3>
              <p>Checkout Your Items List</p>
            </div>
          </div>
        </button>
        <button
          className={activeTab === "cartTab3" ? "active" : ""}
          onClick={() => handleTabClick("cartTab3")}
          disabled={cart.length === 0}
        >
          <div className="shoppingCartTabsNumber">
            <h3>03</h3>
            <div className="shoppingCartTabsHeading">
              <h3>Confirmation</h3>
              <p>Review and Submit Your Order</p>
            </div>
          </div>
        </button>
      </div>
      <div className="checkoutSection">
        {/* Billing Details Section */}
        <div className="checkoutDetailsSection">
          <h4>Billing Details</h4>
          <div className="checkoutDetailsForm">
            <form>
              <div className="checkoutDetailsFormRow">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <input
                type="text"
                placeholder="Company Name (optional)"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="Country / Region" selected disabled>
                  Country / Region
                </option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Turkey">Turkey</option>
              </select>
              <input
                type="text"
                placeholder="Street Address*"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Apt, suite, unit (optional)"
                name="apt"
                value={formData.apt}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Town / City *"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Postcode / ZIP *"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Phone *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Your Mail *"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <div className="checkoutDetailsFormCheck">
                <label>
                  <input
                    type="checkbox"
                    name="createAccount"
                    checked={formData.createAccount}
                    onChange={handleInputChange}
                  />
                  <p>Create An Account?</p>
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="shipToDifferentAddress"
                    checked={formData.shipToDifferentAddress}
                    onChange={handleInputChange}
                  />
                  <p>Ship to a different Address</p>
                </label>
              </div>
              <textarea
                cols={30}
                rows={8}
                placeholder="Order Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </form>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="checkoutPaymentSection">
          <div className="checkoutTotalContainer">
            <h3>Your Order</h3>
            <div className="checkoutItems">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTS</th>
                    <th>SUBTOTALS</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((items, index) => (
                    <tr key={index}>
                      <td>{items.name}</td>
                      <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkoutTotal">
              <table>
                <tbody>
                  <tr>
                    <th>Shipping</th>
                    <td>$5</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>${(totalPrice + 5).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="checkoutPaymentContainer">
            <label>
              <input
                type="radio"
                name="payment"
                value="Direct Bank Transfer"
                defaultChecked
                onChange={handlePaymentChange}
              />
              <div className="checkoutPaymentMethod">
                <span>Direct Bank Transfer</span>
              </div>
            </label>
            <div className="checkoutPaymentMethod">
              <span>Direct Bank Transfer</span>
              <p>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </div>
            <label>
              <input
                type="radio"
                name="payment"
                value="Check Payments"
                onChange={handlePaymentChange}
              />
              <div className="checkoutPaymentMethod">
                <span>Check Payments</span>
              </div>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on delivery"
                onChange={handlePaymentChange}
              />
              <div className="checkoutPaymentMethod">
                <span>Cash on delivery</span>
              </div>
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Paypal"
                onChange={handlePaymentChange}
              />
              <div className="checkoutPaymentMethod">
                <span>Paypal</span>
              </div>
            </label>
            <div className="policyText">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link to="/terms" onClick={scrollToTop}>
                Privacy Policy
              </Link>
              .
            </div>
          </div>
          <button
            onClick={() => {
              handleTabClick("cartTab3");
              window.scrollTo({ top: 0, behavior: "smooth" });
              handlePurchase();
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;



{/* <Link
to="/Confirmation"
state={{ cartProducts, totalPrice}}
>
<button disabled={cart.length === 0}>
  Proceed to Checkout
</button>
</Link> */}