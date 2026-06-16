import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
{
firstName: {
type: String,
required: true,
},

lastName: {
  type: String,
  required: true,
},

mobile: {
  type: String,
  required: true,
},

email: {
  type: String,
  required: true,
},

doctor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Doctor",
  required: true,
},

serviceType: {
  type: String,
  required: true,
},

appointmentDate: {
  type: Date,
  required: true,
},

appointmentTime: {
  type: String,
  required: true,
},

notes: String,

status: {
  type: String,
  default: "Pending",
},


},
{
timestamps: true,
}
);

export default mongoose.model(
"Appointment",
appointmentSchema
);
