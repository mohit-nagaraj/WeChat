/* eslint-disable */
import { useEffect, useState, useContext, useCallback, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/interceptor";
import { getDay, spaceToPlus } from "../utils/convertor";
import axios from "axios";
import { Send } from "lucide-react";
import { io } from "socket.io-client";
import Message from "../components/Message";

const Chat = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [chatContext, setChatContext] = useState({});
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState("");
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messageRef = useRef();

  const sendMessage = () => {
    const message = messageRef.current.value;
    if (message) {
      axiosInstance
        .post(`/messages`, {
          text: message,
          senderId: user.id,
          chatId: chatContext._id,
        })
        .then((res) => {
          console.log(res.data);
          messageRef.current.value = "";
          setMessages([...messages, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchChatContext = async (id) => {
    setIsLoading(true);
    axios.get(`https://picsum.photos/200`).then((res) => {
      setImage(res.request.responseURL);
    });
    axios
      .get("https://api.api-ninjas.com/v1/facts", {
        headers: {
          "X-Api-Key": `${import.meta.env.VITE_API_NINJAS_KEY}`,
        },
      })
      .then((res) => {
        setFact(res.data[0].fact);
      });

    axiosInstance
      .get(`/chats/find/${id}/${user.id}`)
      .then((res) => {
        setChatContext(res.data);
        axiosInstance.get(`/messages/${res.data._id}`).then((res) => {
          console.log(res.data);
          setMessages(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchUserChat = useCallback(() => {
    axiosInstance
      .get(`/users/`)
      .then((res) => {
        const filteredUsers = res.data.filter((u) => u._id !== user.id);
        setUsers(filteredUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id]);

  useEffect(() => {
    if (!user?.token) {
      navigate("/login");
    } else {
      fetchUserChat();
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, [user, navigate, fetchUserChat]);

  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", user.id);
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="h-screen shadow-lg rounded-lg">
          <div className="pt-16 h-full flex flex-row justify-between bg-white dark:bg-gray-800">
            <div className="flex flex-col w-2/5 border-r-2 dark:border-gray-700 overflow-y-auto">
              <div className="border-b-2 py-4 px-2 dark:border-gray-700">
                <input
                  type="text"
                  placeholder="Search chatting"
                  className="py-2 px-2 border-2 border-gray-200 dark:border-gray-600 rounded-2xl w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />
              </div>

              {users.map((chat) => {
                return (
                  <div
                    key={chat._id}
                    className={`relative flex flex-row py-4 px-2 items-center border-b-2 dark:border-gray-700 ${
                      selectedUser._id === chat._id
                        ? "border-l-4 border-blue-400 dark:border-blue-400"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedUser(chat);
                      fetchChatContext(chat._id);
                    }}
                  >
                    {/* { && (
                      <div className="online absolute top-4 right-4 p-1 rounded-full bg-green-400"></div>
                    )} */}
                    <div className="w-1/4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${spaceToPlus(
                          chat.name
                        )}&background=random`}
                        className={`object-cover h-12 w-12 rounded-full ${onlineUsers.find((u) => u.userId === chat._id)?'online':''}`}
                        alt=""
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                        {chat.name}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {chat.email}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full px-5 flex flex-col justify-between">
              <div className="flex flex-col mt-5 overflow-auto pr-2">
                {messages.map((m, i) => {
                  const prev = messages[i - 1] ?? { createdAt: new Date() };
                  let display = false;
                  if (
                    new Date(m.createdAt).getDate() !==
                    new Date(prev.createdAt).getDate()
                  ) {
                    display = true;
                  }
                  return (
                    <>
                      {display && (
                        <div
                          key={i}
                          className="text-center text-gray-600 dark:text-gray-300"
                          style={{ fontSize: "12px", lineHeight: "1.5rem" }}
                        >
                          <span className="p-1 rounded-md bg-slate-100 dark:bg-slate-500">
                            {getDay(m.createdAt)}
                          </span>
                        </div>
                      )}
                      <Message m={m} currId={user.id} key={i} />
                    </>
                  );
                })}
              </div>
              <div className="py-5 flex gap-4 items-center">
                <input
                  className="w-full bg-gray-300 dark:bg-gray-700 py-5 px-3 rounded-xl text-gray-900 dark:text-gray-200"
                  type="text"
                  placeholder="Type your message here..."
                  ref={messageRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Send
                  onClick={sendMessage}
                  className="w-8 h-8 text-gray-900 dark:text-gray-200"
                />
              </div>
            </div>
            <div className="w-2/5 border-l-2 dark:border-gray-700 px-5">
              {selectedUser?.createdAt && (
                <div className="flex flex-col">
                  <div className="font-semibold text-xl py-4 dark:text-gray-200">
                    {selectedUser.name}
                  </div>
                  <img
                    src={image}
                    className="object-cover rounded-xl h-64"
                    alt=""
                  />
                  <div className="font-semibold py-4 dark:text-gray-200">
                    Created at:
                    <br></br>
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </div>
                  <div className="font-light dark:text-gray-400">{fact}</div>
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
