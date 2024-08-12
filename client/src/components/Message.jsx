import { getHour } from "../utils/convertor";

/* eslint-disable react/prop-types */
const Message = ({ m, currId }) => {
return (
    <div className={`flex justify-${currId==m.senderId?'end':'start'} mb-4`}>
        <div className={`relative mr-2 py-2 px-3 ${currId==m.senderId?'bg-blue-400 dark:bg-blue-600 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl':'bg-gray-400 dark:bg-gray-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl'}  text-white`}>
            {m.text}
        <div className={`absolute text-xs ${currId==m.senderId?'right-1 text-blue-400':'left-1 text-slate-400'}`} style={{ bottom: "-15px" }}>
            {getHour(m.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Message;
