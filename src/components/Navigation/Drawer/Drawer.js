import React, {Component} from 'react'
import classes from './Drawer.scss'
import BackDrop from '../../UI/BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'

export default class Drawer extends Component {

  clickHandler = () => {
    this.props.onClose()
  }
  renderLinks(links){
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to = {link.to}
            exact = {link.exact}
            activeClassName = {classes.active}
            onClick = {this.clickHandler}
          >{link.label}</NavLink>
        </li>
      )
    })
  }

  render(){
    const cls = [
       classes.Drawer
    ]
    if(!this.props.isOpen){
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'List ', exact: true}
    ]

    if(this.props.isAuth){
      links.push({to: '/quiz-creator', label: 'Create quiz ', exact: false})
      links.push({to: '/logout', label: 'Log out ', exact: false})
    } else {
      links.push({to: '/auth', label: 'Auth ', exact: false})
    }

    return(
      <React.Fragment>
        <nav className = {cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <BackDrop onClick = {this.props.onClose}/> : null}
      </React.Fragment>
    )
  }
}
