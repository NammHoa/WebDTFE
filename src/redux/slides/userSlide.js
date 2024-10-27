import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    access_token: '',
    id: '',
    isAdmin: false
    
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
       updateUser: (state, action) => {
        const {name='', email='',phone='', address='' , access_token='', _id = '', isAdmin, refreshToken =''} = action.payload
        state.name = name ;
        state.email = email;
        state.phone = phone;
        state.address = address;
        state.id = _id;
        state.access_token = access_token;
        state.isAdmin = isAdmin;
        state.refreshToken = refreshToken;
       },
       resetUser: (state) => {
        state.name = '';
        state.email = '';
        state.phone = '';
        state.address = '';
        state.id = '';
        state.access_token = '';
        state.isAdmin = false;
        state.refreshToken='';

       },
    },
})

export const {updateUser, resetUser} = userSlide.actions
export default userSlide.reducer