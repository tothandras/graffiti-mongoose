import mongoose from 'mongoose';

const GeometrySchema = new mongoose.Schema({
  type: { type: String },
  coordinates: [Number]
}, { _id: false });

// Country
const CountrySchema = new mongoose.Schema({
  code: String,
  name: String,
  dictionary: [{ _id: false, value: String }],
  language: [{ _id: false, code: String, name: String }],
  loc: GeometrySchema,
  creationDate: Date,
  modifiedDate: Date
});

const Country = mongoose.model('Country', CountrySchema);

export default Country;
