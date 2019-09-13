import {ADD_QUIZ_NAME, CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, ERROR_QUIZ_CREATION, REFRESH_ERR_CREATE} from './actionTypes'
import axios from '../../axios/axios-quiz'

export function addQuizName(quizName){
  return{
    type: ADD_QUIZ_NAME,
    quizName
  }
}

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}
export function  errorQuizCreation({code, message}){
  return{
    type: ERROR_QUIZ_CREATION,
    code,
    message
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    try{
      await axios.post('/quizes.json', getState().create.quiz)
      dispatch(resetQuizCreation())
    }
    catch(error){
      console.log(error)
    //   dispatch(errorQuizCreation({
    //     code: error.response.data.error.code,
    //     message: error.response.data.error.message
    //   }))
    //   setTimeout(() => {
    //     dispatch(refreshError())
    //   }, 2000)
    // }
    }
  }
}
export function refreshError(){
  return{
    type: REFRESH_ERR_CREATE
  }
}