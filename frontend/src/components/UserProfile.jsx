import { useEffect, useState } from "react"
import { apiGetUser } from "../services/userApi";
import * as bootstrap from "bootstrap"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadError, setLoadError] =  useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const drawerEl = document.getElementById("userDrawer")        
        if(!drawerEl){
            console.warn("UserProfile: #userDrawer not found in DOM.")
            return
        }
        const drawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl)

        const handleOpen = async() => {
            if(user || loading) return
        
        setLoading(true)
        setLoadError(null)

        try{
            const res = await apiGetUser()
            const fetchUser = res?.data?.data?.existingUser ?? res?.data?.data?.user ?? res?.data?.user ?? null

            if(!fetchUser){
                throw new Error("User not found in API response")
            }
            setUser(fetchUser)
        }catch(error){
            console.error("Failed to load User: ", error)
            setLoadError(error.message || "Failed to load user")
        }finally{
            setLoading(false)
        }
    }
    drawerEl.addEventListener("shown.bs.offcanvas", handleOpen)

    return() => {
        drawerEl.removeEventListener("shown.bs.offcanvas", handleOpen)
    }
    }, [])

    return(
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="userDrawer" aria-labelledby="userDrawerLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="userDrawerLabel">My Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {loading && <p>Loading profile...</p>}
                { !loading && loadError && (
                    <div className="alert alert-warning p-2">
                        <strong>User load failed: </strong>{loadError}
                    </div>
                )}
                {!loading && !loadError && !user && (
                    <p className="text-muted">No user available. Please login to view profile.</p>
                )} 
                {!loading && user && (
                    <div className="card-shadow-sm mb-4 border-0 bg-light">
                        <div className="card-body">
                            <p className="mb-3 fw-bold"><strong>Name: </strong>{user.name}</p>
                            <p className="mb-1 text-muted small"><strong>Email: </strong>{user.email}</p>
                            <p className="mb-0 text-muted small"><strong>Phone: </strong>{user.phone}</p>
                        </div>
                    </div>
                )}
                <div className="d-grid gap-2">
                    <button onClick={() => navigate("/address")} className="btn btn-outline-dark py-2" data-bs-dismiss="offcanvas">Add/Manage Address</button>
                    <button onClick={() => navigate("/order-history")} className="btn btn-outline-dark py-2" data-bs-dismiss="offcanvas">Order History</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile