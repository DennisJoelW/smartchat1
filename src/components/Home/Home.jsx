import React, { useState } from 'react';
import { OpenAI } from 'openai';

const apiKey = '';

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

          <p className=' mb-2'>Chat List</p>

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 6rem)' }}>

            <div className="flex flex-col gap-3">

              <div className="p-3 rounded-md bg-[#20232a] cursor-pointer">Pertanyaan Pertama</div>
              <div className="p-3 rounded-md cursor-pointer">Pertanyaan Kedua</div>
              <div className="p-3 rounded-md cursor-pointer">Ketiga dan terakhir</div>

            </div>
            
          </div>
        </div>

        <div className=' w-2/3  flex flex-col px-4 py-4 bg-[#10141e] rounded-xl h-full justify-end'>

          <div className="flex border border-gray-500 rounded-lg overflow-hidden ">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan teks"
              className="flex-1 py-3 px-3 border-none outline-none bg-[#10141e]"
            />
            <button className="bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-600">
              Submit
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
