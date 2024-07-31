import base from './base'

const getAllCampaigns = () => base.get('/campaigns/')
const filterCampaigns = (params) => base.get(`/campaigns?${params}`)

export default {
    getAllCampaigns,
    filterCampaigns
}