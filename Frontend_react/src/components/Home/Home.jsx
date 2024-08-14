import React, { useEffect, useState } from 'react';
import {decode} from 'base-64'
import send_icon from '../../assets/images/send.png'
import robot_icon from '../../assets/images/robot.png'
import delete_icon from '../../assets/images/delete.png'
import menu_icon from '../../assets/images/menus.png'
import {GoogleGenerativeAI}  from '@google/generative-ai'
import TypeIt from "typeit-react";
import api from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToast, successToast } from '../Toast/Toast';


// Gemini Config
const apiKey = decode('QUl6YVN5QkkyTnRlOFQyZE4wV1ZNdmxsVW4tQi1sYjBqYkRrWVRZ');
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


function Home() {
  // State variables
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatList, setChatList] = useState([])
  const [chatSelected, setChatSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false)
  const [user, setUser] = useState('');

  // Handle form submission for sending a new message
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const newMessage = { question: input, answer: text };
      setChatHistory([...chatHistory, newMessage]);

      setInput('')

      if(user !== '' && chatSelected != 0){
          await api.put(`/chat-history/${chatSelected}`,{
            question: input,
            answer: text
          });
      }

    } catch (error) {
      console.log(error)
    } 
  };

  // Handle user login
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

        // Fetch chat list for the logged-in user
        const chatList = await api.get(`/chat-history/user/${response.data.id}`);
        setChatList(chatList.data)


        setUsername('')
        setChatHistory([])
        successToast('Succesfully Logged in')
      } catch (error) {
        errorToast("User not found")
      } finally {
        setLoading(false);
        
      }

  }

  // Handle selection of a chat from the list
  const handleChatClicked = async (num) => {
    try {
      setChatSelected(num)
      const chatDetail = await api.get(`/chat-history/${num}`)
      setChatHistory(chatDetail.data.questions_answers);
    } catch (error) {
      console.log(error)
    }
  }

  // Delete a chat from the list
  const deleteChat = async (num) => {
    try {
      await api.delete(`/chat-history/${num}`)

      setChatList(prevChatList => prevChatList.filter(chat => chat.chatid !== num));

      if (chatSelected === num) {
        setChatHistory([]);
        setChatSelected(0); 
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Create a new chat
  const newChat = async () => {
    try {
      const now = new Date();
      const response = await api.post(`/chat-history`, {
        user_id: user.id,
        date: now,
        questions_answers: [
          {
              question: null,
              answer: null
          }
      ]
      });

      setChatList(prevChatList => [...prevChatList, response.data]);
      setChatSelected(response.chatid)
    } catch (error) {
      console.log(error)
    }
  }

  // Fetch chat list when user changes
  useEffect(() => {
    const fetchChatList = async () => {
      if (user) {
        try {
          const response = await api.get(`/chat-history/user/${user.id}`);
          setChatList(response.data);
        } catch (error) {
          console.log(error)
        }
      }
    };
  
    fetchChatList();
  },chatList)


  return (
    <div className='flex w-full bg-[hsl(224,30%,4%)] text-white h-[100vh] py-8 md:px-8 px-2'>
      <div className="w-full md:px-8 px-2 py-4 mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xxl:max-w-xxl flex flex-row font-poppins gap-4 bg-[hsl(224,32%,14%)] rounded-xl">

        <div className={`w-1/3 md:flex hidden flex-col px-6 py-6 text-[14px] text-gray-500 font-medium bg-[#10141e] rounded-xl ${user == ''? "justify-between" : ""}`}>

          <div className=' flex md:flex-row flex-col w-full md:items-center mb-6 justify-between'>
            <h2 className=' text-[#0084FF] md:text-[28px] text-[16px] font-semibold md:max-w-[45%] w-full md:mb-0 mb-2'>SmartChat</h2>
            {user ? <button className=' w-full md:max-w-[45%] py-2 bg-[#33A5FF] md:text-[15px] text-[12px] hover:bg-[#008bf5] duration-200 ease-linear text-white rounded-md' onClick={newChat}>New Chat</button> : ""}
          </div>


          {user == '' ? 
          <div className=' flex flex-col'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username (username : user)'
              className=' px-3 py-3 rounded-xl mb-4 text-white bg-[#20232A]'
            />

            <button className=' bg-[#33A5FF] px-3 py-3 rounded-xl text-white hover:bg-[#008bf5] ease-in-out duration-200' onClick={login}>
              Login
            </button>
          </div>

          :           
          <div className=' flex flex-col justify-between h-full'>
            <div>
              <p className='mb-2'>Chat List</p>

              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
                <div className="flex flex-col">
                  {chatList.map((item, index) => (
                    <div key={index} className={`p-3 rounded-md cursor-pointer hover:bg-[#20232A] ease-linear duration-200 mb-[5px] flex flex-row items-center justify-between
                    ${item.chatid === chatSelected ? "bg-[#20232A] text-white" : "bg-none"}`} onClick={() => handleChatClicked(item.chatid)}>
                      {item.questions_answers[0].question != null ? item.questions_answers[0].question : 'Waiting for question...'}

                      <div> 
                      {item.chatid === chatSelected ? (
                          <img src={delete_icon} className=' hover:bg-[hsl(0,72%,40%)] p-2 rounded-lg' width={31} alt="Delete Icon" onClick={() => deleteChat(item.chatid)} />
                      ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className=' bg-[#33A5FF] px-3 py-3 rounded-xl text-white hover:bg-[hsl(206,100%,48%)] ease-in-out duration-200' onClick={() => {setUser(''); setChatSelected(0); setChatHistory([])}}>
              Logout
            </button>
          </div>
          }


        </div>

        <div className=' md:w-2/3 w-full flex flex-col md:pl-5 pl-2 md:py-6 py-2 bg-[#10141e] rounded-xl h-full justify-between'>

          <div className=' md:hidden flex w-full'>
            <img src={menu_icon} width={42} className=' cursor-pointer' onClick={() => setMenu(!menu)}/>
          </div>


          <div className=' flex flex-col md:h-[90%] h-[88%] overflow-y-auto md:pr-5 pr-2'>

            {chatHistory.map((message, index) => (
              <div className=' flex w-full h-fit items-end flex-col text-[15px] mb-4'>

              <div className=' md:max-w-[45%] max-w-[85%] w-fit text-justify md:pl-6 md:pr-7 pl-3 pr-3 py-[14px] rounded-xl md:text-[16px] text-[14px] bg-[#20232a] h-fit mb-4 ease-linear duration-500'>
                {message.question}
              </div>

              <div className=' flex flex-row items-start w-full'>
                <div className=' w-[10%]'>
                  <img src={robot_icon} alt="" className=' w-[60px] h-auto' />
                </div>
                <TypeIt
                  key={message.answer}
                  className = {'w-[90%] text-justify md:pr-6 pr-3 pl-2 font-roboto md:mt-4 md:mb-8 mb-6 md:text-[16px] text-[14px]'}
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
          
          <form onSubmit={handleSubmit} className="flex border-[1px] border-gray-500 rounded-xl overflow-hidden md:mr-5 mr-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with SmartChat"
              className="flex-1 md:py-3 px-3 py-2 border-none outline-none max-w-[85%] text-[14px]  bg-[#10141e]"
            />
            <button
              type="submit"
              className="bg-[#33A5FF] text-white px-4 py-2 font-semibold max-w-[15%] w-full hover:bg-[hsl(206,100%,48%)] hover:ease-linear duration-200 flex items-center justify-center"
            >
              <img src={send_icon} alt="Send" className='md:w-[28px] w-[24px] h-auto' />
            </button>
          </form>

        </div>

        <div className={menu ? " z-20 fixed left-0 top-0 w-[80%] md:hidden h-full bg-[#07090D] ease-linear duration-300 px-[15px] pt-[10px]" : 'fixed left-[-100%]'}>
        
          <div className=' w-full flex justify-end pt-4 pr-2'>
            <img src={delete_icon} alt="" className='cursor-pointer ' width={22} onClick={() => setMenu(!menu)}/>
          </div>

          {user == '' ? 
          <div className=' flex flex-col mt-20'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username (username : user)'
              className=' px-3 py-3 rounded-xl mb-4 mt-4 text-white text-[14px] bg-[#20232A]'
            />

            <button className=' bg-[#33A5FF] px-3 py-3 rounded-xl text-white hover:bg-[#008bf5] ease-in-out duration-200' onClick={login}>
              Login
            </button>
          </div>

          :           
          <div className=' flex flex-col justify-between h-full'>
            <div className=' max-h-[90%] h-full'>
              <p className='mb-4 mt-4'>Chat List</p>

              <div className="overflow-y-auto">
                <div className="flex flex-col">
                  {chatList.map((item, index) => (
                    <div key={index} className={`p-1 rounded-md cursor-pointer hover:bg-[#20232A] ease-linear duration-200 mb-[12px] flex flex-row items-center justify-between
                    ${item.chatid === chatSelected ? "bg-[#20232A] text-white" : "bg-none"}`} onClick={() => handleChatClicked(item.chatid)}>
                      {item.questions_answers[0].question != null ? item.questions_answers[0].question : 'Waiting for question...'}

                      <div> 
                      {item.chatid === chatSelected ? (
                          <img src={delete_icon} className=' hover:bg-[hsl(0,72%,40%)] p-2 rounded-lg' width={31} alt="Delete Icon" onClick={() => deleteChat(item.chatid)} />
                      ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className=' h-[15%] w-full mb-4'>
              <button className=' bg-[#33A5FF] w-full px-3 py-3 rounded-xl text-white hover:bg-[hsl(206,100%,48%)] ease-in-out duration-200' onClick={() => {setUser(''); setChatSelected(0); setChatHistory([])}}>
                Logout
              </button>
            </div>


          </div>
          }

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
