import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(data);
  }, []);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.error("Task deleted successfully.");
    setTasks(updatedTasks);
  };

  const toggleSelectTask = (id, checked) => {
    setSelectedTasks((prevSelected) =>
      checked ? [...prevSelected, id] : prevSelected.filter((taskId) => taskId !== id)
    );
  };

  const deleteSelectedTasks = () => {
    if (selectedTasks.length === 0) {
      toast.warn("Select at least one task to delete.");
      return;
    }
    const updatedTasks = tasks.filter((task) => !selectedTasks.includes(task.id));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setSelectedTasks([]);
    toast.error("Selected tasks deleted successfully.");
  };

  return (
    <div>
      <Header />
      <h2 align="center" className="mt-5">Todo List</h2>

      <div className="container mt-3">
        <div className="row">
          <div className="card shadow mx-auto p-4" style={{ maxWidth: '60rem', overflow: 'hidden' }}>
            <table className="table border">
              <thead>
                <tr align="center">
                  <th scope="col">Task</th>
                  <th scope="col">Status</th>
                  <th scope="col">Deadline</th>
                  <th scope="col">Actions</th>
                  <th scope="col">
                    <button className="btn btn-danger btn-sm" onClick={deleteSelectedTasks}>Delete Selected</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} align="center">
                    <td>{task.task}</td>
                    <td>{task.status}</td>
                    <td>{new Date(task.deadline).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => navigate('/edit', { state: task })}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => toggleSelectTask(task.id, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default View;
