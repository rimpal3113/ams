import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";

export const getDashboardStats =
  async (req, res) => {
    try {
      const {
        fromDate,
        toDate,
      } = req.query;

      let filter = {};

      if (
        fromDate &&
        toDate
      ) {
        filter.appointmentDate =
          {
            $gte: new Date(
              fromDate
            ),
            $lte: new Date(
              toDate
            ),
          };
      }

      const totalDoctors =
        await Doctor.countDocuments();

      const totalAppointments =
        await Appointment.countDocuments(
          filter
        );

      const pending =
        await Appointment.countDocuments(
          {
            ...filter,
            status:
              "Pending",
          }
        );

      const completed =
        await Appointment.countDocuments(
          {
            ...filter,
            status:
              "Completed",
          }
        );

      const cancelled =
        await Appointment.countDocuments(
          {
            ...filter,
            status:
              "Cancelled",
          }
        );

      res.status(200).json({
        totalDoctors,
        totalAppointments,
        pending,
        completed,
        cancelled,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };