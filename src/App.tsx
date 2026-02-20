import React, { useState, useEffect } from 'react';
import { RotateCcw, Globe, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [url, setUrl] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url') || params.get('u');
    if (urlParam) {
      const target = urlParam.startsWith('http') ? urlParam : 'https://' + urlParam;
      setUrl(target);
      setInputValue(target);
    }
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


          {/* Main Browser View */}
          <div className="browser-ui" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
            <div className="browser-content" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              {!url ? (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  padding: '20px 40px'
                }}>
                  <div style={{
                    color: '#e2e8f0',
                    marginBottom: '24px'
                  }}>
                    <Globe size={110} strokeWidth={1} />
                  </div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#94a3b8',
                    margin: '0 0 12px',
                    textAlign: 'center'
                  }}>
                    Nhập địa chỉ web để bắt đầu lướt
                  </h3>
                  <p style={{
                    textAlign: 'center',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    margin: 0,
                    maxWidth: '80%'
                  }}>
                    (Lưu ý: Một số web như Google sẽ chặn hiển thị iframe)
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
            </div>

            {/* Bottom URL Bar Container - Đảm bảo luôn nằm trên cùng */}
            <div className="bottom-nav" style={{
              background: '#fff',
              padding: '12px 16px 16px',
              borderTop: '1px solid #f1f5f9',
              zIndex: 1000
            }}>
              <form onSubmit={handleSubmit} className="search-bar" style={{
                background: '#eef2f6',
                borderRadius: '100px',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <Search size={18} color="#64748b" strokeWidth={2.5} />
                <input
                  className="search-input"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#1a1a1a',
                    width: '100%'
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tìm kiếm hoặc nhập địa chỉ..."
                />
                <RotateCcw
                  size={18}
                  color="#64748b"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (!url) return;
                    setIsLoading(true);
                    const separator = url.includes('?') ? '&' : '?';
                    setUrl(url + separator + 't=' + Date.now());
                    setTimeout(() => setIsLoading(false), 800);
                  }}
                />
              </form>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="home-indicator-bar" style={{ height: '24px', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '8px' }}>
            <div className="home-indicator" style={{ width: '120px', height: '5px', background: '#000', borderRadius: '10px', opacity: 0.2 }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;

