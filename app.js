const baseUrl = 'https://crudcrud.com/api/6c520f2ffcba4ee582bb16cc837bcccf/todoData';

function addItem() {
    const todoName = document.querySelector('#todoName').value;
    const todoDescription = document.querySelector('#todoDescription').value;
    const todoStatus = false;

    if (todoName && todoDescription) {
        const todo = {
            name: todoName,
            description: todoDescription,
            status: todoStatus
        };

        axios.post(baseUrl, todo)
            .then(() => getTodos())
            .catch(error => console.error(error));
    }
}

function getTodos() {
    axios.get(baseUrl)
        .then(response => {
            const todos = response.data;
            displayTodos(todos);
        })
        .catch(error => console.error(error));
}

function displayTodos(todos) {
    const todoList = document.querySelector('#todoList');
    const doneList = document.querySelector('#doneList');

    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${todo.name}: ${todo.description}`;

        if (!todo.status) {
            const tickButton = document.createElement('button');
            tickButton.classList.add('btn', 'btn-success', 'ml-2');
            tickButton.innerHTML = '✓';
            tickButton.addEventListener('click', () => updateStatus(todo._id, todo.name, todo.description));

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'ml-2');
            deleteButton.innerHTML = 'Delete';
            deleteButton.addEventListener('click', () => deleteItem(todo._id));

            li.appendChild(tickButton);
            li.appendChild(deleteButton);

            todoList.appendChild(li);
        } else {
            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'float-right', 'ml-2');
            removeButton.innerHTML = 'Remove from Todos Done';
            removeButton.addEventListener('click', () => removeFromDone(todo._id));

            li.appendChild(removeButton);

            doneList.appendChild(li);
        }
    });
}

function updateStatus(id, name, description) {
    axios.put(`${baseUrl}/${id}`, { name, description, status: true })
        .then(() => getTodos())
        .catch(error => console.error(error));
}

function removeFromDone(id) {
    axios.delete(`${baseUrl}/${id}`)
        .then(() => getTodos())
        .catch(error => console.error(error));
}

function deleteItem(id) {
    axios.delete(`${baseUrl}/${id}`)
        .then(() => getTodos())
        .catch(error => console.error(error));
}

getTodos();
