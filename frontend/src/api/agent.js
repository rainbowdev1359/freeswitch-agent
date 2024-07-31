import base from './base'

const getAllAgents = () => base.get('/agents/')
const createAgent = (data) => base.post('/agents/create/', data)
// const getAgent = (data) => base.post(`/agents/get/`, data)
const updateAgent = (data) => base.post(`/agents/update/`, data)
const deleteAgent = (data) => base.post(`/agents/delete/`, data)
const updateAgentPolicies = (data) => base.post(`/agents/update_policies/`, data)
const updateAgentRules = (data) => base.post(`/agents/update_rules/`, data)
const updateObjectives = (data) =>base.post(`/agents/update_objectives/`, data)
const updateProducts = (data) =>base.post(`/agents/update_products/`, data)
const getAgentDetail = (data) =>base.post(`/agents/get_agent/`, data)
const deleteObjectives = (data) =>base.post(`/agents/delete_objectives/`, data)
const deleteProducts = (data) =>base.post(`/agents/delete_products/`, data)

export default {
    getAllAgents,
    createAgent,
    // getAgent,
    updateAgent,
    deleteAgent,
    updateAgentPolicies,
    updateAgentRules,
    updateObjectives,
    updateProducts,
    getAgentDetail,
    deleteObjectives,
    deleteProducts
}