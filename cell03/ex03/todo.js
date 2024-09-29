document.addEventListener('DOMContentLoaded', function() {
    const new_button = document.getElementById('new');
    const ft_list = document.getElementById('ft_list');

    load();

    new_button.addEventListener('click', function() {
        let new_task = prompt('Enter your new task');
        if(new_task) {
            add_task(new_task);
        }
    });

    function add_task(new_task, prepend = true) {
        const new_div = document.createElement('div');
        new_div.className = 'task_div';
        new_div.textContent = new_task;

        new_div.addEventListener('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                new_div.remove();
                save();
            }
        });

        if (prepend) {
            ft_list.insertBefore(new_div, ft_list.firstChild);
        } else {
            ft_list.appendChild(new_div);
        }
        
        save();
    }

    function save() {
        const task_list = [];
        document.querySelectorAll('.task_div').forEach(task_div => {
            task_list.push(task_div.textContent);
        });

        document.cookie = "task_list=" + encodeURIComponent(JSON.stringify(task_list)) + ";path=/;expires=Wed, 1 Jan 2025 00:00:00 GMT";
    }

    function load() {
        const cookies = document.cookie.split('; ');
        const task_cookie = cookies.find(cookie => cookie.startsWith('task_list='));
        if (task_cookie) {
            const task_list = JSON.parse(decodeURIComponent(task_cookie.split('=')[1]));
            task_list.forEach(task => add_task(task, false)); 
        }
    }
});
