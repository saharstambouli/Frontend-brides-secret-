import axios from 'axios';

export async function login(email, password) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, { email, password });
        console.log("API Response:", response); 
        if (response.status === 200) {
            return response.data;
        } else {
            return {}; 
        }
    } catch (error) {
        console.log("Login error:", error); 
        if (error.response?.status === 404) {
            return { email: 'User with this email does not exist' };
        } else if (error.response?.status === 401) {
            return { password: "Invalid password" };
        } else {
            return { general: "An error occurred. Please try again." };
        }
    }
}

export async function getUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/getuser`, { headers });
        console.log("API Response:", response); // Check full response
        if (response.status === 200) {
            return response.data;
        } else {
            return null; 
        }
    } catch (error) {
         console.log("Get User error:", error); 
        
        return false;
    }
}

export async function register(data) {
    console.log(data);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/register`, data)
        if (response.status == 201) {
            return { success: "User Registered" };
        }
    } catch (error) {

        if (error.status == 409) {

            return { email: "User with this email already exists" }
        }
        else {
            return { message: "Registration failed" };
        }
    }
}
 



export async function forgotPassword(email) {
    try {
        const respnse = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/forgetPassword`, { email });
        if (respnse.status == 201) {
            return { success: "Link has been sent" }
        }
    }
    catch (error) {
        if (error.status == 404) {
            return { email: "User not found" }
        }
    }
}

export async function resetPassword(tokenPass, newPassword) {
    try {
        const headers = {
            'Authorization': `Bearer ${tokenPass}`
        }
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/resetPassword`, { newPassword }, { headers })
        if (response.status == 201) {
            return { success: "Password Changed Successfully" };
        }
    } catch (error) {
        if (error.status == 409) {
            return { password: "New Password can't be the same old Password" }
        }
        else if (error.status == 400)
            return { failure: "Link Already Used Or Expired" }
    }
}


export async function purchase() {
    try {
        const token = localStorage.getItem('token');
        console.log("Token: ", token); 

        if (!token) {
            throw new Error('No token found');  
        }

        const headers = {
            'Authorization': `Bearer ${token}`  
        };

        // Pass headers as the third argument, body empty
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/purchase`, {}, { headers });

        console.log('Response from API:', response); 

        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Failed to complete purchase');
        }

    } catch (error) {
        console.log("Error during purchase process:", error);  
        return { success: false, message: "Error during purchase process", error: error.message };
    }
}




export const sendNewsletterSubscription = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/send-newsletter`, { email });
      console.log("Response from backend:", response.data); 

      return response.data;
    } catch (error) {
      if (error.response) {
        // Backend returned a response
        console.error("Error response from backend:", error.response.data);
        alert(error.response.data.message || "There was an issue sending the email.");
      } else {
        // Error in sending the request itself
        console.error("Error sending request:", error.message);
        alert("There was an error. Please try again later.");
      }
    }
  };


  export const updatePassword = async (oldPassword, newPassword) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/updatePassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { success: response.data.message };
    } catch (error) {
       
      return { message: error.response.data.message };
      }
    };


    export const sendMessages = async (email, name, message) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user/send-messages`, { email, name, message });
          console.log("Response from backend:", response.data);
      
          if (response.data.success) {
            // Handle success, such as showing a confirmation message to the user
            return response.data; 
          } else {
            alert(response.data.message || "There was an issue with your message.");
          }
        } catch (error) {
          if (error.response) {
            // The server responded with a status code outside of the range 2xx
            console.error("Error response from backend:", error.response.data);
            alert(error.response.data.message || "There was an issue sending the message.");
          } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
            alert("The server did not respond. Please try again later.");
          } else {
            // Some other error occurred during setting up the request
            console.error("Error in sending request:", error.message);
            alert("There was an error processing your request. Please try again later.");
          }
        }
      };
    