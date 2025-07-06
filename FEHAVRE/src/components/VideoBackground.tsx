import { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  videoSources: string[];
  fallbackImage: string;
  className?: string;
  children?: React.ReactNode;
}

export function VideoBackground({ 
  videoSources, 
  fallbackImage, 
  className = '', 
  children 
}: VideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Video autoplay failed, using fallback image');
          setVideoError(true);
        });
      }
    }
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster={fallbackImage}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            console.log('Video failed to load, using fallback image');
            setVideoError(true);
          }}
        >
          {videoSources.map((src, index) => (
            <source key={index} src={src} type="video/mp4" />
          ))}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${fallbackImage}')`,
          zIndex: videoError || !videoLoaded ? 1 : -1
        }}
      />

      {/* Loading Indicator */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
          <div className="text-white text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="text-xs opacity-75">Loading...</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
