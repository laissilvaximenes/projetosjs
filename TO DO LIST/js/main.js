// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");


// Funções

const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const filterAll = () => {
    const all = Array.from(todoList.children);
    const filter = filterSelect.value;

    all.forEach(todo => {
        
        switch(filter){
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                if(todo.classList.contains("done")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "todo":
                if(!todo.classList.contains("done")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });


} 

const searchAll = () => {
    const all = Array.from(todoList.children);
    const searchTerm = searchInput.value.toLowerCase();

    all.forEach (todo => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        if(todoTitle.includes(searchTerm)){
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }

    });

}

// Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e) =>{

    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

});

cancelEditBtn.addEventListener("click", (e) => {

    e.preventDefault();
    toggleForms();
});

filterSelect.addEventListener("change", filterAll);
searchInput.addEventListener("input", searchAll);
