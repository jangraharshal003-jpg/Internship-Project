import React from 'react';
import { useTasks } from '../context/TaskContext';

function TaskItem({ task }) {
  const { openEditModal, deleteTask, updateTask } = useTasks();

  const toggleComplete = () => {
    const nextCompleted = !task.completed;
    updateTask({ ...task, completed: nextCompleted, status: nextCompleted ? 'completed' : 'active' });
  };

  const priorityClass = task.priority ? `pill ${task.priority}` : 'pill';

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p className="muted">{task.description || 'No description provided'}</p>

      <div className="badges">
        <span className={priorityClass}>Priority: {task.priority}</span>
        {task.dueDate && <span className="pill">Due {new Date(task.dueDate).toLocaleDateString()}</span>}
        {task.assignedTo && <span className="pill">Assigned to {task.assignedTo}</span>}
        <span className="pill status">{task.completed ? 'Completed' : 'Active'}</span>
      </div>

      <div className="task-footer">
        <button className="btn ghost" type="button" onClick={toggleComplete}>
          {task.completed ? 'Mark active' : 'Mark done'}
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn ghost" type="button" onClick={() => openEditModal(task)}>
            Edit
          </button>
          <button className="btn danger" type="button" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

