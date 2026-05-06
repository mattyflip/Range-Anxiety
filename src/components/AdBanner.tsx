import { useEffect } from 'react';

interface AdBannerProps {
  isPro: boolean;
}

const AdBanner = ({ isPro }: AdBannerProps) => {
  useEffect(() => {
    // Only attempt to load ads if not a Pro user and in production/live environment
    if (!isPro) {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        // Silently fail if adblocker is present or Adsense script didn't load
        console.warn("AdSense push failed - this is normal if an adblocker is active.");
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
        border: '1px dashed rgba(255,255,255,0.1)'
      }}
    >
      <p style={{ fontSize: '0.6rem', color: '#555', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>ADVERTISEMENT</p> 
      <ins className="adsbygoogle"
           style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
           data-ad-client="ca-pub-7537427403075018"
           data-ad-slot="6978209606"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdBanner;
