import base from './base'

const resetpassword = (data) => base.post('/resetpassword/', data)
const removeUser = (data) => base.post('/remove_user/', data)
const updateUser = (data) => base.post('/update_user/', data)

export default {
    resetpassword,
    removeUser,
    updateUser
}