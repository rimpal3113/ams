const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>
        </div>

        {/* <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
          {icon}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardCard;