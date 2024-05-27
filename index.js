document.getElementById("todoForm").addEventListener("submit", handleSubmit);
document.getElementById("deleteAll").addEventListener("click", handleDeleteAll);
const todoListDiv = document.getElementById("todos");

if (!localStorage.getItem("todos")) {
    let todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    todoListDiv.innerHTML = "<h3>No Todos available</h3>";
} else {
    renderTodos();
}

function handleSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const task = document.getElementById("task").value;
    document.getElementById("todoForm").reset();

    const todo = { title, task, completed: false };
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function renderTodos() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos.length) {
        todoListDiv.innerHTML = "<h3>No Todos available</h3>";
        return;
    }
    todoListDiv.innerHTML = "";
    todos.forEach(function (todo, index) {
        const todoDiv = document.createElement("li");
        todoDiv.classList.add("todo");
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }
        todoDiv.innerHTML = `
            <div>
                <h3>${todo.title}</h3>
                <p>${todo.task}</p>
            </div>
            <button onclick="markCompleted(${index})">Completed</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoListDiv.appendChild(todoDiv);
    });
}

function markCompleted(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos[index].completed = !todos[index].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}

function handleDeleteAll() {
    localStorage.clear();
    let todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}
