
const Filter = ({filters, setFilters}) => {
  const {sort, filterType, filterText} = filters;
  const handleSortChange =(e)=>{
    setFilters(prev=>({...prev, sort: e.target.value}));
  };
  const handleFilterTypeChange =(e)=>{
    setFilters(prev=>({...prev, filterType: e.target.value, filterText: "",}));
  };
  const handleFilterTextChange =(e)=>{
    setFilters(prev=>({...prev, filterText: e.target.value}));
  };

  return (
    <div className="card mb-4 shadow-sm filter-card" style={{ maxWidth: "700px", margin: "auto" }}>
      <div className="card-body">
        <div className="row g-3 align-items-center">

        {/* Sort */}
        <div className="col-12 col-sm-4">
          <div className="mb-3">
            <label className="fw-bold">Sort by:</label>
            <select
              className="form-select"
              value={sort}
              onChange={handleSortChange}
            >
            <option value="">None</option>
            <option value="title A-Z">Title A-Z</option>
            <option value="title Z-A">Title Z-A</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Filter by shared label */}
      <div className="col-12 col-sm-8">
        <div className="mb-3">
          <label className="fw-bold d-block text-start">Filter by:</label>
          <div className="row g-2">
            
            {/* Filter Type */}
            <div className="col-12 col-sm-6">
              <select
                className="form-select"
                value={filterType}
                onChange={handleFilterTypeChange}
              >
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="language">Language</option>
                <option value="code">Code</option>
                <option value="favorite">Favorite</option>
              </select>
            </div>

            {/* Filter Text */}
            <div className="col-12 col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="Enter keyword..."
                value={filterText}
                onChange={handleFilterTextChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default Filter