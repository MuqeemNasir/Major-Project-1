import PriceFilter from "./PriceFilter"
import CategoryFilter from "./CategoryFilter"
import RatingFilter from "./RatingFilter"
import SortFilter from "./SortFilter"

const Filters = ({categories, filters, setFilters, clearFilters}) => {
    return(
        <div className="card p-3 mb-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">Filters</h5>
                <button onClick={clearFilters} className="btn btn-sm btn-link">
                    Clear
                </button>
            </div>

            <PriceFilter filters={filters} setFilters={setFilters} />
            <CategoryFilter categories={categories} filters={filters} setFilters={setFilters} />
            <RatingFilter filters={filters} setFilters={setFilters} />
            <SortFilter filters={filters} setFilters={setFilters} />
        </div>
    )
}

export default Filters