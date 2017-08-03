'use strict';

const mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = (req, res) => {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = (req, res) => {
  console.log(req.body);
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = (req, res) => {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = (req, res) => {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = (req, res) => {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.change_state = (req, res) => {
    Task.findById(req.params.taskId)
        .then((task) => Task.findOneAndUpdate(req.params.taskId, { done: !task.done }, {new: true}))
        .then((task) => res.status(200).json(task))
        .catch((err) => res.status(500).json(err));
};
