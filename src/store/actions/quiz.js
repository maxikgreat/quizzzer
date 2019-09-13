import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  ERROR_FETCH_QUIZES,
  REFRESH_ERR_QUIZ,
  REMOVE_QUIZ
    } from './actionTypes'

export function fetchQuizes(){
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try{
      const response = await axios.get('/quizes.json')
      const quizes = []
      if(response.data){
          Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            index,
            id: key,
            name: response.data[key][0]
          })
        })
      }
      dispatch(fetchQuizesSuccess(quizes))
    } catch(error){
        console.log(error)
    }
  }
}
export function removeQuizBack(quizes, key){
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try{
        await axios.delete(`/quizes/${key}.json`)
        dispatch(removeQuizFront())
        dispatch(fetchQuizesStart())
        dispatch(fetchQuizesSuccess(quizes))
    }
    catch(error){
      console.log(error)
    }
  }
}

export function fetchQuizById(quizId){
  return async (dispatch) => {
    try{
      dispatch(fetchQuizesStart())
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data
      if(!!quiz)
      {
        quiz.shift()
        dispatch(fetchQuizSuccess(quiz))
      }
    } catch(error){
      console.log(error)
    }
  }
}
export function removeQuizFront(){
  return {
    type: REMOVE_QUIZ
  }
}
export function refreshError(){
  return{
    type: REFRESH_ERR_QUIZ
  }
}
export function errorFetchQuizes({code, message}){
  return{
    type: ERROR_FETCH_QUIZES,
    code,
    message
  }
}
export function quizSetState(answerState, results){
  return{
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz(){
  return{
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number){
  return{
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function quizAnswerClick(answerId){

  return (dispatch, getState) => {
    const state = getState().quiz
    if(state.answerState){
      const key = Object.keys(state.answerState)[0]
      if(state.answerState[key] === 'success'){
        return
      }
    }

    const question = state.quiz[state.activeQuestion]

    const results = state.results;

    if(question.rightAnswerId === answerId){
      if(!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if(isQuizFinished(state)){
          dispatch(finishQuiz())
        }
        else{
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout)
      },1000)
    }
    else{
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))

    }
  }
}

export function fetchQuizSuccess(quiz){
  return{
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart(){
  return{
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes){
  return{
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes
  }
}

export function fetchQuizesError(error){
  return{
    type: FETCH_QUIZES_ERROR,
    error: error
  }
}

function isQuizFinished(state){
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz(){
  return{
    type: QUIZ_RETRY
  }
}
