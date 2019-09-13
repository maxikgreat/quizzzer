import {ADD_QUIZ_NAME, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, ERROR_QUIZ_CREATION, REFRESH_ERR_CREATE} from '../actions/actionTypes'

const initialState = {
  quiz: [],
  hasError: false,
  errorCode: null,
  errorMessage: ''
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUIZ_NAME:
      return{
        ...state,
        quiz: [action.quizName, ...state.quiz]
      }
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      }
    case ERROR_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
        hasError: true,
        errorCode: action.code,
        errorMessage: action.message
      }
    case REFRESH_ERR_CREATE:
      return{
        ...state,
        hasError: false,
        errorCode: null,
        errorMessage: ''
      }
    default:
      return state
  }
}
