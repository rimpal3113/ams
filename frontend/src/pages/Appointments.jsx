import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import ConfirmModal from "../components/ConfirmModal";
import AppointmentViewModal from "../components/AppointmentViewModal";
import AppointmentEditModal from "../components/AppointmentEditModal";

const Appointments = () => {
  const [appointments, setAppointments] =
    useState([]);

  const [search, setSearch] =
    useState("");

    const [doctorFilter, setDoctorFilter] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("");

const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedAppointment,
    setSelectedAppointment] =
    useState(null);

  const fetchAppointments =
    async () => {
      try {
        const { data } =
          await API.get(
            "/appointments"
          );

        setAppointments(
          data.appointments
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleView = (
    appointment
  ) => {
    setSelectedAppointment(
      appointment
    );

    setViewOpen(true);
  };

  const handleEdit = (
    appointment
  ) => {
    setSelectedAppointment(
      appointment
    );

    setEditOpen(true);
  };

  const handleDelete = (
    appointment
  ) => {
    setDeleteId(
      appointment._id
    );

    setDeleteOpen(true);
  };

  const confirmDelete =
    async () => {
      try {
        await API.delete(
          `/appointments/${deleteId}`
        );

        setDeleteOpen(false);

        fetchAppointments();

        alert(
          "Appointment Deleted Successfully"
        );
      } catch (error) {
        console.log(error);
      }
    };

  const filteredAppointments =
  appointments.filter(
    (appointment) => {

      const matchesSearch =
        (
          appointment.firstName +
          " " +
          appointment.lastName +
          " " +
          appointment.mobile
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesDoctor =
        !doctorFilter ||
        appointment.doctor?.name ===
          doctorFilter;

      const matchesStatus =
        !statusFilter ||
        appointment.status ===
          statusFilter;

      const appointmentDate =
        new Date(
          appointment.appointmentDate
        );

      const matchesFromDate =
        !fromDate ||
        appointmentDate >=
          new Date(fromDate);

      const matchesToDate =
        !toDate ||
        appointmentDate <=
          new Date(toDate);

      return (
        matchesSearch &&
        matchesDoctor &&
        matchesStatus &&
        matchesFromDate &&
        matchesToDate
      );
    }
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h2 className="text-3xl font-bold">
          Appointments
        </h2>

<Link to="/add-appointment">
  <button className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
    New Appointment
  </button>
</Link>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-5">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

    <input
      placeholder="Search Name or Mobile..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
     className="border p-3 rounded-lg w-full"
    />

    <select
      value={doctorFilter}
      onChange={(e) =>
        setDoctorFilter(e.target.value)
      }
      className="border p-3 rounded-lg w-full"
    >
      <option value="">
        All Doctors
      </option>

      {[...new Set(
        appointments.map(
          (a) => a.doctor?.name
        )
      )].map((doctor) => (
        <option
          key={doctor}
          value={doctor}
        >
          {doctor}
        </option>
      ))}
    </select>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(e.target.value)
      }
      className="border p-3 rounded-lg"
    >
      <option value="">
        All Status
      </option>

      <option value="Pending">
        Pending
      </option>

      <option value="Confirmed">
        Confirmed
      </option>

      <option value="Completed">
        Completed
      </option>

      <option value="Cancelled">
        Cancelled
      </option>
    </select>

<div>
  <label className="block text-xs text-gray-500 mb-1">
    From Date
  </label>

  <input
    type="date"
    value={fromDate}
    onChange={(e) =>
      setFromDate(e.target.value)
    }
    className="border p-3 rounded-lg w-full"
  />
</div>
  <div>
  <label className="block text-xs text-gray-500 mb-1">
    To Date
  </label>

  <input
    type="date"
    value={toDate}
    onChange={(e) =>
      setToDate(e.target.value)
    }
    className="border p-3 rounded-lg w-full"
  />
</div>
  </div>
</div>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4">
                Patient
              </th>

              <th>Doctor</th>

              <th>Service</th>

              <th>Date</th>

              <th>Time</th>

              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length >
            0 ? (
              filteredAppointments.map(
                (
                  appointment
                ) => (
                  <tr
                    key={
                      appointment._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {
                        appointment.firstName
                      }{" "}
                      {
                        appointment.lastName
                      }
                    </td>

                    <td>
                      {
                        appointment
                          .doctor
                          ?.name
                      }
                    </td>

                    <td>
                      {
                        appointment.serviceType
                      }
                    </td>

                    <td>
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {
                        appointment.appointmentTime
                      }
                    </td>

                    <td>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {
                          appointment.status
                        }
                      </span>
                    </td>

                    <td className="space-x-2">
                      <button
                        onClick={() =>
                          handleView(
                            appointment
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleEdit(
                            appointment
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            appointment
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No Appointments
                  Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={confirmDelete}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment?"
      />

      <AppointmentViewModal
        open={viewOpen}
        onClose={() =>
          setViewOpen(false)
        }
        appointment={
          selectedAppointment
        }
      />

      <AppointmentEditModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        appointment={
          selectedAppointment
        }
        fetchAppointments={
          fetchAppointments
        }
      />
    </div>
  );
};

export default Appointments;