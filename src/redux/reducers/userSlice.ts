import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginValueType, SignUpValueType } from '../../@types';


export interface UserState {
    msg: string;
    user: string | null;
    token: string | null;
    loading: boolean;
    error: string,
}

const initialState: UserState = {
    msg: '',
    user: '',
    token: '',
    loading: false,
    error: '',
};

export const signUpUser = createAsyncThunk("user/register", async (body: SignUpValueType) => {
    const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })

    console.log(response.json())
    return await response.json()
  },
);

export const logInUser = createAsyncThunk("user/login", async (body: LoginValueType) => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })
    return await response.json()
    
  },
);

export const getUser = createAsyncThunk("get/user", async (body) => {
    const response = await fetch(`https://fakestoreapi.com/users/${body}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    })
    
    return await response.json()
  },
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
        state.token = localStorage.getItem("token")
    },
    addUser: (state, action) => {
        state.user = localStorage.getItem("user")
    },
    logout: (state, action) => {
        state.token = action.payload;
        localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.error){
            state.error = action.payload.error
        } else{
            state.msg = action.payload.msg
            state.token = action.payload.token
            state.user = action.payload.user

            localStorage.setItem("msg", action.payload.msg)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            localStorage.setItem("token", action.payload.token)
        }
        
    });
    builder.addCase(logInUser.rejected, (state, action) => {
        state.loading = true;
    });

    builder.addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.error){
            state.error = action.payload.error
        } else{
            state.msg = action.payload.msg
        }
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
        state.loading = true;
    });
   
    builder.addCase(getUser.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user
        console.log(action.payload)
    });
    builder.addCase(getUser.rejected, (state, action) => {
        state.loading = true;
    });
}
})


export const { addToken, addUser, logout } = userSlice.actions;
export default userSlice.reducer;