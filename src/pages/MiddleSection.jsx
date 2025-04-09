const MiddleSection = () => {
    return (
      <div className="w-3/5 p-6">
        <h2 className="text-lg font-bold mb-4">Question 1</h2>
        <div className="mb-4">
          <p>What is 2 + 2?</p>
        </div>
        <div className="flex flex-col gap-2">
          <button className="border p-2 rounded">Option A</button>
          <button className="border p-2 rounded">Option B</button>
          <button className="border p-2 rounded">Option C</button>
          <button className="border p-2 rounded">Option D</button>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Mark for Review</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
        </div>
      </div>
    );
  };
  export default MiddleSection;