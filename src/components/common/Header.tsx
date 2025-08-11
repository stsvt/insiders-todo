import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">To-Do App</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;
