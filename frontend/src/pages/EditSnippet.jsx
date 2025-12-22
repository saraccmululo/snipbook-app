import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import API from "../utils/api"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

const EditSnippet = () => {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  
  //get the snippet
  const { data: snippet, isLoading, isError } = useQuery({
    queryKey:["snippet", id],
    queryFn:async () => {const res = await API.get(`snippets/${id}/`);
    return res.data;
    }
  });

    // populate form once snippet is loaded
  useEffect(() => {
    if (snippet) {
      setTitle(snippet.title || "");
      setLanguage(snippet.language || "");
      setDescription(snippet.description || "");
      setCode(snippet.code || "");
      setFavorite(snippet.favorite || false);
    }
  }, [snippet]);
  
  const editSnippetMutation=useMutation({
    mutationFn: async (updatedSnippet)=> {
      const response = await API.patch(`snippets/${id}/`, updatedSnippet)
      return response.data;
    },
    onSuccess:()=> {
      queryClient.invalidateQueries(['snippets']);
      navigate("/dashboard");
    },
    onError: ()=> {
      setError("Failed to update snippet. Please try again.")
    }
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!title||!language||!code){
      setError("Title, language and code fields are required")
      return
    }
    setError("");
    
    editSnippetMutation.mutate({
      title, 
      language, 
      description, 
      code, 
      favorite: favorite,
    })
}  

  if(isLoading){
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )} 
  
  if (isError) {
  return (
    <div className="container my-4">
      <p className="text-danger">
        Failed to load snippet. You may not have access to it.
      </p>
    </div>
  );
}

  return (
    <div className="container my-4">
      <BackButton />
       <div className="card shadow-sm p-4">
        <h4 className="mb-4">Edit Snippet</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <input 
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => {setTitle(e.target.value); setError("");}}
            required
          />
        </div>
        
        <div className="col-12 col-md-6">
          <input 
            type="text"
            className="form-control"
            placeholder="Language"
            value={language}
            onChange={(e) => {setLanguage(e.target.value); setError("");}}
            required
          />
        </div>
        
        <div className="col-12">
          <textarea 
            className="form-control"
            placeholder="Description (optional)"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>

        <div className="col-12">
          <textarea 
            className="form-control dark-textarea"
            placeholder="Code"
            value={code}
            onChange={(e)=>{setCode(e.target.value); setError("");}}
            rows={8}
            required
          />
        </div>
        
        <div className="col-12 col-md-6 d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="favorite"
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
           <label htmlFor="favorite" className="form-check-label text-secondary" >
            Favorite
          </label>
        </div>

         <div className="col-12">
        <button type="submit"  className="btn add-snippet-btn" disabled={editSnippetMutation.isLoading}>{editSnippetMutation.isLoading? "Saving...":"Save"}
        </button>
        </div>

      </form>

    {error && (<div className="col-12"><p className="text-danger">{error}</p></div>)}
    
    </div>
  </div>
  )
}

export default EditSnippet