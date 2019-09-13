import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS, AUTH_FAILED, REFRESH_ERR_AUTH} from './actionTypes'

export function auth(email, password, isLogin) {
  return async dispatch => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBqapAm3hlwaCd_Yz2PWGCKtGenN3Z5JYM'

    if (isLogin) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBqapAm3hlwaCd_Yz2PWGCKtGenN3Z5JYM'
    }
    try{
      const response = await axios.post(url, authData)
      const data = response.data

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)

      dispatch(authSuccess(data.idToken)) 
      dispatch(autoLogout(data.expiresIn))
    }
    catch(error){
        dispatch(errorHandler({
          code: error.response.data.error.code,
          message: error.response.data.error.message
        }))
        setTimeout(() => {
          dispatch(refreshError())
        }, 2000)
    }
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}
export function errorHandler({code, message}){

  return{
    type: AUTH_FAILED,
    code,
    message

  }
}
export function refreshError(){
  return {
    type: REFRESH_ERR_AUTH
  }
}
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}


export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}
