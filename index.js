const express = require('express');
const app = express();
const path = require('path');
const port = 3003;

app.use(express.json());

// In-memory data store for student details
let students = [];

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get a student by ID
app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const student = students.find(s => s.id === studentId);

  if (!student) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    res.json(student);
  }
});

// Serve the HTML file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'crd.html'));
});

// Create a new student
app.post('/students', (req, res) => {
  const student = req.body;
  student.id = Date.now().toString(); // Generate a unique ID
  students.push(student);
  res.status(201).json({ message: 'Student created successfully', student });
});

// Update an existing student
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = req.body;
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    students[index] = { ...students[index], ...updatedStudent };
    res.json({ message: 'Student updated successfully', student: students[index] });
  }
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const index = students.findIndex(s => s.id === studentId);

  if (index === -1) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    const deletedStudent = students[index];
    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully', student: deletedStudent });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
