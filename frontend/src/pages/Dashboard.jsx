import SnippetList from "../components/SnippetList"
import Filter from "../components/Filter"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Dashboard = () => {
  const [filters, setFilters] = useState({
    sort: "",
    filterType: "",
    filterText: "",
  });
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      {/* Top actions row */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        {/* Mobile filter toggle button */}
        <button
          className="btn btn-outline-secondary d-sm-none p-1"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          aria-label="Toggle filters"
        >
          <i
            className={`bi ${showMobileFilter ? "bi-x-lg" : "bi-filter"} fs-6`}
          ></i>
        </button>
        {/* Add Snippet Button */}
        <div className="d-flex justify-content-end mb-2">
          <button onClick={()=>navigate("/snippets/new")} className="btn add-snippet-btn shadow-sm">Add Snippet +</button>
        </div>
    </div>

    <Filter 
      filters={filters} 
      setFilters={setFilters}
      showMobileFilter={showMobileFilter}/>
    <div className="mt-4">
      
    <SnippetList filters={filters}/>
    </div>
  </div>
  );
};

export default Dashboard