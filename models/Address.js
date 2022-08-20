const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  full_name: {
    type: Schema.Types.String,
    required: true,
  },
  mobile_no: {
    type: Schema.Types.String,
    required: true,
  },
  pincode: {
    type: Schema.Types.Number,
    required: true,
  },
  address_1: {
    type: Schema.Types.String,
    required: true,
  },
  address_2: {
    type: Schema.Types.String,
  },
  address_3: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
  },
  state: {
    type: Schema.Types.String,
  },
  isDefault: {
    type: Schema.Types.Boolean,
    required: true,
  },
  address_type: {
    type: Schema.Types.String,
  },
});

module.exports = Address = mongoose.model("address", AddressSchema);
