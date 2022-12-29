const setList = () => {
    var tasks = JSON.parse(localStorage.getItem("Tasks")) == null ? [] : JSON.parse(localStorage.getItem("Tasks"));
    var list = "";
    tasks.map((e) => {
        list += '<li class="list-item bg-gray-900 text-white rounded p-3 mb-3">' +
                    '<span class="' + (e.isCompleted ? 'line-through' : '') + '">' + e.task + '</span>' +
                    '<div data-id="' + e.dateAdd + '" class="float-right">' +
                        '<button class="hover:text-green-500 delete bg-red-900 font-bold rounded text-white px-3 py-1 text-sm">' +
                        '<i class="fa fa-trash" aria-hidden="true"></i>' +
                        '</button>' +
                        '<button class="hover:text-green-500 complete ms-3 bg-blue-900 ml-4 font-bold rounded text-white px-3 py-1 text-sm">' +
                        (e.isCompleted ? '<i class="fas fa-redo"></i>' : '<i class="fas fa-check-circle"></i>') +
                        '</button>' +
                    '</div>' +
                '</li>';
    });
    $('#list-container').html(list)

    $('.complete').each(function () {
        this.onclick = () => {
            invertState($(this).parent().data('id'));
            setList();
            console.log(this);
        }
    });

    $('.delete').each(function () {
        this.onclick = () => {
            deleteTask($(this).parent().data('id'));
            setList();
        }
    });

}

document.load += setList();

document.getElementById("todo-form").onsubmit = (e) => {
    var tasks = JSON.parse(localStorage.getItem("Tasks")) == null ? [] : JSON.parse(localStorage.getItem("Tasks"));
    
    const task = {
        task: $("[name='task']").val(),
        isCompleted: false,
        dateAdd: new Date().getTime()
    }
    tasks.push(task);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    setList();
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem("Tasks")).filter(task => task.dateAdd != id);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function invertState(id) {

    let tasks = JSON.parse(localStorage.getItem("Tasks")).map(task => {
        if (task.dateAdd == id) {
            return {
                task: task.task,
                isCompleted: !task.isCompleted,
                dateAdd: task.dateAdd
            }
        }
        return task;
    });
    localStorage.setItem("Tasks", JSON.stringify(tasks));

}