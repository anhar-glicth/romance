import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";
import yesgif12 from "./assets/GifData/Yes/lovecutie2.gif";
//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! yes - Music Importing
import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";
//! no - Music Importing
import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11, yesgif12];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null); // Tracks the currently playing song
  const [currentGifIndex, setCurrentGifIndex] = useState(0); // Track the current gif index
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);

  const gifRef = useRef(null); // Ref to ensure gif plays infinitely
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 640;
  const yesButtonSize = Math.min(noCount * 10 + 16, windowWidth < 640 ? 44 : 80);

  const [floatingGifs, setFloatingGifs] = useState([]); // Array to store active floating GIFs
  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15; // Minimum distance in 'vw' or 'vh'
  
    do {
      position = {
        top: `${Math.random() * 90}vh`, // Keep within 90% of viewport height
        left: `${Math.random() * 90}vw`, // Keep within 90% of viewport width
      };
  
      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);
  
    return position;
  };
  
  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];
  
    for (let i = 0; i < 10; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);
  
      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }
  
    setFloatingGifs(gifs);
  };
  
  const handleMouseLeave = () => {
    setFloatingGifs([]); // floating GIFs on mouse leave
  };

  // This ensures the "Yes" gif keeps restarting and playing infinitely
  useEffect(() => {
    if (gifRef.current && yesPressed) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  // Use effect to change the Yes gif every 4 seconds
  useEffect(() => {
    if (yesPressed) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 4000); // Change gif every 4 seconds

      // Clear the interval
      return () => clearInterval(intervalId);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src; // Reset gif to ensure it loops infinitely
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length; // Start cycling through NoGifs
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    // Play song on first press or every 7th press after
    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  };
  
  const handleYesClick = () => {
    setYesPressed(true);
    playMusic(YesMusic[0], YesMusic);
  };
  
  const playMusic = (url, musicArray) => {
    if (currentAudio) {
      currentAudio.pause(); // Stop the currently playing song
      currentAudio.currentTime = 0; // Reset to the start
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    setCurrentAudio(audio); // Set the new audio as the current one
    audio.addEventListener('ended', () => {
      const currentIndex = musicArray.indexOf(url);
      const nextIndex = (currentIndex + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray); // Play the next song in the correct array
    });
    audio.play();
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const getNoButtonText = () => {

    const phrases = [
      "Enggak 😜",
      "Yakin nih? 🤔",
      "Beneran yakin? 🥺",
      "Pikirin lagi dong! 💭",
      "Kesempatan terakhir! ⚠️",
      "Masa enggak sih? 😢",
      "Nanti kamu nyesel lho! 😜",
      "Coba pikir-pikir lagi! 💖",
      "Yakin banget nih? 💔",
      "Jangan dingin gitu dong! 🥺",
      "Punya hati kan? 💕",
      "Kok gitu sih... 😭",
      "Jangan buat aku sedih! 😥",
      "Ini jawaban terakhir kamu? 😳",
      "Hatiku hancur nih ;(",
      "Tapi... kenapa? 😢",
      "Kumohon, plisss? 💖",
      "Aku ga sanggup nih! 😫",
      "Beneran tega sama aku? 😢",
      "Muhammad Anhar Solihin udah nungguin lho! 🌹",
      "Ayo dong kencan bareng! 🥰",
      "Aku percaya kamu ga setega itu! 💔",
      "Hatiku bilang 'Mau', gimana hatimu? ❤️",
      "Jangan biarkan aku digantung! 😬",
      "Plsss? :( Mau ya kencan bersamaku? 💖",
    ];
    
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "Aku sayang banget sama kamu, Layuza! ❤️ Kamu udah mencuri hatiku sepenuhnya! 🥰💖 Tapi cewek secantik kamu masa langsung bilang mau? Godain aku dikit lagi dong dengan pencet 'Enggak'! 🥰✨",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        width: "min(90vw, 700px)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.2)
          url(${loveu})
          right
          no-repeat
        `,
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);
  
  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "Makasih banyak ya, Layuza! ❤️ Kamu adalah segalanya buat aku. Setiap momen bersamamu itu sangat berharga.<br/><br/>Muhammad Anhar Solihin janji bakal bikin kencan kita jadi momen paling manis! 🌹✨<br/>Sampai ketemu di kencan kita ya, Princess! 🥰💖",
        width: "min(90vw, 800px)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0,0,123,0.7)
          url(${purposerose})
          right
          no-repeat
        `,
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "Rasa sayanku ke kamu tuh ga ada habisnya, Layuza! 🌟 Muhammad Anhar Solihin bakal sabar nungguin kamu sampai bilang 'Mau'. ❤️ Tekan tombol 'Mau' yaa biar kita bisa jalan kencan bareng! 🥰✨<br/>'Cinta sejati tak pernah menyerah; ia tumbuh semakin kuat seiring waktu.'",
        width: "min(90vw, 850px)",
        padding: "1.5em",
        color: "#716add",
        background: `#fff url(${swalbg})`,
        backdrop: `
          rgba(0, 104, 123, 0.7)
          url(${nogif1})
          right
          no-repeat
        `,
      });
    }
  }, [noCount]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="overflow-hidden flex flex-col items-center justify-center pt-4 min-h-screen selection:bg-rose-600 selection:text-white text-zinc-900 px-4">
        {yesPressed ? (
          <>
            <img
              ref={gifRef}
              className="h-[180px] sm:h-[220px] md:h-[250px] rounded-lg object-contain max-w-[85vw]"
              src={YesGifs[currentGifIndex]}
              alt="Yes Response"
            />
            <div className="text-3xl sm:text-5xl md:text-6xl font-bold my-2 text-center" style={{ fontFamily: "Charm, serif", fontWeight: "700", fontStyle: "normal" }}>Yaaay! Kita Kencan! 🎉💖</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold my-1 text-rose-700 text-center" style={{ fontFamily: "Beau Rivage, serif", fontWeight: "500", fontStyle: "normal" }}> Muhammad Anhar Solihin & Layuza 👩‍❤️‍👨 </div> 
            <WordMareque />
          </>
        ) : (
          <>
            <img
              src={lovesvg}
              className="fixed animate-pulse top-3 left-3 md:top-10 md:left-10 w-20 sm:w-28 md:w-36 pointer-events-none z-10"
              alt="Love SVG"
            />
            <img
              ref={gifRef}
              className="h-[180px] sm:h-[220px] md:h-[250px] rounded-lg object-contain max-w-[85vw]"
              src={Lovegif}
              alt="Love Animation"
            />
            <h1 className="text-2xl sm:text-4xl md:text-5xl my-4 text-center font-bold px-2 leading-tight">
              sayangku, Mau ngga kamu bsk jalan? 🌹✨
            </h1>
            <div className="flex flex-wrap justify-center gap-3 items-center max-w-full px-2">
              <button
                onMouseEnter={handleMouseEnterYes}
                onMouseLeave={handleMouseLeave}
                className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-2 shadow-lg transition-all max-w-[85vw] break-words`}
                style={{ fontSize: yesButtonSize }}
                onClick={handleYesClick}
              >
                Mau! 🥰
              </button>
              <button
                onMouseEnter={handleMouseEnterNo}
                onMouseLeave={handleMouseLeave}
                onClick={handleNoClick}
                className="bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4 shadow-lg transition-all text-base sm:text-lg max-w-[85vw]"
              >
                {noCount === 0 ? "Enggak 😜" : getNoButtonText()}
              </button>
            </div>
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-10 h-10 sm:w-12 sm:h-12 animate-bounce"
                style={gif.style}
              />
            ))}
          </>
        )}
        <button
          className="fixed bottom-12 right-4 md:bottom-10 md:right-10 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-gray-200 shadow-md z-30"
          onClick={toggleMute}
        >
          {isMuted ? <BsVolumeMuteFill size={24} /> : <BsVolumeUpFill size={24} />}
        </button>
        <Footer />
      </div>
    </>
  );
}

const Footer = () => {
  return (
    <div
      className="fixed bottom-2 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-2 backdrop-blur-md opacity-95 border py-1 px-3 rounded-full border-rose-300 bg-white/80 text-[11px] sm:text-xs md:text-sm text-zinc-800 shadow z-30 whitespace-nowrap"
    >
      Dibuat dengan ❤️ oleh <span className="font-semibold text-rose-600">Muhammad Anhar Solihin</span> untuk <span className="font-semibold text-rose-600">Layuza</span>
    </div>
  );
};

// ! Pathways-
// https://app.spline.design/file/48a9d880-40c9-4239-bd97-973aae012ee0
// https://app.spline.design/file/72e6aee2-57ed-4698-afa7-430f8ed7bd87
