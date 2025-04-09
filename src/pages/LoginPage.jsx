import { useNavigate } from "react-router-dom";

// loginPage.jsx
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <button className="bg-blue-500 px-4 py-2 text-white rounded mt-4" onClick={() => navigate('/instructions')}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;