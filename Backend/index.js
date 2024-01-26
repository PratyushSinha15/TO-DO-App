const express = require('express');
const { createTodo, updateTodo } = require('./types.js');
const { todo } = require('./db.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());// cors is a middleware that allows us to make requests from any frontend to the backend without any issues

app.post('/todo', async (req, res) => {
    try {
        const createPayload = req.body;
        const parsedPayload = createTodo.safeParse(createPayload);

        if (!parsedPayload.success) {
            return res.status(400).json({
                error: parsedPayload.error,
            });
        }

        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });

        return res.status(201).json({
            message: 'Todo created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find({});
        return res.status(200).json({
            todos: todos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

app.put('/completed', async (req, res) => {
    try {
        const updatePayload = req.body;
        const parsedPayload = updateTodo.safeParse(updatePayload);

        if (!parsedPayload.success) {
            return res.status(400).json({
                error: parsedPayload.error,
            });
        }

        await todo.updateOne(
            { _id: req.body.id },
            { completed: true }
        );

        return res.status(200).json({
            message: 'Todo marked as completed successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
