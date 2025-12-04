const ratingOptions = [4, 3, 2, 1]

const RatingFilter = ({filters, setFilters}) => {
    const handleRatingChange = (e) => {
        const value = Number(e.target.value)
        setFilters((prev) => ({...prev, rating: value,}))
        console.log("Selected rating: ", value)
    }

    const clearRating = () => {
        setFilters((prev) => ({...prev, rating: null}))
    }
    return(
        <div className="mb-3">
            <h5 className="fw-semibold">Rating</h5>
            {ratingOptions.map((r) => (
                <div className="form-check" key={r}>
                    <input id={`rating-${r}`} type="radio" name="rating" value={r} className="form-check-input" checked={filters.rating === r} onChange={handleRatingChange} />
                <label className="form-check-label" htmlFor={`rating-${r}`}>{r} Stars & above</label>   
                </div>
            ))}
            <div className="form-check mt-2">
                <input id="rating-any" type="radio" name="rating" value="any" className="form-check-input" checked={filters.rating === null} onChange={clearRating} />
                <label htmlFor="rating-any" className="form-check-label">Any Rating</label>
            </div>
        </div>
    )
}


export default RatingFilter