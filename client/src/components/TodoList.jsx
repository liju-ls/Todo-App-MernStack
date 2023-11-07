function TodoList({
  deleteTodo,
  todoList,
  openUpdateForm,
  updateCompletedTodo,
}) {
  return (
    <>
      <h1>Todo List</h1>

      <div
        className={
          todoList.length !== 0
            ? "d-flex justify-content-center invisible position-absolute"
            : "d-flex justify-content-center visible"
        }
      >
        <div className="spinner-border m-2"></div>
      </div>

      {Array.isArray(todoList) &&
        todoList.map((todo) => {
          return (
            <div key={todo._id} className="card flex-row gap-2 mt-2">
              <input
                type="checkbox"
                className="form-check-input col-1 m-2"
                onChange={() => {
                  updateCompletedTodo(todo);
                }}
                checked={todo.completed}
              />
              <div
                className={
                  todo.completed
                    ? "col m-auto text-decoration-line-through"
                    : "col m-auto"
                }
              >
                {todo.msg}
              </div>
              <button
                className="btn btn-success col-2 rounded-0"
                onClick={() => {
                  openUpdateForm(todo);
                }}
                data-bs-toggle="modal"
                data-bs-target="#updateModal"
              >
                Update
              </button>
              <button
                className="btn btn-danger col-2 rounded-0"
                onClick={() => {
                  deleteTodo(todo._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
    </>
  );
}

export default TodoList;
