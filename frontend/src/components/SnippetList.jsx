import SnippetCard from './SnippetCard'
import API from '../utils/api'
import { useQuery } from "@tanstack/react-query"
import { useState } from 'react'

const SnippetList = ({filters}) => {
  const{ sort, filterType, filterText} = filters;

  const {data: snippets=[], isLoading, isError} = useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const response = await API.get("snippets/");
      return response.data
    }
  });

  const [visibleCount, setVisibleCount] = useState(6);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if(isError) return <p className="text-danger">Failed to load snippets</p>
  
  //filter
  let filteredSnippets = snippets;
  
  if (filterType === "favorite") {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.favorite);
  }
  else if (filterType && filterText.trim()) {
    filteredSnippets = filteredSnippets.filter(snippet =>
    snippet[filterType]?.toString().toLowerCase().includes(filterText.trim().toLowerCase())
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

  // Show only visibleCount snippets
  const visibleSnippets = filteredSnippets.slice(0, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6); 
  };

  return (
    <>
    {filteredSnippets.length === 0? (
      <p className="text-center">No snippets yet.</p>
    ) : (
      <>
      <div className="row g-4">
        {visibleSnippets.map((snippet) => (
          <div key={snippet.id} className="col-12 col-md-6 col-lg-4">
              <SnippetCard snippet={snippet}/>
          </div>
        ))}
      </div>
      {visibleCount < filteredSnippets.length && (
        <div className="text-center mt-3">
          <button className="btn btn-brand-outline" onClick={handleLoadMore} style={{ borderRadius: "0.40rem" }}>
            Load More
          </button>
        </div>
      )}
      </>
    )}
    </>
  );
};

export default SnippetList