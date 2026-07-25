import React, { useState, useEffect } from "react";

const MarqueeProposal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "Kamu selalu menerangi hariku, Layuza. ✨",
    "Setiap detik bersamamu terasa sangat istimewa. 💖",
    "Muhammad Anhar Solihin selalu memikirkanmu. 🌹",
    "Kamu adalah alasan senyumku setiap hari. 😊",
    "Kencan bersamamu adalah impian terindahku. ☕✨",
    "Bersamamu, hari biasa terasa penuh keajaiban. 🌟",
    "Terima kasih sudah hadir di hidupku, Layuza. 🥰",
    "Aku janji kencan kita bakal seru dan penuh kenangan manis! 🎉💖",
    "Maukah kamu jalan kencan bersamaku, Layuza? 🌹✨",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 9000); // Change sentence every 9 seconds
    return () => clearInterval(interval);
  }, [sentences.length]);

  return (
    <div
      style={{
        width: "min(90%, 650px)",
        height: "65px",
        margin: "30px auto",
        borderRadius: "25px",
        overflow: "hidden",
        position: "relative",
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        border: "3px solid #ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          position: "absolute",
          animation: "marquee 10s linear infinite",
        }}
        key={currentIndex}
      >
        <span
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
            fontFamily: "Charm, serif", 
            fontStyle: "normal",
            fontWeight: "700",
            color: "#191a19",
            textShadow: "0 2px 4px rgba(255, 255, 255, 0.8)",
          }}
        >
          {sentences[currentIndex]}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeProposal;
