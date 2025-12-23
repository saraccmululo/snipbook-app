import { useQueryClient } from "@tanstack/react-query";
import API from "../utils/api";
import ConfirmModal from "./ConfirmModal";
import {useState} from "react";
import { useNavigate} from "react-router-dom";
import { Card } from "react-bootstrap";

const SnippetCard = ({ snippet, isExample = false }) => {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
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

  const handleCopy = async () => {
    try{
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(()=> setCopied(false), 2500);
    }catch (err) {
      console.error("Failed to copy", err);
    }
  }

  return (
  <>
    <Card className="shadow-sm mx-auto mb-4" style={{ maxWidth: "600px" }}>
      <Card.Body>
        {/* Title */}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <Card.Title className="mb-1">{snippet.title}</Card.Title>
        
          {/* Icons: Favorite, Edit, Delete */}
          {!isExample && (
          <div className="d-flex align-items-center mb-0 gap-1">
        
          {/* Favorite */}
          <i
            className={snippet.favorite ? "bi bi-star-fill text-warning action-icon favorite" : "bi bi-star text-secondary action-icon favorite"}
            onClick={handleToggleFavorite}
            style={{ cursor: "pointer", fontSize: "1.3rem"}}
          />

        {/* Edit */}
          <i 
            className="bi bi-pencil text-primary action-icon edit" 
            style={{ fontSize: "1.2rem" }} 
            onClick={() => navigate(`/snippets/${snippet.id}/edit`)}
            title="Edit"
          />

        {/* Delete */}
          <i 
            className="bi bi-x text-danger action-icon delete" 
            style={{fontSize: "1.5rem"}}
            onClick={() => setShowModal(true)}
            title="Delete"
          />
        </div>
        )}
      </div>
      
        {/* Language */}
        <p className="text-muted mt-0 mb-3">({snippet.language})</p>

        {/* Description */}
        {snippet.description && (
          <Card.Subtitle className="mb-2 text-muted">{snippet.description}</Card.Subtitle>
        )}

        {/* Code container */}
        <div>
          <div className="d-flex justify-content-end mb-1">
            <button
              type="button"
              className="btn btn-sm btn-link copy-btn"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "⧉Copy"}
            </button>
          </div>
          <pre className="bg-dark text-light p-3 rounded" style={{ overflowX: 'auto' }}>
            <code>{snippet.code}</code>
          </pre>
        </div>
      </Card.Body>
    </Card>

    {/* Delete Modal */}
    <ConfirmModal 
      show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm = {handleDelete}
      title="Confirm Delete"
      message="Are you sure you want to delete this snippet?"
    />
  </>
  );
}

export default SnippetCard;
