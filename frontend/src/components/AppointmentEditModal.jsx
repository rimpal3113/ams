import { useEffect, useState } from "react";
import API from "../services/api";

const AppointmentEditModal = ({
  open,
  onClose,
  appointment,
  fetchAppointments,
}) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);

  if (!open || !appointment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/appointments/${appointment._id}`,
        form
      );

      fetchAppointments();

      onClose();

      alert(
        "Appointment Updated Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-4">
          Edit Appointment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            value={form.firstName || ""}
            onChange={(e) =>
              setForm({
                ...form,
                firstName:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            value={form.lastName || ""}
            onChange={(e) =>
              setForm({
                ...form,
                lastName:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <select
            value={form.status || ""}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          >
            <option>
              Pending
            </option>

            <option>
              Confirmed
            </option>

            <option>
              Completed
            </option>

            <option>
              Cancelled
            </option>
          </select>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentEditModal;