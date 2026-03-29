  const API = 'http://localhost:3000/tasks';

    async function loadTasks() {
      const res = await fetch(API);
      const tasks = await res.json();

      const list = document.getElementById('list');
      list.innerHTML = '';

      tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

       const delBtn = document.createElement('button');
delBtn.textContent = 'Delete';
delBtn.onclick = () => deleteTask(task.id);

const editBtn = document.createElement('button');
editBtn.textContent = 'Edit';
editBtn.onclick = () => editTask(task);

li.appendChild(editBtn);
li.appendChild(delBtn);

    
        list.appendChild(li);
      });
    }

const input = document.getElementById('taskInput');

input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

    async function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();

  if (!text) return; // не добавляем пустое

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  input.value = '';
  input.focus(); // курсор обратно
  loadTasks();
}

    async function deleteTask(id) {
      await fetch(API + '/' + id, {
        method: 'DELETE'
      });

      loadTasks();
    }

    loadTasks();
    async function editTask(task) {
  const newText = prompt('Edit task:', task.text);

  if (!newText) return;

  await fetch(API + '/' + task.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  });

  loadTasks();
}
  