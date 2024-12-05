async function fetchTodos() {
    const response = await fetch('http://localhost:3000/api/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerText = `${todo.name} - ${todo.description}`;
        todoList.appendChild(li);
    });
}

document.getElementById('addTodoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    if (response.ok) {
        fetchTodos();
    }
});

fetchTodos();