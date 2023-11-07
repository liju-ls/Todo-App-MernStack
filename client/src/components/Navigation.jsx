function Navigation({ username, logout }) {
  return (
    <>
      <div className="navbar border-bottom">
        <p className="my-auto p-2">{username.toUpperCase()}</p>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Navigation;
