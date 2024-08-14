import React, { useEffect, useState } from 'react';
import send_icon from '../../assets/images/send.png'
import robot_icon from '../../assets/images/robot.png'
import {GoogleGenerativeAI}  from '@google/generative-ai'
import TypeIt from "typeit-react";
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../Toast/Toast';

// Gemini Config
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


function Home() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  const [chatHistory, setChatHistory] = useState([]);
  const [chatList, setChatList] = useState([])
  const [chatSelected, setChatSelected] = useState(0);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const newMessage = { question: input, answer: text };
      setChatHistory([...chatHistory, newMessage]);

      setInput('')
      console.log(text);

    } catch (error) {
      console.log(error)
    } 
  };

  const login  = async () => {
    setLoading(true);

      if (username.trim() === '') {
        setLoading(false);
        errorToast('Username cannot be empty');
        return;
      }

      try {

        const response = await api.get(`/smart-users/username/${username}`);
        setUser(response.data); 

        const chatResponse = await api.get(`/chat-history/user/${response.data.id}`);

        setChatList(chatResponse.data)

        console.log(response.data)
        console.log("Chat selected :", chatSelected)
        console.log("Chat response : ",chatResponse.data)

        successToast('Succesfully Logged in')

      } catch (error) {
        errorToast("User not found")
      } finally {
        setLoading(false);
      }

  }

  const handleChatClicked = async (num) => {
      setChatSelected(num)
      const chatDetail = await api.get(`/chat-history/${num}`)

      console.log(chatDetail)

      setChatHistory(chatDetail.data.questions_answers);
  }


  return (
    <div className='flex w-full  bg-[hsl(224,30%,4%)] text-white h-[100vh] py-8 px-8'>
      <div className="w-full px-8 py-4 mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xxl:max-w-xxl flex flex-row font-poppins gap-4 bg-[hsl(224,32%,14%)] rounded-xl">

        <div className={` w-1/3  flex flex-col px-6 py-6 text-[14px] text-gray-500 font-medium bg-[#10141e] rounded-xl ${user == ''? "justify-between" : ""}`}>
          <h2 className=' text-[#0084FF] text-[28px] font-semibold mb-6'>SmartChat</h2>


          {user == '' ? 
          <div className=' flex flex-col'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              className=' px-3 py-3 rounded-xl mb-4 text-white bg-[#20232A]'
            />

            <button className=' bg-[#33A5FF] px-3 py-3 rounded-xl text-white hover:bg-[hsl(206,100%,48%)] ease-in-out duration-200' onClick={login}>
              Login
            </button>
          </div>

          :           
          <>
            <p className='mb-2'>Chat List</p>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
              <div className="flex flex-col">
                {chatList.map((item, index) => (
                  <div key={index} className={`p-3 rounded-md cursor-pointer ${item.chatid === chatSelected ? "bg-[#20232A] text-white" : "bg-none"}`} onClick={() => handleChatClicked(item.chatid)}>
                    {item.questions_answers.length > 0 ? item.questions_answers[0].question : 'No questions available'}
                  </div>
                ))}
              </div>
            </div>
          </>
          }


        </div>

        <div className=' w-2/3 flex flex-col pl-5 py-6 bg-[#10141e] rounded-xl h-full justify-between'>

          <div className=' flex flex-col h-[90%] overflow-y-auto pr-5'>

            {chatHistory.map((message, index) => (
              <div className=' flex w-full h-fit items-end flex-col text-[15px] mb-4'>

              <div className=' max-w-[45%] w-fit text-justify pl-6 pr-7 py-[14px] rounded-xl bg-[#20232a] h-fit mb-6 ease-linear duration-500'>
                {message.question}
              </div>

              <div className=' flex flex-row items-start w-full'>
                <div className=' w-[10%]'>
                  <img src={robot_icon} alt="" className=' w-[60px] h-auto' />
                </div>
                <TypeIt
                  key={message.answer}
                  className = {'w-[90%] text-justify pr-6 pl-2 font-roboto mt-2 mb-4'}
                  options={{
                      strings: [message.answer],
                      speed: 0.1,
                      waitUntilVisible: true,
                      cursor: false,
                  }
                }
                />
              </div>


              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="flex border-[1px] border-gray-500 rounded-xl overflow-hidden mr-5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with SmartChat"
              className="flex-1 py-3 px-3 border-none outline-none bg-[#10141e]"
            />
            <button
              type="submit"
              className="bg-[#33A5FF] text-white px-4 py-2 font-semibold hover:bg-[hsl(206,100%,48%)] hover:ease-linear duration-200"
            >
              <img src={send_icon} alt="Send" className='w-[28px] h-auto' />
            </button>
          </form>

        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}
export default Home;
