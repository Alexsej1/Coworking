import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="relative min-h-screen w-full">
          <img
            src="/assets/images/bg.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 bg-black/95 z-10" />

          <section className="relative z-20 flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
