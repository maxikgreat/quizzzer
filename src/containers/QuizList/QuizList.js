import React, {Component} from 'react'
import classes from './QuizList.scss'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes, removeQuizBack} from '../../store/actions/quiz'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'

// library.add(faTimes)
class QuizList extends Component{
  
  
  renderQuizes (){
    if(this.props.quizes)
    {
      return this.props.quizes.map((quiz) => {
        return (
          <li
            key = {quiz.id}
          >
            <NavLink
            to={'/quiz/' + quiz.id}
            >
            {quiz.name}
      
            </NavLink>
            {
              this.props.isLogIn
              ?
              <button onClick = {() => this.closeHandle(quiz.id)}><FontAwesomeIcon icon = {faWindowClose}/>
              </button>
              :
              null
            }
          </li>
        )
      })
    }
    else{
      return null
    }
  }
  closeHandle(key){
    const filteredQuizes = this.props.quizes.filter(quiz => quiz.id !== key)
    this.props.removeQuizBack(filteredQuizes, key)
  }
  
  componentDidMount() {
    this.props.fetchQuizes()
  }
  render(){
    return(
      <div className={classes.QuizList}>
        <div>
          <h1> Quiz's list </h1>
          {this.props.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
          {/* {!this.props.quizes == [] ? <span style = {{color: 'white'}}>There are no quizes yet</span> : <span>error</span>} */}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
    isLogIn: !!state.auth.token
  }
}
function mapDispatchToProps(dispatch){
  return{
    fetchQuizes: () => dispatch(fetchQuizes()),
    removeQuizBack: (quizes, key) => dispatch(removeQuizBack(quizes, key))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
