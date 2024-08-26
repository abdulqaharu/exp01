import { SpeakerSimpleHigh, SpeakerX } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

const AudioPlayer = () => {
  const [audio, setAudio] = useState(null);
  const [audioMuted, setAudioMuted] = useState(false);

  useEffect(() => {
    const audioElement = new Audio('/happi.mp3');
    audioElement.loop = true; 
    audioElement.muted = true; // Start muted
    audioElement.play().catch((error) => console.error('Error preloading audio:', error));
    setAudio(audioElement);
  }, []);

  const handlePlay = () => {
    if (audio) {
        audio.muted = !audio.muted; // Toggle mute state
        setAudioMuted(!audioMuted); // Unmute the audio
      audio.play().catch((error) => console.error('Error playing audio:', error));
    }
  };

  return (
    <div className='flex items-center relative border-l border-[#7A1487]'>
      <button onClick={handlePlay} className=' text-[#7A1487] px-2 h-8 p-0 m-0 hover:bg-[#fff1eb]'>{audioMuted ? <SpeakerSimpleHigh size={22} weight='duotone' /> : <SpeakerX size={22} weight='duotone' />}</button>
    </div>
  );
};

export default AudioPlayer;
