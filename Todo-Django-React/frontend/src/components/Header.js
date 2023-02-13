function Header() {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <div>
            <a className="navbar-brand" href="#">
                Todos
            </a>
        </div>
        <div>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
