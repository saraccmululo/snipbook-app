import { useQueryClient } from "@tanstack/react-query";
import API from "../utils/api";
import ConfirmModal from "./ConfirmModal";
import {useState} from "react";
import { useNavigate} from "react-router-dom";

const SnippetCard = ({ snippet }) => {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleToggleFavorite = async()=> {
    try{
      await API.patch(`snippets/${snippet.id}/`, {favorite: !snippet.favorite})
    queryClient.invalidateQueries(['snippets']);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handleDelete = async()=> {
    try {
      await API.delete(`snippets/${snippet.id}/`);
      queryClient.invalidateQueries(['snippets']);
      setShowModal(false)
    } catch(error) {
      console.error("Failed to delete snippet:", error);
    }
  }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title text-primary">{snippet.title}</h4>
         <i className={snippet.favorite? "bi bi-star-fill text-warning": "bi bi-star text-secondary"} onClick={handleToggleFavorite}></i>
         <button
          className="btn btn-sm btn-danger float-end"
          onClick={()=> setShowModal(true)}
        >
          Delete
        </button>
        <button
          className="btn btn-sm btn-info float-end"
          onClick={()=> navigate(`/snippets/${snippet.id}/edit`)}
        >
          Edit
        </button>
        <h5 className="card-subtitle mb-2 text-muted">{snippet.description}</h5>
        <pre className="card-text bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
          <code>{snippet.code}</code>
        </pre>
        <p className="card-text mt-2">
          {snippet.tags && snippet.tags.map((tag, idx) => (
            <span key={idx} className="badge bg-secondary me-1">{tag.name}</span>
          ))}
        </p>
      </div>
      <ConfirmModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm = {handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this snippet?"
      />
    </div>
  );
}

export default SnippetCard;
