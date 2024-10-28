import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task || !status || !deadline) {
      toast.error('All fields are required');
      return;
    }

    const newTask = {
      id: Date.now(),
      task,
      status,
      deadline
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setTask('');
    setStatus('');
    setDeadline('');
    toast.success('Task added successfully');
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setStatus(taskToEdit.status);
      setDeadline(taskToEdit.deadline);
      handleDeleteTask(id);
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.info('Task deleted');
  };

  return (
    <div className="container">
      <h1 align="center">Todo List</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Add Task</h2>
          <form onSubmit={handleAddTask}>
            <div className="mb-3">
              <label className="form-label">Task</label>
              <input
                type="text"
                className="form-control"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Deadline</label>
              <input
                type="datetime-local"
                className="form-control"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">Add Task</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Todo List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.status}</td>
                  <td>{new Date(task.deadline).toLocaleString()}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEditTask(task.id)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default TodoApp;
