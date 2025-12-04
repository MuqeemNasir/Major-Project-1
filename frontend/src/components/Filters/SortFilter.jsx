const SortFilter = ({filters, setFilters}) => {
    return(
        <div className="mb-3">
            <h5 className="fw-semibold">Sort by</h5>
            <div className="form-check">
                <input id="sort-low-high" type="radio" name="sort" className="form-check-input" checked={filters.sort === "low-high"} onChange={() => setFilters((prev) => ({...prev, sort: "low-high"}))} />
                <label htmlFor="sort-low-high" className="form-check-label">Price - Low to High</label>
            </div>

            <div className="form-check">
                <input id="sort-low-high" type="radio" name="sort" className="form-check-input" checked={filters.sort === "high-low"} onChange={() => setFilters((prev) => ({...prev, sort: "high-low"}))} />
                <label htmlFor="sort-low-high" className="form-check-label">Price - High to Low</label>
            </div>
        </div>
    )
}

export default SortFilter