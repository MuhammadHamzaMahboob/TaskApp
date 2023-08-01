import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    background: '#fff',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
};

Modal.setAppElement('#root');

const Home = () => {
  const location = useLocation();
  const userGroup = location.state?.group;
  const [tasks, setTasks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleLogout = () => {
    navigate('/signin', { replace: true });
  };

  const handleAddTask = (newTask) => {
    const taskWithGroup = { ...newTask, id: Date.now(), completed: false, group: userGroup };
    setTasks([...tasks, taskWithGroup]);
    updateLocalStorage([...tasks, taskWithGroup]);
    toast.success('Task added successfully!');
  };

  const handleDeleteTask = (taskId) => {
    setModalIsOpen(true);
    setTaskIdToDelete(taskId);
  };

  const deleteTaskConfirmed = () => {
    setTasks(tasks.filter((task) => task.id !== taskIdToDelete));
    updateLocalStorage(tasks.filter((task) => task.id !== taskIdToDelete));
    toast.error('Task deleted successfully!');
    setModalIsOpen(false);
  };

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    updateLocalStorage(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    toast.info('Task status updated!');
  };

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTaskIdToDelete(null);
  };

  return (
    <div className="container">
      <h1>Task Management System</h1>
      <TaskForm onAddTask={handleAddTask} />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <TaskList
        tasks={tasks}
        userGroup={userGroup}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}/>
      <ToastContainer autoClose={3000} position="top-right" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Delete Confirmation Modal" >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-buttons">
          <button className="btn-danger" onClick={deleteTaskConfirmed}>
            Delete
          </button>
          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
