import React, { useEffect, useState } from 'react';
import Header from '../Component/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const [record, setRecord] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    setTask(location.state.task || '');
    setStatus(location.state.status || '');
    setDeadline(location.state.deadline || '');
  }, [location.state]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('tasks')) || [];
    setRecord(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task || !status || !deadline) {
      toast.error("All fields are required.");
      return;
    }

    const updatedRecords = record.map((item) => {
      if (item.id === location.state.id) {
        return { ...item, task, status, deadline };
      }
      return item;
    });

    localStorage.setItem('tasks', JSON.stringify(updatedRecords));
    toast.success("Task updated successfully!");
    setTask('');
    setStatus('');
    setDeadline('');

    navigate('/view');
  };

  return (
    <div>
      <Header />
      <h2 align="center" className='mt-5'>Update Task</h2>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto mt-4 border p-4 mb-5 shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="task" className="form-label">Task</label>
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  onChange={(e) => setTask(e.target.value)}
                  value={task}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  className="form-select"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="deadline" className="form-label">Deadline</label>
                <input
                  type="datetime-local"
                  id="deadline"
                  className="form-control"
                  onChange={(e) => setDeadline(e.target.value)}
                  value={deadline}
                />
              </div>

              <button type="submit" className="btn btn-primary d-block mx-auto mt-4">Update Task</button>
            </form>
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

export default Edit;
