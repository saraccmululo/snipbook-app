import { Form, Row, Col, Card } from "react-bootstrap";

const Filter = ({filters, setFilters}) => {
  const {sort, filterType, filterText} = filters;
  const handleSortChange =(e)=>{
    setFilters(prev=>({...prev, sort: e.target.value}));
  };
  const handleFilterTypeChange =(e)=>{
    setFilters(prev=>({...prev, filterType: e.target.value, filterText: "",}));
  };
  const handleFilterTextChange =(e)=>{
    setFilters(prev=>({...prev, filterText: e.target.value}));
  };

  return (
    <Card className="mb-4 shadow-sm" style={{ maxWidth: "700px", margin: "auto" }}>
      <Card.Body>
        <Row className="g-3 align-items-center">
          {/* Sort */}
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Sort by:</Form.Label>
              <Form.Select value={sort} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="title A-Z">Title A-Z</option>
                <option value="title Z-A">Title Z-A</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Filter by shared label */}
          <Col xs={12} sm={8}>
            <Form.Group>
              <Form.Label className="fw-bold d-block text-start">Filter by:</Form.Label>
              <Row className="g-2">
                {/* Filter Type */}
                <Col xs={12} sm={6}>
                  <Form.Select value={filterType} onChange={handleFilterTypeChange}>
                    <option value="">None</option>
                    <option value="title">Title</option>
                    <option value="language">Language</option>
                    <option value="code">Code</option>
                    <option value="favorite">Favorite</option>
                  </Form.Select>
                </Col>

                {/* Filter Text */}
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="text"
                    placeholder="Enter keyword..."
                    value={filterText}
                    onChange={handleFilterTextChange}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Filter