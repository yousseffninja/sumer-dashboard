import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import axiosClient from '../configs/axios-client'

type UserType = {
  id: string,
  username: string,
  name: string,
  avatar: string
};

type ActionType = { type: string, payload: any }

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

type initialValue = {
  isAuthenticated: boolean,
  isLoading: boolean,
  user: any,
  signIn: (username: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: any, action: { payload: any; }) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state: any, action: { payload: any; }) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state: any) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state: any, action: ActionType) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

// export const AuthContext = createContext({ undefined });
export const AuthContext = createContext<initialValue | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user: UserType = state.user;
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: null
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    
    []
  );

  const signIn = async (username: string, password: string) => {
    const user: {id:string, avatar: string, name: string, username:string} = {
      id: '',
      avatar: '',
      name: '',
      username: ''
      };
    const res = await axiosClient.post('/users/login', { email: username, password });

    if(res.status == 200){
      const { data } = res.data;
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('token', data.token);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      user.id = data.id;
      user.avatar = data.avatar;
      user.name = data.name;
      user.username = data.username;
    }
    else {
      throw new Error('Please check your username and password');
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (username: any, name: any, password: any) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
      payload: null
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
