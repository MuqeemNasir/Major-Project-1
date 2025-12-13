import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import { useNavigate } from 'react-router-dom'
import { useAddressContext } from '../contexts/AddressContext'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaEdit, FaPlus, FaTrash } from 'react-icons/fa'

export default function AddressPage(){
  const {addresses, selectedAddress, setSelectedAddress, addAddress, updateAddress, deleteAddress, loading} = useAddressContext()
  const navigate = useNavigate()

  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async(data) => {
    try {
        if(editing){
            await updateAddress(editing._id, data)
            toast.success("Address Updated")
        }else{
            await addAddress(data)
            toast.success("Address Added")
        }
        setShowForm(false)
        setEditing(null)
    } catch(err) { 
        toast.error("Failed to save address") 
    }
  }
  
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this address?"))
      try {
          await deleteAddress(id)
          toast.error("Address Deleted")
      } catch(err) { 
        toast.error("Failed to delete")
    }
  }

  if(loading && addresses.length === 0) return <div style={{minHeight: "60vh"}}></div>

  return (
    <div className="container py-4 mb-5">
        <h3 className="mb-4 fw-bold">Select Delivery Address</h3>
        
        {!showForm && (
             <button className="btn btn-outline-primary mb-4 w-100 py-2 d-flex align-items-center justify-content-center gap-2" onClick={() => setShowForm(true)}><FaPlus size={14} /> Add New Address</button>
        )}
        {showForm &&(
            <div className="mb-4">
            <AddressForm 
              initialData={editing}
              onSubmit={handleSubmit}
              onCancel={() => { setShowForm(false); setEditing(null) }}
            />
            </div>
        )}
        {addresses.length === 0 && !showForm && (
            <div className="text-center py-5 text-muted border rounded bg-light">
                <p>No addresses found. Add one to proceed.</p>
            </div>
        )}

        <div className="row g-3 mb-5">
            {addresses?.map((addr) => (
                    <div key={addr._id} className="col-12 col-md-6 col-lg-4">
                        <div className={`card p-3 shadow-sm h-100 position-relative ${selectedAddress?._id === addr._id ? "border-primary border-2 bg-light" : "border"}`} 
                             onClick={() => setSelectedAddress(addr)} style={{cursor: "pointer", transition: "all 0.2s"}}>
                            {selectedAddress?._id === addr._id && (
                                <div className="position-absolute top-0 end-0 m-3 text-primary">
                                    <FaCheckCircle size={20}/>
                                </div>
                            )}
                            <div className="d-flex flex-column h-100">
                                <div>
                                <h6 className="fw-bold text-uppercase mb-2 badge bg-secondary text-white w-auto d-inline-block">{addr.label || "Home"}</h6>
                                <h5 className="mb-1 fw-bold">{addr.name}</h5>
                                <p className="text-muted small mb-3" style={{lineHeight: "1.6"}}>
                                    {addr.line1}, {addr.line2}<br/>
                                    {addr.city}, {addr.state} - {addr.postalCode}<br/>
                                    <strong>Phone:</strong> {addr.phone}
                                </p>
                                </div>
                                <div className="mt-auto pt-3 border-top d-flex gap-2">
                                    <button className='btn btn-sm btn-outline-warning flex-grow-1 d-flex align-items-center justify-content-center gap-2' onClick={(e) => {e.stopPropagation(); setEditing(addr); setShowForm(true) }}><FaEdit />Edit</button>
                                    <button className='btn btn-sm btn-outline-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2' onClick={(e) => {e.stopPropagation(); handleDelete(addr._id)}}><FaTrash />Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
        
        {selectedAddress && !showForm && (
            <>
            <div style={{height: "80px"}}></div>
            <div className="fixed-bottom bg-white p-3 shadow-lg border-top">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        <div className="text-start w-100 w-md-auto">
                            <small className="text-muted d-block">Delivering to: </small>
                            <div className="fw-bold text-truncate" style={{maxWidth: "100%"}}>{selectedAddress.label} ({selectedAddress.name})</div>
                        </div>
                        <button className='btn btn-success py-2 px-3 fw-bold w-100 w-md-auto' onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
            </>
        )}
    </div>
  )
}