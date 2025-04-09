import { useNavigate } from "react-router-dom";

const RightBar = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 border-l w-1/4 flex flex-col items-center">
      <h2 className="text-lg font-bold">Test Summary</h2>
      <p>Questions: 10</p>
      <p>Remaining: 5</p>
      <p>Marked for Review: 2</p>
      <p>Skipped: 1</p>
      <button className="bg-red-500 px-4 py-2 text-white rounded mt-4" onClick={() => navigate('/result')}>
        Submit Test
      </button>
    </div>
  );
};

export default RightBar;
