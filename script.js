document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't re-save when loading
    }

    // Save all tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            const text = li.firstChild.textContent.trim(); // Exclude button text
            tasks.push(text);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task (optionally save to Local Storage)
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update storage after removing
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveTasks(); // Update storage after adding
        }
    }

    // Handle add task action
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTask(taskText);
        taskInput.value = '';
    }

    // Event listeners
    addButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});
