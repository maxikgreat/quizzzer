import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAILED, REFRESH_ERR_AUTH} from '../actions/actionTypes'

const initialState = {
  token: null,
  hasError: false,
  code: null,
  message: ''
}

export default function authReducer(state = initialState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return{
        ...state,
        token: action.token
      }
    case AUTH_FAILED:
      return{
        ...state,
        hasError: true,
        code: action.code,
        message: action.message
      }
    case REFRESH_ERR_AUTH:
      return{
        ...state,
        hasError: false,
        code: null,
        message: ''
      }
    case AUTH_LOGOUT:
      return{
        ...state,
        token: null
      }
    default:
      return state
  }
}
