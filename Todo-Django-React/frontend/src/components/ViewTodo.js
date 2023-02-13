
function ViewTodo(props) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  function updateTodo(todo){
    fetch(`http://localhost:8000/todos/${todo.id}/`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  }

  function completedStatus(e,id){
    const todo = props.todos.map(obj => {
      // this method will update completed status
      if (obj.id === id) {
        const todo = {...obj, completed: !obj.completed}
        updateTodo(todo)
        return todo;
      }
      return obj;
    });
    props.setTodo(todo);
  }

  function deleteTodo(e,id){
    // this method is used to delete todo
    const todo = props.todos.filter(obj=> obj.id !== id)
    fetch(`http://localhost:8000/todos/${id}/`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    props.setTodo(todo)
  }
  function updateTitle(e,id){
    const newValue = e.target.innerText;
    props.setTodo(todos =>
      todos.map(obj => {
        if (obj.id === id){
          const todo = {...obj, title: newValue}
          updateTodo(todo)
          return todo;

        }
        return obj;
      })
    );
  }
  function updateDesc(e,id){
    const newValue = e.target.innerText;
    props.setTodo(todos =>
      todos.map(obj => {
        if (obj.id === id){
          const todo = {...obj, description: newValue}
          updateTodo(todo)
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
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <h5 
              style={{outline:'none',}}
               contentEditable="true"
               onBlur={(e) => updateTitle(e,todo.id)}
               >{todo.title}</h5>
              <p
              style={{outline:'none',width:'300px'}}
              contentEditable="true"
              onBlur={(e) => updateDesc(e,todo.id)}>{todo.description}</p>
            </div>
            <div>
              <label className="switch">
                <input type="checkbox"
                 checked={todo.completed}
                 onChange={(e)=>completedStatus(e,todo.id)} />
                <span className="slider round" />
              </label>
              <button className="btn btn-danger ml-3" onClick={(e)=>deleteTodo(e,todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTodo;
