import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask } from '../../store/slices/taskSlice';
import TaskList from './TaskList';
import Myform from './form';

const TaskManagement = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <Myform onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onRemoveTask={handleRemoveTask} />
    </div>
  );
};

export default TaskManagement;