const LeftBar = () => {
  return (
    <div className="w-1/5 bg-gray-200 p-4 flex flex-wrap gap-2">
      {[...Array(10).keys()].map((num) => (
        <button key={num} className="w-10 h-10 bg-white border rounded-full">{num + 1}</button>
      ))}
    </div>
  );
};
export default LeftBar;