import axios from "axios";

export async function addProductToCart(productID, quantity) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.patch(
      `${process.env.REACT_APP_API_ENDPOINT}/user/addToCart`,
     
      { productID, quantity },
      { headers }
    );
    
    // Check for status code and return the cart data if it's successful
    if (response.status === 200) {
      return response.data; // Return the updated cart data
    } else {
      console.error("Unexpected status code:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error while adding to cart:", error);
    return null; // Return null in case of error
  }
}



export async function deleteItemFromCart(productID) {
  try {
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage

      if (!token) {
          console.error("No token found in localStorage");
          return false; // Return false if no token is available
      }

      const headers = {
          'Authorization': `Bearer ${token}`, // Attach the token to the Authorization header
          'Content-Type': 'application/json'   // Set Content-Type to JSON
      };

      // Send DELETE request with productID in the body
      const response = await axios.delete( `${process.env.REACT_APP_API_ENDPOINT}/user/deleteFromCart`, {
          headers,
          data: { productID }  // Send productID in the request body
      });

      // Check if the response status is 200 (successfully deleted)
      if (response.status === 200) {
          console.log('Product successfully deleted from cart');
          return true; // Return true to indicate successful deletion
      } else {
          console.error('Error deleting product from cart');
          return false; // Return false if something went wrong
      }
  } catch (error) {
      console.error('Error in deleteItemFromCart:', error);
      return false; // Return false if an error occurs during the request
  }
}
