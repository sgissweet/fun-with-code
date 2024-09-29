$(document).ready(function() {
    const ft_list = $('#ft_list');

    load();

    $('#new').on('click', function() {
        let new_task = prompt('Enter your new task');
        if (new_task) {
            add_task(new_task);
        }
    });

    $(document).on('click', '.task_div', function() {
        if (confirm('Do you want to remove this TO DO?')) {
            $(this).remove();
            save();
        }
    });

    function add_task(new_task, prepend = true) {
        const new_div = $('<div>').addClass('task_div').text(new_task);

        new_div.on('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                save();
            }
        });

        if (prepend) {
            ft_list.prepend(new_div);
        } else {
            ft_list.append(new_div);
        }
        
        save();
    }

    function save() {
        const task_list = [];
        $('.task_div').each(function() {
            task_list.push($(this).text());
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