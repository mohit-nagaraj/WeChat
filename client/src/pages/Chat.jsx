import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Chat = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  });

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Chat
          <button onClick={notify}>Notify!</button>
        </div>
      </section>
    </>
  );
};

export default Chat;
