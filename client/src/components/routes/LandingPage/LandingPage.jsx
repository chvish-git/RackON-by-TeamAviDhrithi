import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [splineUrl, setSplineUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSplineUrl("https://prod.spline.design/88Ab6CNzEYgHT1Ak/scene.splinecode");
  }, []);

  return (
    <div className="container relative">
      

      {/* Left Section */}
      <div className="left-section">
        <h1>RACKON</h1>
        <p className="mt-1">Track. Organize. Optimize.</p> {/* Reduced space */}
        <button className="get-started" onClick={() => navigate("/dashboard")}>Get Started</button>
      </div>

      
      {/* Right Section */}
      {splineUrl && <Spline scene={splineUrl} />}
      <div className="watermark-blocker"></div>
      
          {/* Top Right Auth Buttons */}
      <div className="auth-buttons">
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
      
      </div>
      
    </div>
  );
}
