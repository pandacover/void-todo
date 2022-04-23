const express = require('express');
const router = express.Router();
const { getList, setList, updateList, deleteList } = require('../controller/listController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getList);

router.post('/', protect, setList);

router.put('/:id', protect, updateList);

router.delete('/:id', protect, deleteList);

module.exports = router;