import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navigation from "./Navigation";
import http from "../services/httpService";
import TodoList from "./TodoList";
import asyncMiddleware from "../services/asyncMiddleware";

function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updateTodoId, setUpdateTodoId] = useState("");
  const token = localStorage.getItem("token");
  const todoField = useRef(null);
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
      navigate("/login");
    }
  }, []);

  const fetchTodo = asyncMiddleware(async () => {
    const user = await http.get("/allTodo", {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    setTodoList(user.data.todo);
    setIsUpdated(true);
  });

  const handleAddTodo = asyncMiddleware(async (e) => {
    e.preventDefault();

    await http.patch(
      "/new",
      {
        msg: todoField.current.value,
        completed: false,
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    setIsUpdated(false);
  });

  const handleDeleteTodo = asyncMiddleware(async (id) => {
    await http.post(
      "/delete",
      { id: id },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    setIsUpdated(false);
  });

  const handleUpdateTodo = asyncMiddleware(async () => {
    await http.patch(
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
    );

    setIsUpdated(false);
  });

  const handleUpdateCompletedTodo = asyncMiddleware(async (todo) => {
    await http.patch(
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
    );

    setIsUpdated(false);
  });

  function bringUpdateForm(todo) {
    document.getElementById("updatingTodoField").value = todo.msg;
    setUpdateTodoId(todo._id);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    setIsLogged(false);
  }

  if (!isUpdated && isLogged) {
    fetchTodo();
  }

  return (
    <>
      <Navigation username={username} logout={handleLogout} />

      {notification && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {notification}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="container w-50">
        <form className="my-5 d-flex flex-column" onSubmit={handleAddTodo}>
          <input
            ref={todoField}
            type="text"
            className="form-control"
            name="msg"
            placeholder="Write something..."
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

      {/* Update modal pop up --> */}
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
  );
}

export default Home;
