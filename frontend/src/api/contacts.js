import base from './base'

const getAllContacts = () => base.get('/contacts/')

const getSpecificContact = (id) => base.get(`/contacts/${id}`)

const createNewContact = (body) => base.post(`/contacts/`, body)

const updateContact = (id, body) => base.put(`/contacts/${id}/`, body)

const deleteContact = (id) => base.delete(`/contacts/${id}`)

export default {
    getAllContacts,
    getSpecificContact,
    createNewContact,
    updateContact,
    deleteContact
}