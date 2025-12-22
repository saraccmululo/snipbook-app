import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const exampleSnippets = [
  {
    id: 1,
    title: "Hello World",
    language: "JavaScript",
    code: `function helloWorld() {\n  console.log("Hello, world!");\n}`,
    favorite: true,
  },
  {
    id: 2,
    title: "Sum Numbers",
    language: "Python",
    code: `def sum_numbers(a, b):\n    return a + b`,
    favorite: false,
  },
  {
    id: 3,
    title: "Fetch API",
    language: "JavaScript",
    code: `fetch('/api/data')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    favorite: true,
  },
];

const Home = () => {
  return (
    <div className="container my-5">

      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4">Welcome to Snipbook</h1>
        <p className="lead">
          Save, organize, and explore your code snippets all in one place.
        </p>
        <div className="mt-3">
          <Link to="/login" className="btn btn-brand me-2">Login</Link>
          <Link to="/register" className="btn btn-brand-outline">Register</Link>
        </div>
      </section>

       {/* Snippet Example */}
      <section className="mb-5 text-center">
        <h3 className="mb-4">Example Snippet</h3>
        <Card className="shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Body>
            <Card.Title>{exampleSnippets[0].title}</Card.Title>
            <pre className="bg-dark text-light p-2 rounded">
              <code>{exampleSnippets[0].code}</code>
            </pre>
            <Card.Text className="text-muted mt-2">
              Language: {exampleSnippets[0].language} | Favorite: {exampleSnippets[0].favorite ? "⭐" : "☆"}
            </Card.Text>
          </Card.Body>
        </Card>
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

      {/* Call to Action */}
      <section className="text-center">
        <h4>Ready to organize your code?</h4>
        <div className="mt-3">
          <Link to="/register" className="btn btn-brand me-2">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
