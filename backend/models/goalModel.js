//Here, we will define our schemas which is going to be fields for this particular resource
//For goals, we will only have text field

const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
    //this second object will create updated at and created at field automatically
  }
);

module.exports = mongoose.model('Goal', goalSchema);
//we are going to export the model,name it 'Goal' which takes in the goalSchema we described
