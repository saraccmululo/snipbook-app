import { Link } from "react-router-dom";
import SnippetCard from "../components/SnippetCard";

const exampleSnippet =
  {
    id: 1,
    title: "Hello World",
    language: "JavaScript",
    description: "A function that prints a message to the console.",
    code: `function helloWorld() {\n  console.log("Hello, world!");\n}`,
    favorite: true,
  }

const Home = () => {
  return (
    <div className="container my-5">

      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 font-inter inter-semibold">Welcome to Snipbook
        </h1>
        <p className="lead font-inter">
          Save, organize, and explore your code snippets all in one place.
        </p>
        <div className="mt-3">
          <Link to="/login" className="btn btn-brand me-2" style={{ borderRadius: "0.40rem" }}>Login</Link>
          <Link to="/register" className="btn btn-brand-outline">Register</Link>
        </div>
      </section>

       {/* Snippet Example */}
      <section className="mb-5">
        <h3 className="mb-4 text-center">Example Snippet</h3>
        <SnippetCard
          snippet={exampleSnippet}
          isExample={true}
        />
      </section>

      {/* Features Section */}
      <section className="mb-5">
        <h3 className="text-center mb-4">Features</h3>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded shadow-sm">
              <h5>Save Snippets</h5>
              <p>Quickly add your code snippets with title, description, and language.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded shadow-sm">
              <h5>Organize & Favorite</h5>
              <p>Mark your important snippets as favorite and keep them handy.</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 border rounded shadow-sm">
              <h5>Search & Filter</h5>
              <p>Filter snippets by title, language, code, or favorites easily.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
