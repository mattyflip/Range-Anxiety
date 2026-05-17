import React from 'react'

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.95)', 
        zIndex: 30000, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backdropFilter: 'blur(10px)',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        className="card" 
        style={{ 
          maxWidth: '500px', 
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '30px', 
          border: '1px solid #333',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>⚡</div>
        <h1 style={{ color: '#ff6600', marginBottom: '0.8rem', fontSize: '1.6rem' }}>Welcome to E-Bike King!</h1>
        <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
          Your ultimate tool for planning rides and conquering range anxiety.
        </p>

        <div style={{ textAlign: 'left', background: '#121212', padding: '1.2rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Plan Your Route</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Tap the map to add waypoints and see real-time range estimates.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🚲</span>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Custom Specs</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Select your bike and battery to get accurate, personalized data.</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '1.2rem' }}>👥</span>
            <div>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Community Hub</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Join the forum to share trips, ask questions, and meet riders.</div>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            background: '#ff6600', 
            color: 'white', 
            border: 'none', 
            borderRadius: '15px', 
            fontWeight: 'bold', 
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(255,102,0,0.3)'
          }}
        >
          Let's Ride!
        </button>
        
        <button 
          onClick={onClose}
          style={{ 
            marginTop: '1rem', 
            background: 'none', 
            border: 'none', 
            color: '#666', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
