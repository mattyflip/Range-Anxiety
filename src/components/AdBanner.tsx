import { useEffect } from 'react';

interface AdBannerProps {
  isPro: boolean;
}

const AdBanner = ({ isPro }: AdBannerProps) => {
  useEffect(() => {
    if (!isPro) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.warn("AdSense push failed - this is normal if an adblocker is active or script is still loading.");
      }
    }
  }, [isPro]);

  if (isPro) return null;

  return (
    <div 
      className="ad-container" 
      style={{ 
        marginTop: '1.5rem', 
        textAlign: 'center', 
        minHeight: '100px', 
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        padding: '0.5rem',
        border: '1px dashed rgba(255,255,255,0.1)',
        overflow: 'hidden'
      }}
    >
      <p style={{ fontSize: '0.6rem', color: '#555', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>ADVERTISEMENT</p> 
      {/* sidebar banner */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7537427403075018"
           data-ad-slot="6978209606"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdBanner;
