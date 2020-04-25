'use strict'
let todoList = document.querySelector('.todo-list');

const createDeleteButton = (todoDiv) => {
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
};

const createCompletedButton = (todoDiv) => {
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
};

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        return (todos = []);
    } else {
        return (todos = JSON.parse(localStorage.getItem('todos')));
    }
}

export function addTodoStorage(todo) {
    let todos = getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function getStorage() {
    let todos = getTodos();

    todos.forEach((todo) => {
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        let newTodo = document.createElement('li');
        newTodo.innerHTML = todo.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        createCompletedButton(todoDiv);
        createDeleteButton(todoDiv);

        if (todo.state === 'completed') {
            todoDiv.classList.add('completed');
        }

        todoList.appendChild(todoDiv);
    });
}

export function updateStateStorage(todo) {
    let todos = getTodos();

    const todoValueDiv = todo.children[0].innerText;
    todos.forEach((el) => {
        if (el.value === todoValueDiv) {
            if (el.state === 'uncompleted') {
                el.state = 'completed';
            } else if (el.state === 'completed') {
                el.state = 'uncompleted';
            }
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeTodoStorage(todo) {
    let todos = getTodos();

    const todoValueDiv = todo.children[0].innerText;
    let i = 0;
    let todoIndex;
    for (let el of todos) {
        if (el.value == todoValueDiv) {
            todoIndex = i;
        }
        i++;
    }
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
