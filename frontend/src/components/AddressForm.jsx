import { useEffect, useState } from "react"

export default function AddressForm({initialData, onSubmit, onCancel}){
    const [formData, setFormData] = useState({
        label: "",
        name: "",
        phone: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        isDefault: false,
    })

    useEffect(() => {
        if(initialData) setFormData(initialData)
    }, [initialData])

    const changeHandler = (e) => {
        const {name, value, type, checked} = e.target
        setFormData((p) => ({
            ...p,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }


    return(
        <form onSubmit={submitHandler} className="card p-3 shadow-sm">
            <h5>{initialData ? "Edit Address": "Add New Address"}</h5>

            <input type="text" name="label" value={formData.label} onChange={changeHandler} placeholder="Label (Home/Office)" className="form-control mb-2" />
            <input type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Full Name" className="form-control mb-2" />
            <input type="number" name="phone" value={formData.phone} onChange={changeHandler} placeholder="Phone Number" className="form-control mb-2" />
            <input type="text" name="line1" value={formData.line1} onChange={changeHandler} placeholder="Address Line 1" className="form-control mb-2" />
            <input type="text" name="line2" value={formData.line2} onChange={changeHandler} placeholder="Address Line 2" className="form-control mb-2" />
            <input type="text" name="city" value={formData.city} onChange={changeHandler} placeholder="City" className="form-control mb-2" />
            <input type="text" name="state" value={formData.state} onChange={changeHandler} placeholder="State" className="form-control mb-2" />
            <input type="number" name="postalCode" value={formData.postalCode} onChange={changeHandler} placeholder="Postal Code" className="form-control mb-2" />
            <input type="text" name="country" value={formData.country} onChange={changeHandler} placeholder="Country" className="form-control mb-2" />
            <label><input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={changeHandler} /> Set as Default</label>
            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-primary" type="submit">Save</button>
                <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}