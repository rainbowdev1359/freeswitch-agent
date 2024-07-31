import base from './base'

const getUserList = () => base.get('/myProfile/getUserList/')
const setUserRole = (data) => base.post(`/myProfile/setUserRole/`, data)

export default {
    getUserList,
    setUserRole
}