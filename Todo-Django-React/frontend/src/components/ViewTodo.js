function ViewTodo(props) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  function updateTodo(todo) {
    fetch(`http://localhost:8000/todos/${todo.id}/`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function completedStatus(e, id) {
    const todo = props.todos.map((obj) => {
      // this method will update completed status
      if (obj.id === id) {
        const todo = { ...obj, completed: !obj.completed };
        updateTodo(todo);
        return todo;
      }
      return obj;
    });
    props.setTodo(todo);
  }

  function deleteTodo(e, id) {
    // this method is used to delete todo
    const todo = props.todos.filter((obj) => obj.id !== id);
    fetch(`http://localhost:8000/todos/${id}/`, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    props.setTodo(todo);
  }
  function updateTitle(e, id) {
    const newValue = e.target.innerText;
    props.setTodo((todos) =>
      todos.map((obj) => {
        if (obj.id === id) {
          const todo = { ...obj, title: newValue };
          updateTodo(todo);
          return todo;
        }
        return obj;
      })
    );
  }
  function updateDesc(e, id) {
    const newValue = e.target.innerText;
    props.setTodo((todos) =>
      todos.map((obj) => {
        if (obj.id === id) {
          const todo = { ...obj, description: newValue };
          updateTodo(todo);
          return todo;
        }
        return obj;
      })
    );
  }

  return (
    <div>
      <ul className="list-group mt-3">
        {props.todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between mb-2"
            style={{
              "border-radius":"5px",
              "border-left-width": "10px",
              "border-left-style": "solid",
              "border-left-color": todo.completed ? "#9FD6AE":'',
            }}
          >
            <div>
              <dev id="statusContainer">
                <input
                  type="checkbox"
                  className="tgl tgl-ios"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={(e) => completedStatus(e, todo.id)}
                />
                <label className="tgl-btn" for={todo.id}></label>
                <span className="slider round" />
              </dev>
              <h5
                className="edit-content"
                contentEditable="true"
                onBlur={(e) => updateTitle(e, todo.id)}
              >
                {todo.title}
              </h5>
              <p
                className="edit-content"
                contentEditable="true"
                onBlur={(e) => updateDesc(e, todo.id)}
              >
                {todo.description}
              </p>
              <button
                className="btn btn-outline-dark"
                // onClick={(e) => deleteTodo(e, todo.id)}
              >
                Archive
              </button>
              <button
                className="btn btn-danger ml-2"
                onClick={(e) => deleteTodo(e, todo.id)}
              >
                Remove
              </button>
            </div>
            <div>
              {/* <label className="switch"> */}
                
              {/* </label> */}
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTodo;
