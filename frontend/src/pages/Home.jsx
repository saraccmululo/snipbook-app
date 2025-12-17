import SearchBar from "../components/SearchBar"
import CreateSnippet from "../components/CreateSnippet"
import SnippetList from "../components/SnippetList"
import Filter from "../components/Filter"

const Home = () => {
  return (
    <>
    <div>Home</div>
    <CreateSnippet />
    <SearchBar />
    <Filter />
    <SnippetList />
    </>
    
  )
}

export default Home