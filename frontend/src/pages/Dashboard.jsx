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

  const navigate = useNavigate();

  return (
    <div className="container my-4">
      {/* Add Snippet Button */}
      <div className="d-flex justify-content-end mb-2">
        <button onClick={()=>navigate("/snippets/new")} className="btn add-snippet-btn shadow-sm">Add Snippet +</button>
      </div>
    <Filter filters={filters} setFilters={setFilters}/>
    <div className="mt-4">
      <SnippetList filters={filters}/>
    </div>
  </div>
  );
};

export default Dashboard