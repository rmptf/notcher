import mongoose from 'mongoose';

const TestDataSchema = new mongoose.Schema({
  fakeData: String,
  testData: String,
});

module.exports =
  mongoose.models.TestData || mongoose.model('TestData', TestDataSchema);
