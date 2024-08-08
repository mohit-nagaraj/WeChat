import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/interceptor";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userChat, setUserChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserChat = useCallback(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/chats/${user.id}`)
      .then((res) => {
        setUserChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.id]);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    } else {
      fetchUserChat();
    }
  }, [user, navigate, fetchUserChat]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Chat
              </h1>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {userChat?.map((chat) => (
                    <div key={chat._id} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{chat.message}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{chat.createdAt}</p>
                      </div>
                      <div>
                        <button className="text-sm text-white bg-red-500 px-2 py-1 rounded-lg">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
