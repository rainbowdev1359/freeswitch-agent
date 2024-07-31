import base, { uploadAxios } from './base'
import axios from 'axios';

const getAllKnowledge = () => base.get('/knowledge/')

const getSpecificKnowledge = (id) => base.get(`/knowledge/${id}/`)

const createNewKnowledge = (body) => uploadAxios.post('/knowledge/create/', body)

const updateKnowledge = (id, body) => base.post(`/knowledge/${id}/update/`, body)

const deleteKnowledge = (id) => base.post(`/knowledge/${id}/delete`)

export default {
    getAllKnowledge,
    getSpecificKnowledge,
    createNewKnowledge,
    updateKnowledge,
    deleteKnowledge
}   
