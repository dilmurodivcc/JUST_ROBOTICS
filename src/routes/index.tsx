import { Routes, Route } from "react-router-dom";
import SignupForLesson from "../pages/SignupForLesson";
import NotFound from "../pages/NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForLesson />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
