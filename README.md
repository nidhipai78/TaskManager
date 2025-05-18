# 📝 Task Manager App

A full-stack Task Manager application built with **React** for the frontend, **Flask** for the backend API, and **MongoDB** for the database. The app allows users to create, edit, delete, and filter tasks with real-time updates.

---

## 🚀 Features

- Add new tasks
- Edit task titles
- Delete tasks
- Mark tasks as completed or pending
- Filter by all, completed, or pending
- REST API using Flask
- MongoDB for persistent data storage

---

## 🧱 Tech Stack

Frontend: React, Axios, JavaScript  
Backend: Flask, Flask-CORS, Python  
Database: MongoDB (with PyMongo)

---

## 📂 Project Structure

task-manager-app/
├── backend/              # Flask backend  
│   ├── app.py  
│   ├── db.py  
│   └── requirements.txt  
├── frontend/             # React frontend  
│   ├── public/  
│   └── src/  
│       └── App.js  
│       └── index.js  
│       └── styles.css  
├── README.md

---

## 🛠️ Setup Instructions

### Backend Setup (Flask + MongoDB)

1. Navigate to the backend folder:
   cd backend

2. Create a virtual environment and activate it:
   python -m venv venv  
   source venv/bin/activate   (Windows: venv\Scripts\activate)

3. Install dependencies:
   pip install -r requirements.txt

4. Make sure MongoDB is running locally or in the cloud.

5. Start the Flask server:
   python app.py

The backend will run at http://127.0.0.1:5000

---

### Frontend Setup (React)

1. Navigate to the frontend folder:
   cd ../frontend

2. Install dependencies:
   npm install

3. Start the React development server:
   npm start

The frontend will run at http://localhost:3000

---

## 🔁 API Endpoints

GET     /tasks           - Get all tasks  
POST    /tasks           - Create a new task  
PUT     /tasks/<id>      - Update task title or completion  
DELETE  /tasks/<id>      - Delete a task

---

## MongoDB Task Schema

{
  "_id": ObjectId,
  "title": "Sample Task",
  "completed": false
}

---

## 📸 Screenshots

User Interface of the App

![image](https://github.com/user-attachments/assets/eff358b5-0c6f-4cf6-b0fa-fa8ae9eaf954)

Adding a Task

![image](https://github.com/user-attachments/assets/49239442-347f-4180-b874-234d70160dad) 

Updating a Task

![image](https://github.com/user-attachments/assets/a43cdf52-e71a-4d4e-81ec-830f0d3495d4)

Show all the pending Tasks

![image](https://github.com/user-attachments/assets/8faa0dce-05a2-422e-9c4e-b1fa6059c342)

Show all the completed Tasks

![image](https://github.com/user-attachments/assets/bfba0bf8-2364-4ad3-abcb-54e8d674f1a4)

---

## 💡 Future Enhancements

- User login and authentication
- Task due dates and priority
- Reminder notifications
- Docker support
- Responsive design for mobile

---




