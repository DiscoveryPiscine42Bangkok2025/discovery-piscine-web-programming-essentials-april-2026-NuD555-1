$(document).ready(function() {
    loadTodos();

    $('#new_btn').on('click', function() {
        const task = prompt("Please enter your new TO DO:");
        
        if (task !== null && task.trim() !== "") {
            addTodo(task);
            saveTodos();
        }
    });

    function addTodo(text) {
        const $div = $('<div></div>').text(text);

        $div.on('click', function() {
            if (confirm("Do you really want to delete this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend($div);
    }

    // ฟังก์ชันบันทึกข้อมูลลง Cookie
    function saveTodos() {
        const todos = [];
        $('#ft_list div').each(function() {
            todos.unshift($(this).text());
        });

        const d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        
        document.cookie = "todo_list=" + encodeURIComponent(JSON.stringify(todos)) + ";" + expires + ";path=/";
    }

    function loadTodos() {
        const name = "todo_list=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                const jsonStr = c.substring(name.length, c.length);
                const todos = JSON.parse(jsonStr);
                // นำข้อมูลกลับมาแสดงผล
                todos.forEach(task => addTodo(task));
                return;
            }
        }
    }
});