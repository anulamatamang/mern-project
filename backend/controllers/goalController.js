//when we use mongoose in each of these functions to interact with the database, we get back a  promise, so we will add async/await to the functions
//By default if we use the .then.catch syntax, we'll have to do .catch.
//But since we are doing async/await, we would do try/catch
//Now if we don't want to use try/catch, and use our error handler, we can use a package called express-async-handler
//After installing the package, we will add that to our controller like:

const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

//and then all we have to do is wrap the functions with asyncHandler

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({
    user: req.user.id,
  });

  //res.status(200).json({ message: 'Get goals' });
  res.status(200).json(goals);
  //pass json object or array inside the function
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);

    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  //   res.status(200).json({ message: 'Set goal' });
  res.status(200).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  //   res.status(200).json({ message: `Update goal ${req.params.id}` });
  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
