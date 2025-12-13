import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
  assignedTo: '',
  completed: false,
};

function TaskModal() {
  const { modalOpen, closeModal, editingTask, createTask, updateTask } = useTasks();
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '',
        assignedTo: editingTask.assignedTo || '',
        completed: editingTask.completed || false,
        _id: editingTask._id,
      });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const payload = {
      ...form,
      dueDate: form.dueDate || null,
      status: form.completed ? 'completed' : 'active',
    };

    if (form._id) {
      await updateTask(payload);
    } else {
      await createTask(payload);
    }
    closeModal();
  };

  if (!modalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 10px' }}>{form._id ? 'Edit task' : 'Add task'}</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label>Assigned to</label>
            <input
              value={form.assignedTo}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              placeholder="e.g. Alex Johnson"
            />
          </div>
          <div className="row">
            <div>
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label>Due date</label>
              <input
                type="date"
                value={form.dueDate || ''}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label>Status</label>
            <select
              value={form.completed ? 'completed' : 'active'}
              onChange={(e) => setForm({ ...form, completed: e.target.value === 'completed' })}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button className="btn ghost" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn primary" type="submit">
              {form._id ? 'Update task' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

