const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3000;

// чтобы принимать JSON (important — важно)
app.use(express.json());

// тестовый маршрут
// app.get('/', (req, res) => {
//   res.send('Server works 🚀');
// });

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map(t =>
    t.id === id ? { ...t, text: req.body.text } : t
  );

  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));

  res.json({ success: true });
});

// простой API (tasks — задачи)
let tasks = [];

try {
  const data = fs.readFileSync('tasks.json');
  tasks = JSON.parse(data);
} catch (err) {
  tasks = [];
}

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text
  };
  tasks.push(task);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
  res.json({ success: true });
});


app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});