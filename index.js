// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get the root element with the id "root"
    const root = document.getElementById("root");

    // Retrieve tasks from local storage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render the ToDo list
    const render = () => {
        // Clear the content of the root element
        root.innerHTML = "";

        // Heading
        const heading = document.createElement("h1");
        heading.textContent = "ToDo List";

        // Input Box
        const inputBox = document.createElement("div");
        inputBox.classList.add("inputbox");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add Items";
        input.id = "inputList";

        // Listen for "Enter" key press to add a task
        input.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                addTask();
            }
        });

        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.onclick = addTask;

        inputBox.appendChild(input);
        inputBox.appendChild(addButton);

        // Task List
        const taskList = document.createElement("ol");

        // Iterate through tasks and create list items
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("todo_style");
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}" >${task.text}</span>
                <i class="fas fa-times" onclick="deleteTask(${index})"></i>
                <i class="fas fa-edit" onclick="editTask(${index})"></i>
            `;
            taskList.appendChild(taskItem);
        });

        // Append elements to root
        root.appendChild(heading);
        root.appendChild(inputBox);
        root.appendChild(taskList);
    };

    // Function to save tasks to local storage
    const saveToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Define the global function addTask
    window.addTask = function () {
        // Get the input value and add a new task to the tasks array
        const inputList = document.getElementById("inputList").value;
        tasks.push({ text: inputList, completed: false });
        // Save tasks to local storage and render the updated list
        saveToLocalStorage();
        render();
    };

    // Define the global function deleteTask
    window.deleteTask = function (index) {
        // Remove the task at the specified index from the tasks array
        tasks.splice(index, 1);
        // Save tasks to local storage and render the updated list
        saveToLocalStorage();
        render();
    };

    // Define the global function editTask
    window.editTask = function (index) {
        // Prompt the user for a new text for the task
        const newText = prompt("Enter new text:");
        // If the user entered a new text, update the task and render the updated list
        if (newText !== null) {
            tasks[index].text = newText;
            // Save tasks to local storage and render the updated list
            saveToLocalStorage();
            render();
        }
    };

    // Initial rendering of the ToDo list
    render();
});
