// components/UserInitializer.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../APIS/user";
import {  setIsAuth, setUser } from "../Reducers/User/userSlice";
 import {getProducts} from '../APIS/product'
 import { setProducts } from "../Reducers/Products/productsSlice";
import { setWishList } from "../Reducers/Wishlist/wishListSlice";
import { setCart } from "../Reducers/Cart/SliceCart";


export default function Initializer() {
    const dispatch = useDispatch();
    const getUserr = async () => {
        try {
            const response = await getUser();
            console.log("User Data (with populated cart):", response); 
    
            if (response) {
                dispatch(setUser({
                    email: response.email,
                    UserName: response.UserName,
                }));
                dispatch(setIsAuth(true));
    
                console.log("Cart Data:", response.cart); // Log the cart data
    
                // Dispatch the populated cart data directly
                dispatch(setCart(response.cart));
                dispatch(setWishList(response.favorites));
            } else {
                localStorage.removeItem("token");
                dispatch(setIsAuth(false));
            }
        } catch (error) {
            console.error("Error in getUserr:", error);
        }
    };
    
    

 const fetchProducts=async()=> {     
    try {
        const res=await getProducts()
        console.log('fetch products',res)
        if (res)
             dispatch(setProducts(res));
    } catch (error) {
        console.log(error);
    }
 }


    useEffect(() => {
        getUserr();
        fetchProducts();
    }, []);

    return null; 
}