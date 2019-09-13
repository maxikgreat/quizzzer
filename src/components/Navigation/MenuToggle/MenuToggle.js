import React from 'react'
import classes from './MenuToggle.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faTimes, faBars)

const MenuToggle = (props) => {

  const cls = [
    classes.MenuToggle
  ]
  if(props.isOpen){
    cls.push(classes.open)
  }
  return(
    <FontAwesomeIcon
      className = {cls.join(' ')}
      icon = {props.isOpen ? 'times' : 'bars'}
      onClick = {props.onToggle}

    />
  )
}

export default MenuToggle
