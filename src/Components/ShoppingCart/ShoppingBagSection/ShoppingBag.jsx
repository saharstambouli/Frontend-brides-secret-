import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import "./ShoppingBag.css";

const ShoppingBag = ({
  cart,
  cartProducts,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  handleDeleteItem,
  scrollToTop,
}) => {
  return (
    <div className="shoppingBagTableSection">
      <table className="shoppingBagTable">
        <thead>
          <tr>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cartProducts?.map((item, index) => (
              <tr key={index}>
                <td data-label="Product">
                  <div className="shoppingBagTableImg">
                    <Link to="/product" onClick={scrollToTop}>
                      <img src={item.image} alt="" />
                    </Link>
                  </div>
                </td>
                <td data-label="">
                  <div className="shoppingBagTableProductDetail">
                    <Link to="/product" onClick={scrollToTop}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                </td>
                <td data-label="Price" style={{ textAlign: "center" }}>
                  ${item.price}
                </td>
                <td data-label="Quantity">
                  <div className="ShoppingBagTableQuantity">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={cartProducts[index]?.quantity }
                      value={cart[index]?.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item._id, parseInt(e.target.value))
                      }
                    />
                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </td>
                <td data-label="Subtotal">
                  <p style={{ textAlign: "center", fontWeight: "500" }}>
                    ${parseFloat(item.price) * cart[index].quantity}
                  </p>
                </td>
                <td data-label="">
                  <MdOutlineClose onClick={() => handleDeleteItem(item._id)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <div className="shoppingCartEmpty">
                  <span>Your cart is empty!</span>
                  <Link to="/shop" onClick={scrollToTop}>
                    <button>Shop Now</button>
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShoppingBag;