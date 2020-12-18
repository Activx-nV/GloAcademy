'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoParent) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoParent = document.querySelector(todoParent);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.todoParent.addEventListener('click', () => {
            this.handler(event);
        });
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value === '') {
            alert('Это место не может быть пустым');
            this.addTodo();
        }
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(e) {
        this.todoData.forEach((item, index) => {
            if (item.key === e.closest('.todo-item').key) {
                this.todoData.delete(index);
                this.render();
            }
        });
    }

    completedItem(e) {
        this.todoData.forEach(item => {
            if (item.key === e.closest('.todo-item').key && item.completed === false) {
                item.completed = true;
            } else if (item.key === e.closest('.todo-item').key && item.completed === true) {
                item.completed = false;
            }
        });
        this.render();
    }

    handler(event) {
        const target = event.target;

        if (target.matches('.todo-remove')) {
            this.deleteItem(target);
        } else if (target.matches('.todo-complete')) {
            this.completedItem(target);
        }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
