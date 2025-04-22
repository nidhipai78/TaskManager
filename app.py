from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["task_manager"]
tasks_collection = db["tasks"]

# Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = list(tasks_collection.find({}, {"_id": 1, "title": 1, "completed": 1}))
    for task in tasks:
        task["_id"] = str(task["_id"])  # Convert ObjectId to string
    return jsonify(tasks)

# Add a new task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    new_task = {"title": data["title"], "completed": False}
    result = tasks_collection.insert_one(new_task)
    new_task["_id"] = str(result.inserted_id)
    return jsonify(new_task), 201

# Delete a task
@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    result = tasks_collection.delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count:
        return jsonify({"message": "Task deleted"}), 200
    return jsonify({"error": "Task not found"}), 404

# Update a task (Mark as completed or change title)
@app.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.json
    update_data = {}

    if "title" in data:
        update_data["title"] = data["title"]
    if "completed" in data:
        update_data["completed"] = data["completed"]

    result = tasks_collection.update_one({"_id": ObjectId(task_id)}, {"$set": update_data})

    if result.matched_count:
        return jsonify({"message": "Task updated"}), 200
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
