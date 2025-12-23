import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router-dom"
import BackButton from "../components/BackButton"

const AddSnippet = () => {
  const [title, setTitle] = useState("")
  const [language, setLanguage] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  
  const addSnippetMutation=useMutation({
    mutationFn: async (newSnippet)=> {
      const response = await API.post("snippets/", newSnippet)
      return response.data;
    },
    onSuccess:()=> {
      queryClient.invalidateQueries(['snippets']);
      navigate("/dashboard");
      setTitle("");
      setLanguage("");
      setDescription("");
      setCode("");
      setFavorite(false);
      setError("");
    },
    onError: ()=> {
      setError("Failed to add Snippet. Please try again.")
    }
  });

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!title||!language||!code){
      setError("Title, language and code fields are required")
      return
    }
    setError("");

    addSnippetMutation.mutate({
      title, 
      language, 
      description, 
      code, 
      favorite,
    })
  }  

  return (
    <div className="container my-4">
      <BackButton />
       <div className="card shadow-sm p-4 add-edit-card">
        <h4 className="mb-4">Add New Snippet</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <input 
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="col-12 col-md-6">
          <input 
            type="text"
            className="form-control"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
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
            onChange={(e)=>setCode(e.target.value)}
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
        <button type="submit"  className="btn add-snippet-btn" disabled={addSnippetMutation.isLoading}>{addSnippetMutation.isLoading? "Adding...":"Add Snippet"}
        </button>
        </div>

      </form>

    {error && (<div className="col-12"><p className="text-danger">{error}</p></div>)}
    </div>
  </div>
  )
}

export default AddSnippet