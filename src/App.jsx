import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import InstructionPage from "./pages/instructionPage";
import TestPage from "./pages/testPage";
import ResultPage from "./pages/ResultPage";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
export default App