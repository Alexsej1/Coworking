import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import Map from "./_root/pages/Map";
// import Quiz from "./_root/pages/Quiz";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Booking from "./_root/pages/Booking";
import Blog from "./_root/pages/Blog";

const App = () => {
  return (
    <section className="">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          {/* <Route path="/quiz" element={<Quiz />} /> */}
          <Route path="/booking" element={<Booking />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
      </Routes>
    </section>
  );
};

export default App;
