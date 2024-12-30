import React from "react";
import { useTasks } from './myContext';
import { toast } from "react-toastify";

function ButtonCustom({ getTask }) {
    const { addTask } = useTasks();

    const handleClick = () => {
        const task = getTask(); // Validate and retrieve the task
        if (task) {
            addTask(task);
            toast.success("Task added successfully!");
        }
    };

    return <button onClick={handleClick}>Add Task</button>;
}

export default ButtonCustom;