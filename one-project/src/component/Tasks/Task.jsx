import React from "react";

function Task({ task, onRemove }) {
    return (
        <div className="task">
            <h2>{task.taskName}</h2>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            {task.description && <p>Description: {task.description}</p>}
            <button onClick={() => onRemove(task.id)}>Remove Task</button>
        </div>
    );
}

export default Task;
