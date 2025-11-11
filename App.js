import React, { useState } from 'react';
// Pastikan file index.html Anda memuat Bootstrap 5 CSS agar styling ini berfungsi.
// Contoh: <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

// Menggunakan Lucide icons (ini adalah library ikon React, bukan CSS framework)
import { Plus, Trash2, Edit, CheckCircle, RotateCcw } from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Go to gym', priority: 'High', status: 'To Do' },
  { id: 2, title: 'Read a book', priority: 'Low', status: 'Done' },
  { id: 3, title: 'Go to market', priority: 'Medium', status: 'In Progress' },
];

// Helper untuk menghasilkan ID baru
const generateId = () => {
  return Date.now();
};

// Komponen Utama Aplikasi
const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' atau 'edit'
  const [currentTask, setCurrentTask] = useState(null); // Task yang sedang diedit

  // --- Fungsi CRUD ---

  // CREATE: Menambahkan tugas baru
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: generateId(),
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      status: 'To Do',
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskPriority('Medium');
    setShowModal(false);
  };

  // DELETE: Menghapus tugas
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // UPDATE: Mengubah status tugas (To Do <-> Done)
  const toggleStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
          ...task,
          status: task.status === 'Done' ? 'To Do' : 'Done',
        }
        : task
    ));
  };

  // UPDATE: Membuka mode edit
  const startEdit = (task) => {
    setCurrentTask({ ...task });
    setModalMode('edit');
    setShowModal(true);
  };

  // UPDATE: Menyimpan perubahan tugas
  const saveEdit = (e) => {
    e.preventDefault();
    if (!currentTask || !currentTask.title.trim()) return;

    setTasks(tasks.map(task =>
      task.id === currentTask.id
        ? {
          ...currentTask,
          title: currentTask.title.trim(),
        }
        : task
    ));
    setShowModal(false);
    setCurrentTask(null);
  };

  // Menutup modal dan mereset state terkait
  const closeModal = () => {
    setShowModal(false);
    setNewTaskTitle('');
    setNewTaskPriority('Medium');
    setCurrentTask(null);
  };

  // Fungsi untuk mendapatkan style background dan warna teks status (Inline Style)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'To Do':
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // Merah muda (Alert Danger Bootstrap)
      case 'In Progress':
        return { backgroundColor: '#fff3cd', color: '#856404' }; // Kuning muda (Alert Warning Bootstrap)
      case 'Done':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Hijau muda (Alert Success Bootstrap)
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' }; // Abu-abu muda
    }
  };

  // Fungsi untuk mendapatkan warna teks prioritas (Inline Style)
  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'High':
        return { color: '#dc3545', fontWeight: 'bold' }; // Merah (Danger)
      case 'Medium':
        return { color: '#ffc107', fontWeight: 'bold' }; // Kuning (Warning)
      case 'Low':
        return { color: '#28a745', fontWeight: 'bold' }; // Hijau (Success)
      default:
        return { color: '#6c757d' }; // Abu-abu (Secondary)
    }
  };

  // Komponen TaskCard (Menggunakan kelas Bootstrap)
  const TaskCard = ({ task }) => {
    const statusStyle = getStatusStyle(task.status);
    const priorityTextStyle = getPriorityTextColor(task.priority);
    
    return (
      <div className="card shadow-sm mb-3 border-0 rounded-3">
        <div className="card-body p-3 d-flex align-items-center justify-content-between">
          
          {/* Konten Task */}
          <div className="flex-grow-1 me-3">
            <p className="text-muted small text-uppercase mb-0">Task</p>
            <h3 className={`h5 mb-1 ${task.status === 'Done' ? 'text-decoration-line-through text-muted' : ''}`}>
              {task.title}
            </h3>
            
            <div className="d-flex align-items-center mt-2 small">
              {/* Prioritas */}
              <span className="text-muted me-1">Priority:</span>
              <span style={priorityTextStyle} className="me-3">{task.priority}</span>
              
              {/* Status Badge */}
              <span 
                className="badge rounded-pill px-2 py-1" 
                style={statusStyle}
              >
                {task.status}
              </span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="d-flex align-items-center gap-2">
            
            {/* Tombol Toggle Status */}
            <button
              onClick={() => toggleStatus(task.id)}
              className={`btn btn-sm p-1 rounded-circle ${task.status === 'Done' ? 'btn-success' : 'btn-outline-primary'}`}
              title={task.status === 'Done' ? 'Set as To Do' : 'Set as Done'}
            >
              {task.status === 'Done' ? <RotateCcw size={18} /> : <CheckCircle size={18} />}
            </button>

            {/* Tombol Edit */}
            <button
              onClick={() => startEdit(task)}
              className="btn btn-sm btn-outline-secondary p-1 rounded-circle"
              title="Edit Task"
            >
              <Edit size={18} />
            </button>

            {/* Tombol Delete */}
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-sm btn-outline-danger p-1 rounded-circle"
              title="Delete Task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Komponen Modal (Menggunakan kelas Bootstrap)
  const Modal = ({ title, mode }) => {
    const isAddMode = mode === 'add';

    return (
      // Kelas Modal Bootstrap (menampilkan/menyembunyikan dengan 'show d-block' atau 'd-none')
      <div 
        className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} 
        tabIndex="-1" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
        onClick={closeModal} 
      >
        <div className="modal-dialog modal-md modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content rounded-3 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title h5 fw-bold text-dark">{title}</h5>
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>

            <form onSubmit={isAddMode ? addTask : saveEdit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="task-title" className="form-label small fw-bold text-muted">Judul Tugas</label>
                  <input
                    id="task-title"
                    type="text"
                    className="form-control"
                    placeholder="Masukkan judul tugas"
                    value={isAddMode ? newTaskTitle : currentTask?.title || ''}
                    onChange={(e) => isAddMode ? setNewTaskTitle(e.target.value) : setCurrentTask({ ...currentTask, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="task-priority" className="form-label small fw-bold text-muted">Prioritas</label>
                  <select
                    id="task-priority"
                    className="form-select"
                    value={isAddMode ? newTaskPriority : currentTask?.priority || 'Medium'}
                    onChange={(e) => isAddMode ? setNewTaskPriority(e.target.value) : setCurrentTask({ ...currentTask, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-0 pt-0">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="btn btn-secondary"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary d-flex align-items-center"
                >
                  {isAddMode ? <><Plus size={20} className="me-1" /> Tambah Tugas</> : <><Edit size={20} className="me-1" /> Simpan Perubahan</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-vh-100 bg-light p-4 p-sm-5">
      <div className="container-lg">
        
        {/* Header dan Tombol Tambah Tugas */}
        <header className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h1 className="display-6 fw-bold text-dark">Task List</h1>
          <button
            onClick={() => { setModalMode('add'); setShowModal(true); }}
            className="btn btn-primary d-flex align-items-center px-4 py-2 rounded-pill shadow-sm"
          >
            <Plus size={20} className="me-1" /> Add Task
          </button>
        </header>

        {/* Daftar Tugas */}
        <div className="mt-4">
          {tasks.length === 0 ? (
            <div className="text-center py-5 border border-dashed border-secondary bg-white rounded-3 shadow-sm">
              <p className="text-muted lead">Tidak ada tugas! Silakan tambahkan tugas baru.</p>
            </div>
          ) : (
            tasks
              .sort((a, b) => {
                // Sortir: Done ke bawah, To Do/In Progress ke atas
                if (a.status === 'Done' && b.status !== 'Done') return 1;
                if (a.status !== 'Done' && b.status === 'Done') return -1;
                
                // Sortir prioritas (High > Medium > Low) di antara yang belum selesai
                const priorityOrder = { High: 3, Medium: 2, Low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))
          )}
        </div>
      </div>

      {/* Tampilkan Modal */}
      {showModal && (
        <Modal 
          title={modalMode === 'add' ? 'Tambah Tugas Baru' : 'Edit Tugas'}
          mode={modalMode}
        />
      )}
    </div>
  );
};

export default App;