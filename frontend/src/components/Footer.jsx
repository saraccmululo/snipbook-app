import portfolioIcon from "../assets/portfolio-icon-light.png"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">

          {/* Left */}
          <div className="col-md-6 mb-3 mb-md-0">
            <small>
              © {new Date().getFullYear()} SCCM Software Solutions
            </small>
          </div>

          {/* Right */}
          <div className="col-md-6">
            <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-3 gap-md-4 mb-0">

              {/* External links with icons */}
              <li>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light fs-5"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </li>
              
              <li>
                <a
                  href="https://saraccmululo.github.io/portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light fs-5"
                  aria-label="LinkedIn"
                >
                  <img
                    src={portfolioIcon}
                    alt="Portfolio" 
                    width="22"
                    height="22"
                    title="Portfolio"
                    //style={{filter: "invert(1)"}}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saraccmululo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light fs-5"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

