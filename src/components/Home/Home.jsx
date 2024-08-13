import React, { useState } from 'react';
import { OpenAI } from 'openai';

const apiKey = process.env.API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

function Home() {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await openai.chat.completions.create({
        model: 'davinci-002',
        messages: [{ role: 'system', content: input }],
        max_tokens: 100,
      });

      console.log(response.choices[0])

      setAnswer(response.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex w-full  bg-[#19181d] text-white h-[100vh] py-8 px-8'>
      <div className="w-full px-8 py-4 mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl xxl:max-w-xxl flex flex-row font-poppins gap-4 bg-[hsl(224,32%,14%)] rounded-xl">

        <div className=' w-1/3  flex flex-col px-6 py-4 text-[14px] text-gray-500 font-medium bg-[#10141e] rounded-xl'>
          <h2 className=' text-[#0084FF] text-[28px] font-semibold mb-4'>SmartChat</h2>
          <p>Chat List</p>
          Scrollable chat list here
        </div>

        <div className=' w-2/3  flex flex-col px-4 py-4 bg-[#10141e] rounded-xl'>
          <h2>Messages n Answer</h2>
        </div>

      </div>
    </div>
  );
}

export default Home;
