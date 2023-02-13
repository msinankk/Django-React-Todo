function AddTodo(props) {
  return (
    <div>
      <form method="post" className="form-group mt-3" onSubmit={(event)=>event.preventDefault()}>
        <div className="form-group">
          <input
            type="text"
            id="title"
            placeholder="Enter Todo Title"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            id="desc"
            placeholder="Enter Todo Description"
            className="form-control"
            required
          />
        </div>
        <button type="submit" 
          onClick={()=>props.addTodo(document.getElementById("title").value,document.getElementById("desc").value)} 
          className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
