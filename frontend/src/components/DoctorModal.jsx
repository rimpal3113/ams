import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const DoctorModal = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/doctors",
        doctor
      );

      alert(data.message);

      setDoctor({
        name: "",
        specialization: "",
        status: "Active",
      });

      navigate("/doctors");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add doctor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">
            Add Doctor
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="Specialization"
            value={doctor.specialization}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                specialization: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            value={doctor.status}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                status: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : "Save Doctor"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/doctors")
              }
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;