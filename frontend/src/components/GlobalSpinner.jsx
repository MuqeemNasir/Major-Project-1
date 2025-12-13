const GlobalSpinner = () => {
    return(
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{zIndex: 9999, opacity: 0.8}}>
            <div className="text-center">
                <div className="spinner-border text-primary" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 fw-bold text-muted">Loading...</p>
            </div>
        </div>
    )
}

export default GlobalSpinner