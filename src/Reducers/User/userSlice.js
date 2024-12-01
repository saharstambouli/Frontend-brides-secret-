
import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    UserName: null,
      email: null,
    isAuthenticated: null,
}
const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.UserName = action.payload.UserName;
                        state.email = action.payload.email;
        }
        ,
        logOut: (state) => {
            state.isAuthenticated = false;
            state.UserName = null;
            state.email = null;
            localStorage.removeItem('token');
        }
    }

})

export const { setIsAuth, setUser, logOut } = userSlice.actions;

export default userSlice.reducer