import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import { useNavigate } from 'react-router-dom'
import { useAddressContext } from '../contexts/AddressContext'

export default function AddressPage(){
  const {addresses, selectedAddress, setSelectedAddress, addAddress, updateAddress, deleteAddress} = useAddressContext()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async(data) => {
    if(editing){
        await updateAddress(editing._id, data)
    }else{
        await addAddress(data)
    }
    setShowForm(false)
    setEditing(null)
  }

  const goToSummary = () => {
    if(!selectedAddress) return
    navigate('/checkout')
  }

  return (

    <div className="container py-4">
        <h2>Choose Your Addresses</h2>
        {!showForm && (
            <button className='btn btn-primary mb-3' onClick={() => setShowForm(true)}>Add New Address</button>
        )}
        {showForm &&(
            <AddressForm 
              initialData={editing}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false)
                setEditing(null)
              }}
            />
        )}

        <div className="mt-3 row">
            {addresses?.map((addr) => (
                    <div key={addr._id} className="col-md-4 col-sm-6 mb-3">
                        <div className={`card p-3 shadow-sm h-100 ${selectedAddress?._id === addr._id ? "border border-primary" : ""}`} onClick={() => setSelectedAddress(addr)} style={{cursor: "pointer"}}>
                            <p><strong>{addr.label}</strong></p>
                            <p className='mb-1'>{addr.name}</p>
                            <p className='mb-1'>{addr.line1}, {addr.line2}</p>
                            <p className='mb-1'>{addr.city}</p>
                            <div className="d-flex gap-2 mt-2">
                                <button className='btn btn-warning btn-sm' onClick={(e) => {e.stopPropagation(); setEditing(addr); setShowForm(true) }}>Edit</button>
                                <button className='btn btn-danger btn-sm' onClick={(e) => {e.stopPropagation(); deleteAddress(addr._id)}}>Delete</button>
                            </div>

                            {selectedAddress?._id === addr._id && (
                                <button className='btn btn-success w-100 mt-3' onClick={(e) => {e.stopPropagation(); goToSummary()}}>Checkout</button>
                            )}
                        </div>
                    </div>
            ))}
        </div>
    </div>
  )
}
