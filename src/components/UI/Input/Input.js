import React from 'react'
import classes from './Input.scss'

function isInvalid({valid, touched, shouldValidate}) {

  return !valid && shouldValidate && touched

}
const Input = (props) => {


  const inputType = props.type || 'text'
  const cls = [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if(isInvalid(props)){
    cls.push(classes.invalid)
  }
  return(
    <div className = {cls.join(' ')}>
      <label htmlFor = {htmlFor}>{props.label}</label>
      <input
        type = {props.type}
        id = {htmlFor}
        value = {props.value}
        onChange = {props.onChange}
        onKeyDown = {props.onKeyDown}
      />
      {
        isInvalid(props) ? <span>{props.errorMessage || 'Enter right value'}</span> : null
      }
    </div>
  )
}

export default Input
