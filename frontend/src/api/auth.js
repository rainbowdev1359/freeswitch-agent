import base from './base'

const login = (creds) => base.post('/token/', creds)
const register = (data) => base.post('/register/', data)

export default {
    login,
    register
}
