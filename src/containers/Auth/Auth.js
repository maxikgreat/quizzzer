import React, {Component} from 'react'
import classes from './Auth.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'
import OverError from '../../components/UI/Error/OverError'

class Auth extends Component{


  state = {
    isFormValid:false,
    formControls:{
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter email correctly!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }

      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter password correctly! ( min 6 signes )',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }


  logInHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )

    
    
  }

  signUnHadler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )

    
  }

    
  submitHander = (event) => {
    event.preventDefault()
  }
  validateControl(value, validation){
    if(!validation){
      return true
    }

    let isValid = true

    if(validation.required){
      isValid = value.trim() !== '' && isValid
    }
    if(validation.email){
      isValid = is.email(value) && isValid
    }
    if(validation.minLength){
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }
  onChangeHandler = (event, controlName) => {

     const formControls = {...this.state.formControls}
     const control = {...formControls[controlName]}

     control.value = event.target.value
     control.touched = true
     control.valid = this.validateControl(control.value, control.validation)

     formControls[controlName] = control

     let isFormValid = true

     Object.keys(formControls).forEach((name) => {
       isFormValid = formControls[name].valid && isFormValid
     })

     this.setState({
       formControls: formControls,
       isFormValid: isFormValid
     })
  }
  closeErr = () => {
    setTimeout(() => {
      document.getElementById('err').style.display = 'none'
    }, 2000);
  }
  renderInputs(){
    const inputs = Object.keys(this.state.formControls)

    return inputs.map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return(
        <Input
          key = {controlName + index}
          type = {control.type}
          value = {control.value}
          valid = {control.valid}
          touched = {control.touched}
          label = {control.label}
          shouldValidate = {!!control.validation} // !! - привести к bool значению
          errorMessage = {control.errorMessage}
          onChange = {(event) => this.onChangeHandler(event, controlName)} // callback function чтобы  event был для каждой формы
        />
      )
    })
  }
  render(){
    return(
      <React.Fragment>
        { 
            this.props.error.hasError 
          ? 
            <OverError {...this.props.error}/> 
          : 
            null
        }
        { 
            this.props.error.hasError 
          ? 
            this.closeErr()
          : 
            null
        }
        <div className = {classes.Auth}>
          <div>
            <h1>Auth</h1>

            <form onSubmit = {this.submitHander} className={classes.AuthForm}>

              {this.renderInputs()}

              <Button type='success' onClick={this.logInHandler} disabled = {!this.state.isFormValid}>Log in</Button>
              <Button type='primary' onClick={this.signUnHadler} disabled = {true}>Sign up</Button>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return{
    error: state.auth
  }
}

function mapDispatchToProps(dispatch){
  return{
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
