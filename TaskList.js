import React from 'react';
import { Button, Card } from 'react-bootstrap';
// Mengganti impor 'react-bootstrap-icons' dengan ikon SVG inline untuk menghindari kesalahan resolusi
// import { Trash, PencilSquare, CheckCircle, Circle } from 'react-bootstrap-icons'; 

// SVG Inline Icons:
// 1. Trash/Delete Icon
const TrashIcon = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4l.87 9a1 1 0 0 0 1.96.118l.87-9zm7.764-1l-.87 9a1 1 0 0 1-1.96.118l-.87-9zM5 2h6v1H5V2z"/>
    </svg>
);

// 2. Pencil/Edit Icon
const PencilIcon = ({ size = 16 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.5 5.5a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 1-2.5-2.5V3a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 15.5 3v2.5zm-3.5 1h-7a.5.5 0 0 0-.5.5v.5h8v-.5a.5.5 0 0 0-.5-.5zM4 2.5a.5.5 0 0 0-.5.5v2.5h-2v-2.5a.5.5 0 0 0-.5-.5z"/>
        <path fillRule="evenodd" d="M15.5 13.5v-8a1 1 0 0 0-1-1H11v.5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1H2.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
    </svg>
);

// 3. Check Circle (Done Status)
const CheckCircleIcon = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} className="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.497 5.344 7.364a.75.75 0 0 0-1.06 1.06l2.035 2.036a.75.75 0 0 0 1.07-.02L11.97 6.03a.75.75 0 0 0 .02-1.08z"/>
    </svg>
);

// 4. Empty Circle (To Do Status)
const CircleIcon = ({ size = 24, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} className="bi bi-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>
);


const TaskList = ({ tasks, deleteTask, showEditForm, toggleStatus }) => {
  
  // Fungsi helper untuk mendapatkan Badge/warna prioritas
  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'secondary';
    }
  };

  // Mengurutkan tugas: Done di bawah, To Do/In Progress di atas
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'Done' && b.status !== 'Done') return 1;
    if (a.status !== 'Done' && b.status === 'Done') return -1;
    // Urutkan berdasarkan nama jika status sama
    return a.name.localeCompare(b.name);
  });

  if (sortedTasks.length === 0) {
    return (
      <Card className="text-center py-5 shadow-sm">
        <Card.Body>
          <p className="lead text-muted">Todo List Anda masih kosong. Tambahkan tugas baru!</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="task-list-container">
      {sortedTasks.map((task) => (
        <Card 
          className={`mb-3 shadow-sm ${task.status === 'Done' ? 'opacity-75 border-success' : ''}`} 
          key={task.id}
        >
          <Card.Body className="d-flex justify-content-between align-items-center p-3">
            
            {/* Kolom 1: Toggle Status & Task Name */}
            <div className="d-flex align-items-center flex-grow-1">
              {/* Tombol Toggle Status */}
              <Button 
                variant="light" 
                className="p-0 me-3" 
                onClick={() => toggleStatus(task)}
                aria-label={`Mark task ${task.name} as ${task.status === 'Done' ? 'To Do' : 'Done'}`}
              >
                {task.status === 'Done' ? (
                  <CheckCircleIcon color="#198754" /> // Hijau untuk Done
                ) : (
                  <CircleIcon color="#0d6efd99" /> // Biru transparan untuk To Do
                )}
              </Button>
              
              {/* Nama Tugas */}
              <div className={task.status === 'Done' ? 'text-decoration-line-through text-muted' : ''}>
                <h5 className="mb-0">{task.name}</h5>
              </div>
            </div>

            {/* Kolom 2: Details dan Actions */}
            <div className="d-flex align-items-center flex-shrink-0">
                {/* Status & Prioritas (Visible on large screens) */}
                <div className="d-none d-md-flex me-4 flex-column text-end">
                    <span className={`badge bg-${getPriorityVariant(task.priority)} mb-1`}>
                        {task.priority}
                    </span>
                    <span className={`badge bg-secondary-subtle text-dark`}>
                        {task.status}
                    </span>
                </div>

                {/* Tombol Aksi */}
                <div className="d-flex">
                    <Button 
                        variant="outline-primary" 
                        onClick={() => showEditForm(task)}
                        className="me-2"
                        size="sm"
                        aria-label="Edit Task"
                    >
                        <PencilIcon />
                    </Button>
                    <Button 
                        variant="outline-danger" 
                        onClick={() => deleteTask(task.id)}
                        size="sm"
                        aria-label="Delete Task"
                    >
                        <TrashIcon />
                    </Button>
                </div>
            </div>

          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;