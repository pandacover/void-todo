const asyncHandler = require('express-async-handler');
const List = require('../model/listModel');


const getList = asyncHandler(async (req, res) => {
    const list = await List.find({ user: req.user.id });
    res.status(200).json(list);
})

const setList = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field.');
    }
    const goal = await List.create({
        text: req.body.text,
        user: req.user.id,
        description: req.body.description,
    })
    res.status(200).json(goal);
})

const updateList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id);
    if (!list) {
        res.status(400);
        throw new Error('List not found');
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (list.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await List.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updateGoal);
})

const deleteList = asyncHandler(async (req, res) => {
    const list = await List.findById(req.params.id);
    if (!list) {
        res.status(400);
        throw new Error('List not found');
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (list.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await List.findByIdAndRemove(req.params.id);
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getList,
    setList,
    updateList,
    deleteList,
}