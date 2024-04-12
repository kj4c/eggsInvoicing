import { useEffect, useState } from 'react';
import { MouseParallax } from 'react-just-parallax';
import '../../stylesheets/Gradient.css';
import '../../stylesheets/Rings.css';
import '../../stylesheets/ColouredBalls.css';

export const Gradient = () => {
  return (
    <>
      <div className='GradientBar1' />
      <div className='GradientBar2' />
    </>
  );
};

const Rings = () => {
  return (
    <>
      <div className='Ring1' />
      <div className='Ring2' />
      <div className='Ring3' />
      <div className='Ring4' />
    </>
  );
};

export const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='RingContainer'>
      <Rings />

      {/* Moving background colored circle balls */}
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className='Ball1-Container'>
          <div
            className={`Ball1 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className='Ball2-Container'>
          <div
            className={`Ball2 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className='Ball3-Container'>
          <div
            className={`Ball3 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className='Ball4-Container'>
          <div
            className={`Ball4 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className='Ball5-Container'>
          <div
            className={`Ball5 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>

        <div className='Ball6-Container'>
          <div
            className={`Ball6 ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};
