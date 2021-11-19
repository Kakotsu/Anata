const mongoose = require('mongoose');

const WarnSchema = new mongoose.Schema({
  warnId: String,
  userId: String,
  moderatorId: String,
  serverId: String,
  date: Date,
  reason: {
    type: String,
    required: false,
  },
  // _id: {
  //   type: String,
  //   default: require('nanoid').nanoid(5),
  // },
});

module.exports = mongoose.model('Warn', WarnSchema);