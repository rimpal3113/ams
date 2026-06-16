import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AppointmentModal = () => {
const navigate = useNavigate();

const [doctors, setDoctors] = useState([]);

const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
firstName: "",
lastName: "",
mobile: "",
email: "",
doctor: "",
serviceType: "New Case",
appointmentDate: "",
appointmentTime: "10:00 AM",
notes: "",
});

const fetchDoctors = async () => {
try {
const { data } = await API.get(
"/doctors"
);


  setDoctors(data.doctors);
} catch (error) {
  console.log(error);
}


};

useEffect(() => {
fetchDoctors();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const { data } = await API.post(
    "/appointments",
    form
  );

  alert(data.message);

  navigate("/appointments");
} catch (error) {
  console.log(error);

  alert(
    error.response?.data?.message ||
      "Failed to create appointment"
  );
} finally {
  setLoading(false);
}


};

return ( <div className="max-w-5xl mx-auto"> <div className="bg-white rounded-2xl shadow-xl overflow-hidden">


    <div className="bg-blue-600 text-white px-6 py-4">
      <h2 className="text-2xl font-bold">
        New Appointment
      </h2>
    </div>

    <form
      onSubmit={handleSubmit}
      className="p-6"
    >
      <h3 className="font-semibold mb-4">
        Patient Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              firstName:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <input
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={(e) =>
            setForm({
              ...form,
              mobile:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        />
      </div>

      <h3 className="font-semibold mb-4">
        Appointment Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <select
          value={form.doctor}
          onChange={(e) =>
            setForm({
              ...form,
              doctor:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        >
          <option value="">
            Select Doctor
          </option>

          {doctors.map(
            (doctor) => (
              <option
                key={
                  doctor._id
                }
                value={
                  doctor._id
                }
              >
                {doctor.name}
              </option>
            )
          )}
        </select>

        <select
          value={
            form.serviceType
          }
          onChange={(e) =>
            setForm({
              ...form,
              serviceType:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
        >
          <option>
            New Case
          </option>
          <option>
            Follow Up
          </option>
          <option>
            Consultation
          </option>
          <option>
            Other
          </option>
        </select>

        <input
          type="date"
          value={
            form.appointmentDate
          }
          onChange={(e) =>
            setForm({
              ...form,
              appointmentDate:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
          required
        />

        <select
          value={
            form.appointmentTime
          }
          onChange={(e) =>
            setForm({
              ...form,
              appointmentTime:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg"
        >
          <option>
            10:00 AM
          </option>
          <option>
            10:15 AM
          </option>
          <option>
            10:30 AM
          </option>
          <option>
            10:45 AM
          </option>
        </select>
      </div>

      <textarea
        rows="4"
        placeholder="Notes"
        value={form.notes}
        onChange={(e) =>
          setForm({
            ...form,
            notes:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg mt-4"
      />

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() =>
            navigate(
              "/appointments"
            )
          }
          className="border px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading
            ? "Saving..."
            : "Save Appointment"}
        </button>
      </div>
    </form>
  </div>
</div>


);
};

export default AppointmentModal;
