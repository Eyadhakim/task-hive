const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/categories', async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new category using Prisma ORM
    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating category' });
  }
});

module.exports = router;
