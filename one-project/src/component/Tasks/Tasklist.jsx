import React from "react";
import { useTasks } from './myContext'
import Task from "./Task";

function Tasklist() {
    const { tasks, removeTask } = useTasks();

    if (tasks.length === 0) {
        return <h2>No tasks available. Add a new task!</h2>;
    }

    return (
        <div>
            <h1>Task List</h1>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onRemove={removeTask} />
            ))}
        </div>
    );
}

export default Tasklist;
