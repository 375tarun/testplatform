// instructionPage.jsx
import { useNavigate } from "react-router-dom";

const InstructionPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Instructions</h1>
      <p className="mb-4">Please read the instructions carefully before starting the test.</p>
      <label className="flex items-center gap-2">
        <input type="checkbox" /> I agree to the instructions
      </label>
      <button className="bg-green-500 px-4 py-2 text-white rounded mt-4" onClick={() => navigate('/test')}>
        Start Test
      </button>
    </div>
  );
};

export default InstructionPage;