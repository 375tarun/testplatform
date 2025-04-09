// layoutContainer.jsx
import Header from "./header";
import LeftBar from "./leftBar";
import MiddleSection from "../pages/MiddleSection";
import RightBar from "./rightBar";

const LayoutContainer = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <LeftBar />
        <MiddleSection />
        <RightBar />
      </div>
    </div>
  );
};
export default LayoutContainer;
