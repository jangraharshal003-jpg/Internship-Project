import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { api, handleError } from '../api';
import { useUser } from './UserContext';

const TaskContext = createContext(null);

const emptyTask = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  assignedTo: '',
  completed: false,
};

export const TasksProvider = ({ children }) => {
  const { isAuthenticated } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.tasks || []);
    } catch (error) {
      toast.error(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await api.post('/task/create', task);
      setTasks((prev) => [...prev, res.data]);
      toast.success('Task created');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await api.patch(`/task/${task._id}`, task);
      setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      toast.success('Task updated');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/task/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const filteredTasks = useMemo(() => {
    if (priorityFilter === 'all') return tasks;
    return tasks.filter((t) => t.priority === priorityFilter);
  }, [tasks, priorityFilter]);

  const completedTasks = tasks.filter((t) => t.completed);
  const activeTasks = tasks.filter((t) => !t.completed);

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const openCreateModal = () => {
    setEditingTask({ ...emptyTask });
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        priorityFilter,
        setPriorityFilter,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        openCreateModal,
        openEditModal,
        closeModal,
        modalOpen,
        editingTask,
        completedTasks,
        activeTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);

