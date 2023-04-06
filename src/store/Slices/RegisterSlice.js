import {createSlice} from "@reduxjs/toolkit";


const intiState = {
    token: '',
    isloading: true
};
const RegisterSlice = createSlice({
    name: 'RegisterSlice',
    initialState: intiState,
    reducers: {
        SignUpAction: (state, action) => {
            const {token} = action.payload;
            state.token = token;
        },
        LogoutAction: (state) => {
            localStorage.removeItem('token')
            state.token = null;
        },
        ChangeIsloading: (state) => {
            state.isloading = !state.isloading;
        }
    }
});

export const {SignUpAction, LogoutAction, ChangeIsloading} = RegisterSlice.actions;
export default RegisterSlice.reducer;