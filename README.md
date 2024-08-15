# SmartChat

SmartChat is a web application that uses Google’s Generative AI (GEMINI) to answer interactive conversations. It provides a chat interface where users can communicate with an AI model, manage their chat history, and handle multiple conversations.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) - A JavaScript library for building user interfaces
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

- **Backend:**
  - [Laravel](https://laravel.com/) - A PHP framework for building web applications
  - [SQLite](https://www.sqlite.org/index.html) - A lightweight SQL database engine
  - [Gemini API](https://developers.google.com/generative-ai) - Google’s Generative AI API for generating responses

- **Additional Tools:**
  - [Axios](https://axios-http.com/) - A promise-based HTTP client for making API requests
  - [Base64](https://www.base64decode.net/base64-encoder) - For encoding and decoding base64 data
  - [TypeIt](https://typeitjs.com/) - A JavaScript library for creating typewriter animations
  - [react-toastify](https://github.com/fkhadra/react-toastify) - A library for showing toast notifications

## Features

- **User Authentication:** Log in with a username to access chat history.
- **Chat Management:** Create new chats, select existing ones, and delete chats.
- **Real-time Interaction:** Send messages to the AI and receive responses in real time.
- **Chat History:** View and manage your chat history, including past conversations.
- **Responsive Design:** A mobile-friendly interface for easy access on any device.

## Installation
BACKEND LARAVEL (run on terminal) : 
1. cd Backend_laravel
2. composer install
3. cp .env.example .env
4. php artisan key:generate
5. php artisan migrate
6. php artisan serve

FRONTEND REACT (run on terminal) :
1. cd Frontend_react
2. npm install
3. npm start

## Usage
  Login: Enter your username in the login field and click the "Login" button to start.
  Chat: Type your messages in the input field and click the send button to interact with the AI.
  Manage Chats: Use the sidebar to select, create, or delete chats. The chat history will update accordingly.

## Acknowledgments
  Google Generative AI for the API
  React for the front-end framework
  Laravel for the back-end framework

## Screenshots
![Chat with the bot](./Web%20Screenshots/Initial%20view.png)
![Initial view](./Web%20Screenshots/Chat%20with%20bot.png)
![Login user with saved chat history](./Web%20Screenshots/Login%20user%20with%20saved%20chat%20history.png)
![Mobile chat view](./Web%20Screenshots/mobile%20chat%20view.png)
![Mobile view](./Web%20Screenshots/Mobile%20view.png)


## Website Presentation on video
gdrive : https://drive.google.com/file/d/1zYONequ2G7695po6t1n7HsBSaYGFKJTa/view?usp=drivesdk
