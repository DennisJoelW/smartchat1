import React, { useState } from 'react';
import send_icon from '../../assets/images/send.png'
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold}  from '@google/generative-ai'
import TypeIt from "typeit-react";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


function Home() {
  const [input, setInput] = useState('');
  const [sentMsg, setSentMsg] = useState('')
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setSentMsg(input)
      setAnswer(text)
      console.log(text);

    } catch (error) {
      console.log(error)
    } finally{
      setInput('')
    }
  };

  return (
    <div className='flex w-full  bg-[#19181d] text-white h-[100vh] py-8 px-8'>
      <div className="w-full px-8 py-4 mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xxl:max-w-xxl flex flex-row font-poppins gap-4 bg-[hsl(224,32%,14%)] rounded-xl">

        <div className=' w-1/3  flex flex-col px-6 py-6 text-[14px] text-gray-500 font-medium bg-[#10141e] rounded-xl'>
          <h2 className=' text-[#0084FF] text-[28px] font-semibold mb-6'>SmartChat</h2>

          <p className=' mb-2'>Chat List</p>

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>

            <div className="flex flex-col gap-3">

              <div className="p-3 rounded-md bg-[#20232a] cursor-pointer">Pertanyaan Pertama</div>
              <div className="p-3 rounded-md cursor-pointer">Pertanyaan Kedua</div>
              <div className="p-3 rounded-md cursor-pointer">Ketiga dan terakhir</div>

            </div>
            
          </div>
        </div>

        <div className=' w-2/3  flex flex-col px-5 py-6 bg-[#10141e] rounded-xl h-full justify-between'>

          <div className=' flex w-full h-[90%] items-end flex-col text-[15px]'>

              <div className=' max-w-[45%] w-fit text-justify pl-6 pr-7 py-[14px] rounded-xl bg-[#20232a] h-fit mb-6 ease-linear duration-500'>
                {sentMsg}
              </div>

              <TypeIt
                key={answer}
                className = {'w-full text-justify pr-6 font-roboto'}
                options={{
                    strings: [answer],
                    speed: 10,
                    waitUntilVisible: true,
                    cursor: false
                }}
            />

          </div>

          

          <div className="flex border-[1px] border-gray-500 rounded-xl overflow-hidden ">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan teks"
              className="flex-1 py-3 px-3 border-none outline-none bg-[#10141e]"
            />
            <button className="bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600" onClick={handleSubmit}>
              <img src={send_icon} alt="" className=' w-[25px] h-auto' />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
export default Home;
