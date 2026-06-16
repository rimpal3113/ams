import Doctor from "../models/Doctor.js";

// Add Doctor
export const addDoctor = async (req, res) => {
  try {
    const { name, specialization, status } =
      req.body;

    const doctor = await Doctor.create({
      name,
      specialization,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Doctors
export const getDoctors = async (
  req,
  res
) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const updateDoctor = async (req, res) => {
try {
const doctor = await Doctor.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);


res.status(200).json({
  success: true,
  doctor,
});

} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
};

export const deleteDoctor = async (req, res) => {
try {
await Doctor.findByIdAndDelete(
req.params.id
);


res.status(200).json({
  success: true,
  message: "Doctor Deleted",
});


} catch (error) {
res.status(500).json({
message: "Server Error",
});
}
};
