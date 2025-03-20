const mongoose = require('mongoose');

const dataEntrySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Data is required'],
    },
    createdBy: {
      type: String,
      required: [true, 'Creator email is required'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email',
      ],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

dataEntrySchema.index({ date: 1, createdBy: 1 });

const DataEntry = mongoose.model('DataEntry', dataEntrySchema);

module.exports = DataEntry; 