import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import http from "../services/httpService";
import TodoList from "./TodoList";

function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken) {
        setUsername(decodedToken._doc.name);
        setIsLogged(true);
      }
    } catch (err) {
      setErr(err);
      navigate("/login");
    }
  }, []);

  async function fetchTodo() {
    http
      .get("/allTodo", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodoList(res.data);
        setIsUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!isUpdated && isLogged) {
    fetchTodo();
  }

  function handleNewTodo(e) {
    setNewTodo(e.target.value);
  }

  async function handleAddTodo(e) {
    e.preventDefault();

    await http
      .patch(
        "/new",
        { msg: newTodo, completed: false },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleDeleteTodo(id) {
    await http
      .post(
        "/delete",
        { id: id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function bringUpdateForm(todo) {
    document.getElementById("updatingTodoField").value = todo.msg;
    setUpdateTodoId(todo._id);
  }

  async function handleUpdateTodo() {
    await http
      .patch(
        "/update",
        {
          id: updateTodoId,
          updatedMsg: document.getElementById("updatingTodoField").value,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateCompletedTodo(todo) {
    await http
      .patch(
        "/toggleTodo",
        {
          id: todo._id,
          completed: !todo.completed,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsUpdated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    setIsLogged(false);
  }

  return (
    <>
      <Navigation username={username} logout={handleLogout} />
      {!err && (
        <div className="container w-50">
          <form className="my-5 d-flex flex-column" onSubmit={handleAddTodo}>
            <input
              type="text"
              className="form-control"
              name="msg"
              placeholder="Write something..."
              onChange={handleNewTodo}
            />
            <button className="btn btn-primary mt-3">Add</button>
          </form>

          <TodoList
            deleteTodo={handleDeleteTodo}
            openUpdateForm={bringUpdateForm}
            todoList={todoList}
            updateCompletedTodo={handleUpdateCompletedTodo}
          />
        </div>
      )}

      <>
        <div
          className="modal fade"
          id="updateModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <form className="modal-body">
                <input
                  type="text"
                  name="updatedMsg"
                  id="updatingTodoField"
                  className="form-control"
                />
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateTodo}
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Home;
