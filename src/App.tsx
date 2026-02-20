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
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(180deg, #fff 0%, #f1f5f9 100%)',
                  padding: '40px'
                }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    background: '#3b82f6',
                    borderRadius: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
                  }}>
                    <Globe size={40} color="white" />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 12px' }}>PhysiVault Browser</h2>
                  <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>
                    Nhập địa chỉ web phía dưới để bắt đầu trải nghiệm giả lập iPhone cao cấp.
                  </p>
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

