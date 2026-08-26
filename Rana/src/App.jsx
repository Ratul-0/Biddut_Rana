import React from 'react';
import './App.css';
import userImage from "./download.jpg"; // src ফোল্ডারে থাকা ছবির নাম অনুযায়ী মিলিয়ে নিন

function App() {
  const currentStatus = "বিদ্যুৎ আছে"; 

  return (
    <div className="container">
      <h1 className="header-text">Rana.server.bd</h1>
      <img src={userImage} alt="Rana Server Admin" className="profile-image" />
      <marquee className="scrolling-text">
        এখানে সাভারের সার্বক্ষণিক বিদ্যুতের আপডেট জানানো হয়।
      </marquee>
    </div>
  );
}

export default App;