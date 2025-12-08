import API from './api'
export const apiGetAddress = async (userId) => {
    const res = await API.get(`/address`)
    return res.data.data.addresses
}

export const apiGetAddressById = async(addressId) => {
    const res = await API.get(`/address/single/${addressId}`)
    return res.data.data.address
}

export const apiAddAddress = async (payload) => {
    const res = await API.post(`/address`, payload)
    return res.data.data.address
}

export const apiUpdateAddress = async (addressId, payload) => {
    const res = await API.post(`/address/${addressId}`, payload)
    return res.data.data.address
}

export const apiDeleteAddress = async (userId, addressId) => {
    const res = await API.delete(`/address/${addressId}`)
    return res.data
}
