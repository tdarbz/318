// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware
app.use((req, res, next) => {
    console.log(`Request Type: ${req.method} Request URL: ${req.originalUrl}`);
    next();
});

app.use((req, res, next) => {
    req.timestamp = Date.now();
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Set up template engine
app.set('view engine', 'ejs');

// Define todos array
let todos = [];

// Routes
app.get('/todos', (req, res) => {
    // Render the 'index' view and pass in todos
    res.render('index', { todos: todos });
});

app.post('/todos', (req, res) => {
    // Create a new todo and add to todos
    todos.push(req.body.todo);
    res.redirect('/todos');
});

app.put('/todos/:id', (req, res) => {
    // Update a todo
    todos[req.params.id] = req.body.todo;
    res.redirect('/todos');
});

app.delete('/todos/:id', (req, res) => {
    // Delete a todo
    todos.splice(req.params.id, 1);
    res.redirect('/todos');
});

app.get('/', (req, res) => {
    res.redirect('/todos');
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
