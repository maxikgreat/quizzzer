import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_NEXT_QUESTION,
  FINISH_QUIZ,
  QUIZ_RETRY,
  ERROR_FETCH_QUIZES,
  REFRESH_ERR_QUIZ,
  REMOVE_QUIZ} from '../actions/actionTypes'

const initialState = {
  quizes: [],
  loading: true,
  hasError: false,
  errorCode: null,
  errorMessage: '',
  results:  {}, //key - id {[id]: success , error}
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null
}

export default function quizReducer(state = initialState, action){
  switch(action.type){
    case FETCH_QUIZES_START:
      return{
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
        return{
          ...state,
          loading: false,
          quizes: action.quizes
        }
    case FETCH_QUIZES_ERROR:
        return{
          ...state,
          loading: false,
          error: action.error
        }
    case REMOVE_QUIZ:
        return{
          ...state,
          quizes: action.quizes
        }
    case FETCH_QUIZ_SUCCESS:
      return{
        ...state,
        loading: false,
        quiz: action.quiz
      }
    case QUIZ_SET_STATE:
      return{
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return{
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return{
        ...state,
        answerState:null,
        activeQuestion: action.number
      }
    case QUIZ_RETRY:
      return{
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      }
    case ERROR_FETCH_QUIZES:
      return{
        ...state,
        hasError: true,
        errorCode: action.code,
        errorMessage: action.message
      }
    case REFRESH_ERR_QUIZ:
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
