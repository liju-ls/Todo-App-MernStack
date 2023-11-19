function TodoList({
  deleteTodo,
  todoList,
  openUpdateForm,
  updateCompletedTodo,
}) {
  return (
    <>
      <h1>Todo List</h1>

      {todoList.length === 0 && <p className="text-center mt-3">Empty...</p>}

      {Array.isArray(todoList) &&
        todoList.map((todo) => {
          return (
            <div
              key={todo._id}
              className={
                todo.completed
                  ? "card flex-row gap-2 mt-2 align-items-center justify-content-center bg-success text-light"
                  : "card flex-row gap-2 mt-2 align-items-center justify-content-center"
              }
            >
              <div className="col-auto p-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={() => {
                    updateCompletedTodo(todo);
                  }}
                  checked={todo.completed}
                />
              </div>
              <div className="col text-capitalize">{todo.msg}</div>
              <button
                className="btn border-start col-auto rounded-0"
                onClick={() => {
                  openUpdateForm(todo);
                }}
                data-bs-toggle="modal"
                data-bs-target="#updateModal"
              >
                Edit
              </button>
              <div className="col-auto border-start p-2">
                <button
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    deleteTodo(todo._id);
                  }}
                ></button>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default TodoList;
