import SnippetList from "../components/SnippetList"
import Filter from "../components/Filter"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Home = () => {
  const [filters, setFilters] = useState({
    sort: "",
    filterType: "",
    filterText: "",
  });

  const navigate = useNavigate();

  return (
    <>
      <button onClick={()=>navigate("/snippets/new")}>Add +</button>
      <Filter filters={filters} setFilters={setFilters}/>
      <SnippetList filters={filters}/>
    </>
  )
}

export default Home