import axios from 'axios'
import Cookies from 'js-cookie'


const corefun = axios.create({
  baseURL : 'https://corefun.herokuapp.com',
  headers : {authorization: 'JWT' + Cookies.get('token')}

})
axios.defaults.baseURL = 'https://corefun.herokuapp.com' 

const appService = {
  login : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/login/' , data)
        .then(res => {
          resolve(res.data)
          console.log(res.data)
          axios.post('/api/v1/auth/token/', data)
          .then (re => {
            Cookies.set('token' , String(re.data.token) , { expires: 365 })
          })
          .catch(er => {
            Cookies.remove('logedinUser')
            alert('try again please')
          })
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  profile : user => {
    return new Promise((resolve, reject) => {
      axios.get(`/api/v1/auth/user/${user}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  singup : data => {
    return new Promise((resolve, reject) => {
      axios.post('/api/v1/auth/registration/' , data)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  information : data => {
    return new Promise((resolve, reject) => {
      console.log(axios.defaults.headers.common)

      corefun.put('/api/v1/auth/user/' , data , {
        headers : {authorization: `JWT ${Cookies.get('token')}`}
      })
        .then(res => {
          resolve(res.data)
          Cookies.set('logedinUser' , { user : res.data} , { expires: 365 })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default appService
