import React, {useEffect} from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth'



 const App  = (props) => {

  useEffect(() => {
    props.autoLogin()
  })

    let routes = (
      <Switch>
        <Route path = "/auth" component = {Auth} />
        <Route path = "/quiz/:id" component = {Quiz} />
        <Route path = "/" exact component = {QuizList} />
        <Redirect to ='/' />
      </Switch>
    )

    if(props.isAuth){
      routes = (
        <Switch>
          <Route path = "/quiz-creator" component = {QuizCreator} />
          <Route path = "/quiz/:id" component = {Quiz} />
          <Route path = '/logout' component = {Logout} />
          <Route path = "/" exact component = {QuizList} />
          <Redirect to ='/' />
        </Switch>
      )
    }
    return (
        <Layout>
          {routes}
        </Layout>
    )
  }
// containers для корневых компонентов со state и важных ( обьемных на странице )
// components для функциональный компомнентов

function mapStateToProps(state){
  return{
    isAuth: !!state.auth.token
  }
}
function mapDispatchToProps(dispatch){
  return{
    autoLogin: () => dispatch(autoLogin())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
