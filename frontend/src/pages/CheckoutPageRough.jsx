import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apiGetAddress } from '../services/addressAPI'
import { apiPlaceOrder } from '../services/orderAPI'
import { useCartContext } from '../contexts/CartContext'
const USER_ID = import.meta.env.VITE_USER_ID

export default function CheckoutPage(){
  const [params] = useSearchParams()
  const selectedAddressId = params.get('addressId')
  const [address, setAddress] = useState(null)
  const { cart, loadCart } = useCartContext()
  const nav = useNavigate()

  useEffect(()=> {
    const loadAddress = async ()=>{
      if (selectedAddressId) {
        const res = await apiGetAddress(USER_ID)
        const addr = (res?.data?.data?.addresses || []).find(a => a._id === selectedAddressId)
        setAddress(addr)
      }
    }
    loadAddress()
  }, [selectedAddressId])

  const price = cart.reduce((s,i)=> s + (i.product?.price || 0) * i.quantity, 0)
  const total = price // optionally apply discount/delivery

  const placeOrder = async ()=>{
    if (!address) return alert('Please choose an address.')
    const items = cart.map(it => ({
      product: it.product._id || it.product,
      quantity: it.quantity,
      size: it.size || null
    }))
    const payload = { userId: USER_ID, shippingAddressId: address._id, items }
    try {
      const res = await apiPlaceOrder(payload)
      console.log('order placed', res)
      // reload cart
      await loadCart()
      nav(`/order-success/${res.data.data.order._id}`)
    } catch(err){
      console.error(err)
      alert('Failed to place order')
    }
  }

  return (
    <div className="container py-4">
      <h3>Checkout</h3>
      <div className="row">
        <div className="col-md-7">
          <h5>Shipping</h5>
          {address ? (
            <div className="card p-3">
              <div><strong>{address.name}</strong></div>
              <div>{address.line1} {address.line2}</div>
              <div>{address.city} {address.state} {address.pincode}</div>
              <div>{address.phone}</div>
            </div>
          ) : <p className="text-muted">No address selected.</p>}
          <hr />
          <h5>Items</h5>
          {cart.map(it => (
            <div className="d-flex gap-3 align-items-center mb-2" key={it._id}>
              <img src={it.product?.imageUrls?.[0] || it.product?.image} style={{width:80,height:60,objectFit:'cover'}} alt=""/>
              <div>
                <div>{it.product?.name}</div>
                <small>Size: {it.size || '-'}</small>
                <div>Qty: {it.quantity}</div>
              </div>
              <div className="ms-auto">₹{(it.product?.price || 0) * it.quantity}</div>
            </div>
          ))}
        </div>

        <div className="col-md-5">
          <div className="card p-3">
            <h5>Summary</h5>
            <div className="d-flex justify-content-between"><span>Subtotal</span><b>₹{price}</b></div>
            <div className="d-flex justify-content-between"><span>Delivery</span><b>₹0</b></div>
            <hr />
            <div className="d-flex justify-content-between"><span>Total</span><b>₹{total}</b></div>
            <button className="btn btn-primary w-100 mt-3" onClick={placeOrder}>Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}
