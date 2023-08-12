const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const categoryRoutes = await Category.findAll({
  // be sure to include its associated Products
  include: [{ model: Product}]
});

res.json(categoryRoutes);
} catch (error) {
  console.error(error);
  res.status(500).send('Server Error');
}
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
      // be sure to include its associated Products
    const categoryRoutes = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });

    if (!categoryRoutes) {
      res.status(400).json({ message: 'No category found with this id'});
      return
    }

    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryRoutes = await Category.create(req.body);
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:categoryId', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.categoryId;

  try {
    // Find the category by ID
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update the category attributes
    await category.update(req.body);

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryRoutes = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryRoutes) {
      res.status(404).json({ message: 'No category found with this id'});
    }

    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
