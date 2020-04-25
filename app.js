'use strict';
import * as st from './storage.js';

let todo_Input = document.querySelector('.todo-input');
let add_Button = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let select_Div = document.querySelector('.selectDiv');

document.addEventListener('DOMContentLoaded', st.getStorage);
add_Button.addEventListener('click', createTodo);
todoList.addEventListener('click', markTodo);
select_Div.addEventListener('click', filterTodo);

function createTodo(ev) {
    ev.preventDefault();

    if (todo_Input.value === '') {
        todo_Input.focus();
        return;
    }

    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    let newTodo = document.createElement('li');
    newTodo.innerHTML = todo_Input.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    let todo = {
        value: todo_Input.value,
        state: 'uncompleted',
    };
    st.addTodoStorage(todo);

    todo_Input.value = '';
    todo_Input.focus();
}

function markTodo(ev) {
    let clicked = ev.target;

    if (clicked.classList[0] === 'delete-btn') {
        const todo = clicked.parentElement;
        todo.classList.add('fall');
        st.removeTodoStorage(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    if (clicked.classList[0] === 'complete-btn') {
        const todo = clicked.parentElement;
        todo.classList.toggle('completed');
        st.updateStateStorage(todo);
    }

    todo_Input.focus();
}

function filterTodo(ev) {
    const todos = todoList.childNodes;

    todos.forEach((todo) => {
        switch (ev.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else todo.style.display = 'none';
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else todo.style.display = 'none';
                break;
        }
    });
}
