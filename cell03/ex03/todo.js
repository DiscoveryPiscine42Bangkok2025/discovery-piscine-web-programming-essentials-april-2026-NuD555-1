const ftList = document.getElementById('ft_list');
const btnNew = document.getElementById('new_btn');

window.onload = function() {
    loadTodos();
};

btnNew.addEventListener('click', () => {
    const task = prompt("Please enter your new TO DO:");
    
    if (task !== null && task.trim() !== "") {
        addTodo(task);
        saveTodos();
    }
});

function addTodo(text) {
    const div = document.createElement('div');
    div.textContent = text;

    div.addEventListener('click', () => {
        if (confirm("Do you really want to delete this TO DO?")) {
            div.remove();
            saveTodos();
        }
    });

    ftList.prepend(div);
}

function saveTodos() {
    const todos = [];
    const items = ftList.querySelectorAll('div');
    
    items.forEach(item => {
        todos.unshift(item.textContent);
    });

    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    
    document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(todos)) + ";" + expires + ";path=/";
}

function loadTodos() {
    const name = "todo_list=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            const jsonStr = c.substring(name.length, c.length);
            const todos = JSON.parse(jsonStr);
            // เพิ่มกลับเข้าไปใน List
            todos.forEach(task => addTodo(task));
            return;
        }
    }
}