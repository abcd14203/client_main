import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

// 연구 종료 page
function FinalPage() {
  const navigate = useNavigate();

  // login 하지 않았다면 접근 불가능
  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, []);

  return (
    <div className="real-background">
      <div className="center-box">
        <h2 className="header-text">Direction</h2>
        <h1 className="direction-text">
          모든 연구가 종료되었습니다. <br /> 수고하셨습니다.
        </h1>
        <div className="blank-box"></div>
      </div>
    </div>
  );
}

export default FinalPage;
