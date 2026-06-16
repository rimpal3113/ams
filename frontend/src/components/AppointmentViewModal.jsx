const AppointmentViewModal = ({
  open,
  onClose,
  appointment,
}) => {
  if (!open || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Appointment Details
        </h2>

        <div className="space-y-2">
          <p>
            <strong>Patient:</strong>{" "}
            {appointment.firstName}{" "}
            {appointment.lastName}
          </p>

          <p>
            <strong>Doctor:</strong>{" "}
            {appointment.doctor?.name}
          </p>

          <p>
            <strong>Service:</strong>{" "}
            {appointment.serviceType}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              appointment.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {appointment.appointmentTime}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {appointment.status}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {appointment.email}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {appointment.mobile}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {appointment.notes}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentViewModal;