import axios from 'axios'
// axios.defaults.baseURL=" http://localhost:10000"


export async function toggleProduct(id) {
    try {
        const token = localStorage.getItem('token');
        
        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        const response = await axios.patch(`${process.env.REACT_APP_API_ENDPOINT}/user/toggleProduct`, { productID: id }, { headers });

        console.log("API Response:", response); // Log the full response

        if (response.status === 200) {
            // Return the updated wishlist from the response
            return response.data.wishList; 
        } else {
            console.log("Error in API response status:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error toggling product:", error);
        return null;
    }
}



export async function deleteItemFromWishList(productID) {
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
        const response = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/user/deleteFromWishList`, {
            headers,
            data: { productID }  // Send productID in the request body
        });
  
        // Check if the response status is 200 (successfully deleted)
        if (response.status === 200) {
            console.log('Product successfully deleted from wishlist');
            return true; // Return true to indicate successful deletion
        } else {
            console.error('Error deleting product from wishlist');
            return false; // Return false if something went wrong
        }
    } catch (error) {
        console.error('Error in deleteItemFromWishList:', error);
        return false; // Return false if an error occurs during the request
    }
  }
  
