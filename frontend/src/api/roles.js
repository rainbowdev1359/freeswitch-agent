import base from './base'

const getRoleGrant = () => base.get('/getRoleGrant/')
const updateRoleGrant = (data) => base.post(`/updateRoleGrant/`, data)

export default {
    getRoleGrant,
    updateRoleGrant
}