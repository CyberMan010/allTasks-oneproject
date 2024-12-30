import React, { useState } from "react";
import InputCustom from "./custominput";
import ButtonCustom from "./button";

function Myform() {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");

    const validateTask = () => {
        if (!taskName || taskName.trim().length < 3) {
            alert("Task Name must be at least 3 characters long.");
            return false;
        }

        if (!dueDate || new Date(dueDate) < new Date()) {
            alert("Due Date must not be in the past.");
            return false;
        }

        if (!priority) {
            alert("Priority is required.");
            return false;
        }

        return true;
    };

    const handleAddTask = () => {
        if (!validateTask()) return;

        // Return the validated task
        return {
            taskName: taskName.trim(),
            dueDate,
            priority,
            description: description.trim(),
        };
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <h2>Create a New Task</h2>
            <InputCustom
                name="Task Name"
                placeholder="Enter task name"
                required
                minLength={3}
                onInputChange={setTaskName}
            />
            <InputCustom
                name="Due Date"
                type="date"
                required
                onInputChange={setDueDate}
            />
            <InputCustom
                name="Task Priority"
                type="select"
                required
                options={["Low", "Medium", "High"]}
                onInputChange={setPriority}
            />
            <InputCustom
                name="Description"
                placeholder="Enter description (optional)"
                maxLength={200}
                onInputChange={setDescription}
            />
            <ButtonCustom getTask={handleAddTask} />
        </form>
    );
}

export default Myform;