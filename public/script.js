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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    const db = await connectDb();
    await db.run('UPDATE todos SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    
    res.status(200).json({ message: 'Todo updated successfully!' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    const db = await connectDb();
    await db.run('DELETE FROM todos WHERE id = ?', [id]);
    
    res.status(200).json({ message: 'Todo deleted successfully!' });
});