import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");
  const fetchDashboard = async () => {
  try {
    const { data } = await API.get(
      `/dashboard?fromDate=${fromDate}&toDate=${toDate}`
    );

    setStats(data);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
  fetchDashboard();
}, [fromDate, toDate]);


  return (


    
    <div>


      <div className="bg-white p-4 rounded-xl shadow mb-6">
  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="block text-sm text-gray-500 mb-1">
        From Date
      </label>

      <input
        type="date"
        value={fromDate}
        onChange={(e) =>
          setFromDate(
            e.target.value
          )
        }
        className="border p-3 rounded-lg w-full"
      />
    </div>

    <div>
      <label className="block text-sm text-gray-500 mb-1">
        To Date
      </label>

      <input
        type="date"
        value={toDate}
        onChange={(e) =>
          setToDate(
            e.target.value
          )
        }
        className="border p-3 rounded-lg w-full"
      />
    </div>

  </div>
</div>


      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

        <DashboardCard
          title="Total Doctors"
          value={stats.totalDoctors}
        />

        <DashboardCard
          title="Appointments"
          value={stats.totalAppointments}
        />

        <DashboardCard
          title="Pending"
          value={stats.pending}
        />

        <DashboardCard
          title="Completed"
          value={stats.completed}
        />

        <DashboardCard
          title="Cancelled"
          value={stats.cancelled}
        />

      </div>
    </div>
  );
};

export default Dashboard;