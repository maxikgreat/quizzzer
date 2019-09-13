import React from 'react'
import classes from './FinishedQuiz.scss'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'
//import { faTimes } { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faCheck)

const FinishedQuiz = (props) => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if(props.results[key] === 'success'){
      total++
    }
    return total
  }, 0)    // Object.keys превращает обьект в массив ключей этого обьекта
  return(
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return(
            <li
              key={index}
            >
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <FontAwesomeIcon
                className = {props.results[quizItem.id] === 'error' ? classes.error : classes.success}
                icon = {props.results[quizItem.id] === 'error' ? 'times' : 'check'}
              />
            </li>
          )
        })}
      </ul>
      <p>Right {successCount } of {props.quiz.length}</p>
      <div>
        <Button
          onClick = {props.onRetry}
          type = 'primary'
        >
          Repeat
        </Button>
        <Link to = '/'>
          <Button
            type = 'success'
          >
            Go to test's list
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default FinishedQuiz
