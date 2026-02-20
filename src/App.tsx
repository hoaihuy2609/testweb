import React, { useState, useEffect } from 'react';
import { RotateCcw, Battery, Wifi, Signal, Globe, Search, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [url, setUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url') || params.get('u');
    if (urlParam) {
      const target = urlParam.startsWith('http') ? urlParam : 'https://' + urlParam;
      setUrl(target);
      setInputValue(target);
    }
    return () => clearInterval(timer);
  }, []);

  const handlePopOut = () => {
    const popupWidth = 450;
    const popupHeight = 900;
    const left = (window.screen.width / 2) - (popupWidth / 2);
    const top = (window.screen.height / 2) - (popupHeight / 2);
    window.open(window.location.href, 'SimulatorPopOut', `width=${popupWidth},height=${popupHeight},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    let targetUrl = inputValue;
    if (!targetUrl.toLowerCase().startsWith('http://') && !targetUrl.toLowerCase().startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    setUrl(targetUrl);
    setInputValue(targetUrl);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1200);
  };

  const isInPopup = window.innerHeight < 950 && window.innerWidth < 600;

  return (
    <div className="container">
      {!isInPopup && (
        <button onClick={handlePopOut} className="popout-btn">
          <Globe size={16} /> Pop-out Studio
        </button>
      )}

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="iphone-frame"
      >
        <div className="iphone-screen">
          {/* Dynamic Island */}
          <div className="dynamic-island-container">
            <motion.div
              whileHover={{ width: 200, height: 40 }}
              className="dynamic-island"
            />
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="time">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            <div className="status-icons">
              <Signal size={16} strokeWidth={2.5} />
              <Wifi size={16} strokeWidth={2.5} />
              <Battery size={20} strokeWidth={2.5} />
            </div>
          </div>

          {/* Main Browser View */}
          <div className="browser-ui">
            <div className="browser-content">
              {!url ? (
                <div className="dashboard">
                  <div className="dashboard-header">
                    <div style={{ cursor: 'pointer', color: '#6366f1' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </div>
                    <h1 style={{ color: '#6366f1', fontSize: '20px', fontWeight: '800' }}>PhysiVault</h1>
                  </div>

                  <div className="dashboard-badge">
                    <span>✧ HỆ THỐNG QUẢN LÝ THÔNG TIN PHYSICS</span>
                  </div>

                  <div className="dashboard-title">
                    <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0 }}>Chào mừng đến với</h2>
                    <h2 className="gradient-text" style={{ fontSize: '36px', fontWeight: '900', margin: 0 }}>PhysiVault</h2>
                  </div>

                  <div className="quote-card">
                    <div className="quote-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-3.5 4.5-6 5"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-3.5 4.5-6 5"></path></svg>
                    </div>
                    <p className="quote-text">
                      Vật lý không chỉ là các phương trình, nó là cách ta nhìn thế giới.
                    </p>
                  </div>

                  <div className="info-list">
                    <div className="info-item">
                      <div className="info-icon-wrapper" style={{ background: '#eff6ff', color: '#2563eb' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                      </div>
                      <div className="info-content">
                        <span className="info-label">HỆ THỐNG</span>
                        <span className="info-value">Phát triển bởi <span style={{ color: '#2563eb' }}>Nguyễn Trần Hoài Huy</span></span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon-wrapper" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                      <div className="info-content">
                        <span className="info-label">TỔ LÝ</span>
                        <span className="info-value">Group Vật lý Physics</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <div className="info-icon-wrapper" style={{ background: '#faf5ff', color: '#9333ea' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </div>
                      <div className="info-content">
                        <span className="info-label">TÁC GIẢ</span>
                        <span className="info-value">Thái Văn Thanh</span>
                      </div>
                    </div>
                  </div>

                  <div className="fab">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </div>
                </div>
              ) : (
                <iframe src={url} style={{ border: 'none', width: '100%', height: '100%' }} title="Simulator" />
              )}

              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
                  >
                    <RotateCcw className="animate-spin" size={32} color="#3b82f6" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Float URL Bar */}
              <div className="url-bar-container">
                <form onSubmit={handleSubmit} className="url-bar-glass">
                  <Lock size={14} color="#64748b" />
                  <input
                    className="url-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tìm kiếm hoặc nhập địa chỉ..."
                  />
                  {inputValue && (
                    <button type="submit" style={{ background: 'none', border: 'none', padding: 0, display: 'flex', cursor: 'pointer' }}>
                      <Search size={18} color="#3b82f6" />
                    </button>
                  )}
                  <RotateCcw
                    size={18}
                    color="#64748b"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsLoading(true);
                      setUrl(url + (url.includes('?') ? '&' : '?') + 't=' + Date.now());
                      setTimeout(() => setIsLoading(false), 800);
                    }}
                  />
                </form>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="home-indicator-bar">
              <div className="home-indicator" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;

