
const Filter = ({filters, setFilters}) => {
  const {sort, filterType, filterText} = filters;
  const handleSortChange =(e)=>{
    setFilters(prev=>({...prev, sort: e.target.value}));
  };
  const handleFilterTypeChange =(e)=>{
    setFilters(prev=>({...prev, filterType: e.target.value}));
  };
  const handleFilterTextChange =(e)=>{
    setFilters(prev=>({...prev, filterText: e.target.value}));
  };

  return (
    <div>
      <label>Sort by:</label>
      <select value={sort} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="title A-Z">title A-Z</option>
        <option value="title Z-A">title Z-A</option>
        <option value="newest">newest</option>
        <option value="oldest">oldest</option>
      </select>

      <label>Filter by:</label>
      <select value={filterType} onChange={handleFilterTypeChange}>
        <option value="">None</option>
        <option value="title">title</option>
        <option value="language">language</option>
        <option value="code">code</option>
        <option value="tag">tag</option>
        <option value="favorite">favorite</option>
      </select>

      <input 
        type="text"
        placeholder="enter filter keyword..."
        value={filterText}
        onChange={handleFilterTextChange}
      />

    </div>
  )
}

export default Filter