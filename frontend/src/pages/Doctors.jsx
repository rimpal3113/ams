import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import DoctorViewModal from "../components/DoctorViewModal";
const Doctors = () => {
const [doctors, setDoctors] = useState([]);

const [editingId, setEditingId] =
useState(null);

const [viewOpen, setViewOpen] =
  useState(false);

const [selectedDoctor,
  setSelectedDoctor] =
  useState(null);
const [doctorForm, setDoctorForm] =
useState({
name: "",
specialization: "",
status: "Active",
});


const handleView = (doctor) => {
  setSelectedDoctor(doctor);
  setViewOpen(true);
};

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

const handleEdit = (doctor) => {
setEditingId(doctor._id);


setDoctorForm({
  name: doctor.name,
  specialization:
    doctor.specialization,
  status: doctor.status,
});

window.scrollTo({
  top: 0,
  behavior: "smooth",
});


};

const handleUpdate = async () => {
try {
await API.put(
`/doctors/${editingId}`,
doctorForm
);


  alert(
    "Doctor Updated Successfully"
  );

  setEditingId(null);

  setDoctorForm({
    name: "",
    specialization: "",
    status: "Active",
  });

  fetchDoctors();
} catch (error) {
  console.log(error);
}


};

const handleDelete = async (id) => {
const confirmDelete =
window.confirm(
"Are you sure you want to delete this doctor?"
);


if (!confirmDelete) return;

try {
  await API.delete(
    `/doctors/${id}`
  );

  alert(
    "Doctor Deleted Successfully"
  );

  fetchDoctors();
} catch (error) {
  console.log(error);
}


};

useEffect(() => {
fetchDoctors();
}, []);



return ( <div> <div className="flex justify-between mb-5"> <h2 className="text-3xl font-bold">
Doctors </h2>


    <Link to="/add-doctor">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Add Doctor
      </button>
    </Link>
  </div>

  {editingId && (
    <div className="bg-white rounded-xl shadow p-5 mb-5">
      <h3 className="text-xl font-bold mb-4">
        Edit Doctor
      </h3>

      <div className="space-y-3">
        <input
          type="text"
          value={doctorForm.name}
          onChange={(e) =>
            setDoctorForm({
              ...doctorForm,
              name: e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
          placeholder="Doctor Name"
        />

        <input
          type="text"
          value={
            doctorForm.specialization
          }
          onChange={(e) =>
            setDoctorForm({
              ...doctorForm,
              specialization:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
          placeholder="Specialization"
        />

        <select
          value={doctorForm.status}
          onChange={(e) =>
            setDoctorForm({
              ...doctorForm,
              status:
                e.target.value,
            })
          }
          className="w-full border p-3 rounded-lg"
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
            onClick={handleUpdate}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Update Doctor
          </button>

          <button
            onClick={() =>
              setEditingId(null)
            }
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}

  <div className="bg-white rounded-xl shadow overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-4">
            Name
          </th>
          <th>
            Specialization
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <tr
              key={doctor._id}
              className="border-t"
            >
              <td className="p-4">
                {doctor.name}
              </td>

              <td>
                {
                  doctor.specialization
                }
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    doctor.status ===
                    "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {doctor.status}
                </span>
              </td>

<td className="space-x-2">

  <button
    onClick={() =>
      handleView(doctor)
    }
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    View
  </button>

  <button
    onClick={() =>
      handleEdit(doctor)
    }
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(
        doctor._id
      )
    }
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>

</td>
             
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              className="text-center py-6"
            >
              No Doctors Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <DoctorViewModal
  open={viewOpen}
  onClose={() =>
    setViewOpen(false)
  }
  doctor={selectedDoctor}
/>
</div>


);
};

export default Doctors;
