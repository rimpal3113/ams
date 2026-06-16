import Appointment from "../models/Appointment.js";

export const addAppointment = async (
req,
res
) => {
try {
const {
doctor,
appointmentDate,
appointmentTime,
} = req.body;


const existingAppointment =
  await Appointment.findOne({
    doctor,
    appointmentDate,
    appointmentTime,
  });

if (existingAppointment) {
  return res.status(400).json({
    success: false,
    message:
      "This time slot is already booked.",
  });
}

const appointment =
  await Appointment.create(req.body);

res.status(201).json({
  success: true,
  message:
    "Appointment Added Successfully",
  appointment,
});


} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
};

export const getAppointments =
async (req, res) => {
try {
const appointments =
await Appointment.find()
.populate("doctor");


  res.status(200).json({
    success: true,
    appointments,
  });
} catch (error) {
  res.status(500).json({
    message: "Server Error",
  });
}


};




export const updateAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment Updated Successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};