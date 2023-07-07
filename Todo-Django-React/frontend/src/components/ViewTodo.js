import Swal from "sweetalert2";
import { getHeaders } from "./cookies.js";

function ViewTodo(props) {
  const headers = getHeaders();

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

  function archiveTodo(e, id) {
    const todo = props.todos.filter((obj) => obj.id !== id);
    todo.is_active = ! todo.is_active

    console.log("Todo Archived...");
    fetch(`http://localhost:8000/todos/${id}/archive/`, {
      method: "options",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to archive todo");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    props.setTodo(todo);
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
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this todo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes" in the confirmation dialog
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
    });
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
              "border-radius": "5px",
              "border-left-width": "10px",
              "border-left-style": "solid",
              "border-left-color": todo.completed ? "#9FD6AE" : "",
            }}
          >
            <div>
              <dev id="statusContainer" key={todo.id}>
                <input
                  key={todo.id}
                  type="checkbox"
                  className="tgl tgl-ios"
                  id={todo.id}
                  checked={todo.completed}
                  onChange={(e) => completedStatus(e, todo.id)}
                />
                <label className="tgl-btn" key={todo.id} for={todo.id}></label>
                <span className="slider round" key={todo.id} />
              </dev>
              <h5
                className="edit-content"
                contentEditable="true"
                key={todo.id}
                onBlur={(e) => updateTitle(e, todo.id)}
              >
                {todo.title}
              </h5>
              <p
                className="edit-content"
                contentEditable="true"
                key={todo.id}
                onBlur={(e) => updateDesc(e, todo.id)}
              >
                {todo.description}
              </p>
              <button
                className={`btn ${todo.is_active ? "btn-outline-dark" : "btn-dark"}`}
                key={todo.id}
                onClick={(e) => {
                  archiveTodo(e, todo.id);
                }}
              >
                {todo.is_active ? "Archive" : "Unarchive"}
              </button>
              <button
                className="btn btn-danger ml-2"
                key={todo.id}
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
