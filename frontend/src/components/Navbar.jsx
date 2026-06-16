import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Navbar = ({ setOpen }) => {
const navigate = useNavigate();

const admin = JSON.parse(
localStorage.getItem("admin")
);

const firstLetter =
admin?.email?.charAt(0)?.toUpperCase() || "A";

const logout = async () => {
try {
await API.post("/auth/logout");


  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  navigate("/");
} catch (error) {
  console.log(error);

  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  navigate("/");
}


};

return ( <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 md:px-6 h-16 flex items-center justify-between">


  <div className="flex items-center gap-4">
    <button
      onClick={() => setOpen(true)}
      className="lg:hidden text-2xl text-slate-700"
    >
      ☰
    </button>

    <div>
      <h1 className="text-lg md:text-xl font-bold text-slate-800">
        Appointment Management
      </h1>

      <p className="text-xs text-slate-500 hidden sm:block">
        Admin Dashboard
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4">
    <div className="hidden md:flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
        {firstLetter}
      </div>

      <div>
        <p className="font-medium text-slate-800">
          {admin?.email || "Admin"}
        </p>

        <p className="text-xs text-slate-500">
          Administrator
        </p>
      </div>
    </div>

    <button
      onClick={logout}
      className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded-lg text-sm font-medium shadow"
    >
      Logout
    </button>
  </div>
</header>


);
};

export default Navbar;
