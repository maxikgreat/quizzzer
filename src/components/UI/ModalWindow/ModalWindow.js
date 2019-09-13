import React, {Component} from 'react';
import Modal from 'react-modal'
import Input from '../Input/Input'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addQuizName,resetQuizCreation} from '../../../store/actions/create'

const customStyles = {
  content : {
    top                   : '34%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign             : 'center'
  }

};

const customBtnStyles = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  color: '#000',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: '12px'
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class ModalWindow extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true,
      quizNameFormValue: '',
      redirectToHome: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal(event) {
    this.props.resetQuizCreation()
    this.setState({modalIsOpen: false, redirectToHome: true})
  }

  addQuizNameHandler = event => {
    event.preventDefault()
    if(this.state.quizNameFormValue.trim()){
      this.props.addQuizName(this.state.quizNameFormValue)
      this.setState({
        modalIsOpen: false
      })
      
    }
  }
  addQuizNameHandlerByEnter = event => {
    if(event.keyCode === 13){
      this.addQuizNameHandler(event)
    }
  }

  changeHandler = (event) => {
    this.setState({
      quizNameFormValue: event.target.value
    })
  }

  render() {
    if(this.state.redirectToHome){
      return <Redirect to = '/' />
    }else{
      return (
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Title Modal"
          >
            <h2>Quiz Title</h2>
            <hr />
            <form>
              <Input
                onChange = {this.changeHandler}
                onKeyDown = {(event) => this.addQuizNameHandlerByEnter(event)}
              />
              <button
                style={customBtnStyles}
                type = "button"
                onClick = {(event) => this.addQuizNameHandler(event)}
              > Submit </button>
            </form>
          </Modal>
        </div>
      )
    }
  }
}

function mapDispatchToProps(dispatch){
  return{
    resetQuizCreation: () => dispatch(resetQuizCreation()),
    addQuizName: (quizName) => dispatch(addQuizName(quizName))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(ModalWindow))
