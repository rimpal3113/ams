const DoctorViewModal = ({
  open,
  onClose,
  doctor,
}) => {
  if (!open || !doctor)
    return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Doctor Details
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">

          <p>
            <strong>Name:</strong>{" "}
            {doctor.name}
          </p>

          <p>
            <strong>Specialization:</strong>{" "}
            {doctor.specialization}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {doctor.status}
          </p>

        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default DoctorViewModal;