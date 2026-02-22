import { useNavigate } from "react-router";

export function Splash() {
  const navigate = useNavigate();

  const isFirstVisit = !localStorage.getItem("idea2code_visited");
  const videoSrc = isFirstVisit
    ? "/Idea2Code Splash Screen_FirstTime.mp4"
    : "/Idea2Code Splash Screen_Always.mp4";

  const handleVideoEnd = () => {
    localStorage.setItem("idea2code_visited", "true");
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="w-full h-screen object-cover"
      />
    </div>
  );
}
