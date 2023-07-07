import { getHeaders } from "./cookies.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AddTodo(props) {
  function searchTodo(e, obj) {
    const searchQuery = "Your search query here"; // Replace with the actual search query
    const headers = getHeaders();

    fetch("http://localhost:8000/todos/search/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(obj),
      // data: { message: "hello" },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((todo) => {
        // Handle the response data
        props.setTodo(todo)
        // Perform further actions with the todos URL
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
  return (
    <div>
      <form
        method="post"
        className="form-group mt-3"
        onSubmit={(event) => event.preventDefault()}
      >
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
        <div class="d-flex d-flex-row">
          <button
            type="submit"
            onClick={() =>
              props.addTodo(
                document.getElementById("title").value,
                document.getElementById("desc").value
              )
            }
            className="btn btn-primary"
          >
            Add Todo
          </button>
          <div class="dropdown show ml-2 ">
            <button
              className="btn btn-secondary dropdown-toggle p-2"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter By
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a className="dropdown-item" onClick={(e)=>searchTodo(e,{"is_active":false})}>Archived</a>
              <a className="dropdown-item" onClick={(e)=>searchTodo(e,{"completed":true})}>Completed</a>
              <a className="dropdown-item" onClick={(e)=>searchTodo(e,{"":""})}>All</a>
            </div>
          </div>
          <div className="input-group rounded w-25 ml-2">
            <input
              type="search"
              onChange={(e) =>
                searchTodo(e, {
                  search: e.target.value,
                })
              }
              className="form-control rounded w-25"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span id="search-addon" className="p-2 ml-n1">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default AddTodo;
