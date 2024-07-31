import base from './base'

const getAllSuperAdmins = () => base.get('/superadmin/')
const getSpecificSuperAdmin = (id) => base.get(`/superadmin/${id}`)
const createNewSuperAdmin = (body) => base.post(`/superadmin/`, body)
const updateSuperAdmin = (id, body) => base.put(`/superadmin/${id}/`, body)
const deleteSuperAdmin = (id) => base.delete(`/superadmin/${id}`)

export default {
    getAllSuperAdmins,
    getSpecificSuperAdmin,
    createNewSuperAdmin,
    updateSuperAdmin,
    deleteSuperAdmin
}