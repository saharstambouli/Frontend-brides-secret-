import axios from 'axios'
// axios.defaults.baseURL=${process.env.REACT_APP_API_ENDPOINT}
// axios.defaults.baseURL=process.env.PUBLIC_API_BASE


export async function getProducts()
{   
    try {
        const response=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts`);
       console.log('response',response)
       
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}

export async function getProductBycategory(category)
{   
    try {
        const response=await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproducts/${category}`);
        if (response.status==200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;
        
    }
}

export async function getProductByID(id) {

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product/getproduct/${id}`);
        if (response.status == 200)
            return response.data
    } catch (error) {
        console.log(error)
        return false;

    }
}