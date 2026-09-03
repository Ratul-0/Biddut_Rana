import React, { useState, useEffect } from 'react';
import './App.css';
import userImage from './download.jpg';
import { db, ref, onValue, set } from './firebase';

function App() {
  const [hasPower, setHasPower] = useState(true);
  const [loading, setLoading] = useState(true); // ডাটা লোড হওয়া পর্যন্ত ট্র্যাক করার জন্য
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const ADMIN_PASSWORD = "87654321";

  useEffect(() => {
    const statusRef = ref(db, 'powerStatus');
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setHasPower(data);
      }
      setLoading(false); // ফায়ারবেস থেকে ডাটা পাওয়ার পর লোডিং বন্ধ হবে
    });

    return () => unsubscribe();
  }, []);

  const statusText = hasPower ? "বিদ্যুৎ থাকবে ⚡" : "লোডশেডিং চলবে ❌";

  const handleStatusChange = () => {
    if (password === ADMIN_PASSWORD) {
      const newStatus = !hasPower;
      set(ref(db, 'powerStatus'), newStatus)
        .then(() => {
          setShowModal(false);
          setPassword('');
          setErrorMsg('');
        })
        .catch(() => {
          setErrorMsg("ডাটাবেজে আপডেট করতে সমস্যা হয়েছে।");
        });
    } else {
      setErrorMsg("ভুল পাসওয়ার্ড!");
    }
  };

  return (
    <div className="container">
      <button 
        className="admin-gear-btn" 
        onClick={() => { setShowModal(true); setErrorMsg(''); }}
      >
        ⚙️ Admin
      </button>

      <h1 className="header-text">Rana.server.bd</h1>
      <img src={userImage} alt="Rana Server Admin" className="profile-image" />

      {/* ১. ডাটা লোড হওয়া পর্যন্ত লোডিং স্পিনার/টেক্সট দেখাবে */}
      {loading ? (
        <div className="loading-box">
          <p>বিদ্যুতের অবস্থা লোড হচ্ছে...</p>
        </div>
      ) : (
        <>
          <marquee className="scrolling-text">
            এখানে সাভারের সার্বক্ষণিক বিদ্যুতের আপডেট জানানো হয়। বর্তমান অবস্থা: {statusText}
          </marquee>

          <div className={`status-box ${!hasPower ? "no-power" : ""}`}>
            <h2>বিদ্যুতের অবস্থা</h2>
            <p className="status">{statusText}</p>
            <p className="last-update">সর্বশেষ আপডেট: লাইভ</p>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>এডমিন এক্সেস</h3>
            <p>স্ট্যাটাস পরিবর্তন করতে পাসওয়ার্ড দিন:</p>
            
            <input 
              type="password" 
              placeholder="পাসওয়ার্ড লিখুন..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />

            {errorMsg && <p className="error-text">{errorMsg}</p>}

            <div className="modal-buttons">
              <button onClick={handleStatusChange} className="btn-save">
                স্ট্যাটাস চেঞ্জ করুন
              </button>
              <button 
                onClick={() => { setShowModal(false); setPassword(''); }} 
                className="btn-cancel"
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;