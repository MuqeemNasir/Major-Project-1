const PriceFilter = ({filters, setFilters}) => {
    return(
        <div className="mb-3">
            <h5 className="fw-semibold">Price</h5>
            <input type="range" min="0" max="20000" value={filters.maxPrice} className="form-range" onChange={(e) => setFilters((prev) => ({...prev, maxPrice: Number(e.target.value)}))} />
            <div className="d-flex justify-content-between small text-muted mt-1">
                <span>₹0</span>
                <span>₹{filters.maxPrice}</span>
                <span>₹20000</span>
            </div>
        </div>
    )
}

export default PriceFilter 