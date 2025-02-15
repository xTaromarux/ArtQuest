const TaskService = {
  getTasks: (req, res) => {
    // Dla przykładu zwracamy statyczną listę zadań
    res.json([
      { id: 1, title: 'Przykładowe zadanie', description: 'Opis zadania' }
    ]);
  },
  createTask: (req, res) => {
    const { title, description } = req.body;
    // W praktyce dodajemy zadanie do bazy lub wysyłamy do kolejki
    res.status(201).json({ id: 2, title, description });
  }
};

module.exports = TaskService;
