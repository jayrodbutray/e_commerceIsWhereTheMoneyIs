const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  try {
  const tagRoutes = await Tag.findAll({
  // be sure to include its associated Products
  include: [{ model: Product}]
});

res.json(tagRoutes);
} catch (error) {
  console.error(error);
  res.status(500).send('Server Error');
}
});

router.get('/:id', async (req, res) => {
  try {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model:Product}]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});


router.post('/', async (req, res) => {

  try {
    const tagDataData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.put('/:tagId', async (req, res) => {
  // update a category by its `id` value
  const tagId = req.params.tagId;

  try {
    // Find the category by ID
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Update the category attributes
    await tag.update(req.body);

    res.json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const tagDataData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
