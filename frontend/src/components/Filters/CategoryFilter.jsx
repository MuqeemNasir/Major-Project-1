const CategoryFilter = ({categories = [], filters, setFilters}) => {
    const toggleCategory = (catId) => {
        setFilters((prev) => {
            const selected = prev.category || []
            const alreadySelected = selected.includes(catId)

            return{
                ...prev,
                category: alreadySelected ? selected.filter((id) => id !== catId) : [...selected, catId]
            }
        })
    }
    return(
        <div className="mb-3">
            <h5 className="fw-semibold">Category</h5>
            {categories.map((cat) => (
                <div className="form-check" key={cat._id}>
                    <input id={`cat-${cat._id}`} type="checkbox" className="form-check-input" checked={ Array.isArray(filters.category) && filters.category.includes(cat._id)} onChange={() => toggleCategory(cat._id)} />
                    <label className="form-check-label" htmlFor={`cat-${cat._id}`}>{cat.name}</label>
                </div>
            ))}
        </div>
    )
}

export default CategoryFilter