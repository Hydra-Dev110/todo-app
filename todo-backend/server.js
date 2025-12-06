const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todo = require('./models/todoModel');

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://devops:devops@cluster0.vau9ucy.mongodb.net/?appName=Cluster0");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

app.get("/get-todo", async (req, res) => {
    console.log("Fetching todos");
    try {
        const todos = await todo.find({});
        console.log("Fetched todos from DB");
        res.status(200).json(todos);
    } catch (error) {
        console.log("Error while fetching todos", error);
        res.status(500).json({ message: "Error while fetching todos" });
    }
});

app.post("/add-todo", async (req, res) => {
    try {
        const { title } = req.body;

        console.log("Adding new todo:", title?.todo ?? title);

        
        const newTodo = new todo({
            title: title?.todo || title
        });

        console.log("Adding this todo to DB:", newTodo);

        const savedTodo = await newTodo.save();

        console.log("Saved todo to DB:", savedTodo);

        res.status(200).json({ message: "Todo saved successfully!" });
    } catch (error) {
        console.error("Error while saving todo", error);
        res.status(500).json({ message: "Error while saving todo" });
    }
});

app.get("/", (req, res) => {
    res.send("Todo Backend is running!");
});

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
