import { useEffect, useState } from 'react';

interface AdBannerProps {
  isPro: boolean;
}

const AdBanner = ({ isPro }: AdBannerProps) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only attempt to load if not PRO and haven't tried loading this mount session
    if (!isPro && !adLoaded) {
      const loadAd = () => {
        try {
          // @ts-ignore
          const adsbygoogle = window.adsbygoogle || [];
          adsbygoogle.push({});
          setAdLoaded(true);
        } catch (e) {
          console.warn("AdSense push failed - waiting for script or checking for adblocker.");
        }
      };

      // Small delay to ensure the DOM element is fully rendered before pushing
      const timer = setTimeout(loadAd, 500);
      return () => clearTimeout(timer);
    }
  }, [isPro, adLoaded]);

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
