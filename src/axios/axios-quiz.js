import axios from 'axios'

export default axios.create({
  baseURL: 'https://quizzzer-24208.firebaseio.com/'
})
