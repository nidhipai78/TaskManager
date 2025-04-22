import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const API_URL = "http://127.0.0.1:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") return;
    axios.post(API_URL, { title: newTask, completed: false }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask("");
    });
  };

  const toggleTask = (id, completed) => {
    axios.put(`${API_URL}/${id}`, { completed: !completed }).then(() => {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, completed: !completed } : task)));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditedTaskTitle(task.title);
  };

  const saveEditedTask = (id) => {
    axios.put(`${API_URL}/${id}`, { title: editedTaskTitle }).then(() => {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, title: editedTaskTitle } : task)));
      setEditingTask(null);
      setEditedTaskTitle("");
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Manager</h1>

      {/* Input for adding a new task */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>➕ Add Task</button>
      </div>

      {/* Task Filter Options */}
      <div style={styles.filterContainer}>
        <button onClick={() => setFilter("all")} style={styles.filterButton}>All</button>
        <button onClick={() => setFilter("completed")} style={styles.filterButton}>Completed</button>
        <button onClick={() => setFilter("pending")} style={styles.filterButton}>Pending</button>
      </div>

      {/* Task List */}
      <ul style={styles.taskList}>
        {filteredTasks.map((task) => (
          <li key={task._id} style={styles.taskItem}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task._id, task.completed)}
              style={styles.checkbox}
            />
            
            {editingTask === task._id ? (
              <input
                type="text"
                value={editedTaskTitle}
                onChange={(e) => setEditedTaskTitle(e.target.value)}
                style={styles.editInput}
              />
            ) : (
              <span style={{ ...styles.taskText, textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title}
              </span>
            )}

            {editingTask === task._id ? (
              <button onClick={() => saveEditedTask(task._id)} style={styles.saveButton}>💾 Save</button>
            ) : (
              <button onClick={() => startEditing(task)} style={styles.editButton}>
                <FaEdit size={20} />
              </button>
            )}

            <button onClick={() => deleteTask(task._id)} style={styles.deleteButton}>
              <FaTrash size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🎨 Styling for better UI
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#282c34",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    border: "none",
    width: "250px",
  },
  addButton: {
    padding: "10px 15px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#61dafb",
    color: "#000",
    cursor: "pointer",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  filterButton: {
    padding: "8px 12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#555",
    color: "#fff",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: "0",
    width: "60%",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#444",
    marginBottom: "10px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  taskText: {
    fontSize: "1.2rem",
    flex: "1",
    marginLeft: "10px",
  },
  editInput: {
    padding: "5px",
    fontSize: "1.2rem",
    borderRadius: "5px",
    border: "none",
  },
  editButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "yellow",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "lightgreen",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "red",
    cursor: "pointer",
  },
};

export default App;
