import SnippetCard from './SnippetCard'
import API from '../utils/api'
import { useQuery } from "@tanstack/react-query"

const SnippetList = ({filters}) => {
  const{ sort, filterType, filterText} = filters;

  const {data: snippets=[], isLoading, isError} = useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const response = await API.get("snippets/");
      return response.data
    }
  });

  if(isLoading){
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )} 

  if(isError) return <p className="text-danger">Failed to load snippets</p>
  
  let filteredSnippets = snippets;
  
  //filter
  if (filterType && filterText) {
    filteredSnippets = filteredSnippets.filter(snippet =>
    snippet[filterType].toLowerCase().includes(filterText.toLowerCase()) 
  )}

  // sort
  filteredSnippets = [...filteredSnippets].sort((a, b) => {
    switch (sort) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "title A-Z":
        return a.title.localeCompare(b.title);
      case "title Z-A":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <>
    {filteredSnippets.length === 0? (
      <p>No snippets yet.</p>
    ) : (
      <ul>
        {filteredSnippets.map((snippet) => (
          <li key={snippet.id}>
            <SnippetCard snippet={snippet}/>
          </li>
        ))}
      </ul>
    )}
    </>
  )
}

export default SnippetList