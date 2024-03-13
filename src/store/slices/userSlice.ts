import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import axios from "axios";
import { User } from "../../types";

// фетч запрос на получение данных с fakeapi
export const fetchuserlist = createAsyncThunk<User[]>(
    "userslist/fetchusers",
    async () => {
        const response = await axios.get("https://reqres.in/api/users?page=2");
        return response.data.data; 
    }
);

export const fetchUser = createAsyncThunk<User[]>(
    'userlist/fetchuser',
    async (id) =>{
        const responce = await axios.get(`{https://reqres.in/api/users/${id}`)
        return responce.data.data
    }
)

const initialState = {
    email: null,
    name: null,
    token: null,
    id: null,
    user:[],
    userList: [],
    isLoading: false,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
        setUserList(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchuserlist.pending, (state) => {
                state.isLoading=true
            })
            .addCase(fetchuserlist.fulfilled, (state, action) => {
                state.isLoading = false
                state.userList = action.payload
                state.error = ''
                state.user = action.payload

            })
            .addCase(fetchuserlist.rejected, (state, action) => {
                state.isLoading = false
                state.userList = [] 
                state.error = action.error.message
            });
    }
})

export const { setUser, removeUser, setUserList } = userSlice.actions;
export const SelectUserList = (state: RootState) => state.user.userList;
export const SelectUser = (state:RootState) => state.user.user;

export default userSlice.reducer;