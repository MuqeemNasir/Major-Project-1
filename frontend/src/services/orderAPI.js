import API from './api'

export const apiPlaceOrder = async (payload) => {
    const res = await API.post(`/orders`, payload)
    return res.data
}

export const apiGetOrders = async (userId) => {
    const res = await API.get(`/orders/user/${userId}`)
    return res.data
}

export const apiGetOrderById = async (orderId) => {
    const res = await API.get(`/orders/single/${orderId}`)
    return res.data
}
