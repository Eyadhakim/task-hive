const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/tasks', async (req, res) => {
  const { title, description, userId, categoryId } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        user: { connect: { id: userId } },
        category: { connect: { id: categoryId } },
        status: 'in-progress',
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating task' });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating task' });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Task deleted', task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
