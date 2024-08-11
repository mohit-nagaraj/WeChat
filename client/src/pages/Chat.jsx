/* eslint-disable */
import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/interceptor";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserChat = useCallback(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/users/`)
      .then((res) => {
        setUsers(res.data);
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
        <div class="h-screen shadow-lg rounded-lg">
          <div class="pt-16 h-full flex flex-row justify-between bg-white">
            <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div class="border-b-2 py-4 px-2">
                <input
                  type="text"
                  placeholder="search chatting"
                  class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>

              {users.map((chat, index) => {
                return (
                  <div key={index} class="flex flex-row py-4 px-2 items-center border-b-2">
                    <div class="w-1/4">
                      <img
                        src="https://picsum.photos/200"
                        class="object-cover h-12 w-12 rounded-full"
                        alt=""
                      />
                    </div>
                    <div class="w-full">
                      <div class="text-lg font-semibold">{chat.name}</div>
                      <span class="text-gray-500">{chat.email}</span>
                    </div>
                  </div>
                );
              })}
              {/* <div class="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
                <div class="w-1/4">
                  <img
                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                    class="object-cover h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div class="w-full">
                  <div class="text-lg font-semibold">MERN Stack</div>
                  <span class="text-gray-500">Lusi : Thanks Everyone</span>
                </div>
              </div> */}
            </div>

            <div class="w-full px-5 flex flex-col justify-between">
              <div class="flex flex-col mt-5">
                <div class="flex justify-end mb-4">
                  <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Welcome to group everyone !
                  </div>
                  
                </div>
                <div class="flex justify-start mb-4">
                  
                  <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat at praesentium, aut ullam delectus odio error sit
                    rem. Architecto nulla doloribus laborum illo rem enim dolor
                    odio saepe, consequatur quas?
                  </div>
                </div>
                <div class="flex justify-end mb-4">
                  <div>
                    <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Magnam, repudiandae.
                    </div>

                    <div class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis, reiciendis!
                    </div>
                  </div>
                 
                </div>
                <div class="flex justify-start mb-4">
                  
                  <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
              </div>
              <div class="py-5">
                <input
                  class="w-full bg-gray-300 py-5 px-3 rounded-xl"
                  type="text"
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            <div class="w-2/5 border-l-2 px-5">
              <div class="flex flex-col">
                <div class="font-semibold text-xl py-4">Mern Stack Group</div>
                <img
                  src="https://picsum.photos/200"
                  class="object-cover rounded-xl h-64"
                  alt=""
                />
                <div class="font-semibold py-4">Created 22 Sep 2021</div>
                <div class="font-light">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt, perspiciatis!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
