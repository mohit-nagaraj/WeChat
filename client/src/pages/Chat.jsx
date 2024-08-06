import Navbar from "../components/Navbar";

const Chat = () => {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          Chat
        </div>
      </section>
    </>
  );
};

export default Chat;
