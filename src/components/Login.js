import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/App.css";

// login 기능이 구현되어 있는 component
function Login({ setLoginStatus }) {
  // input으로 들어오는 id, pw는 useState로 update
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  // useNavigate으로 페이지 이동
  const navigate = useNavigate();

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    let body = {
      email: inputId,
      password: inputPw,
    };

    // login 버튼을 클릭할 때 fetch를 통해 db에 입력한 id, pw가 존재하는지 확인
    // id, pw가 존재하면 정상적으로 로그인을 한 후 다음 페이지(survey)로 이동하고, 존재하지 않으면 alert
    fetch(
      "https://server-real.herokuapp.com/login",
      //"http://localhost:4000/login",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          localStorage.setItem("ID", "");
          return alert("이메일 또는 비밀번호가 맞지 않습니다.");
        } else {
          localStorage.setItem("ID", res[0]["id"]);
          localStorage.setItem("group_type", res[0]["group_type"]);
          return res[0]["group_type"];
        }
      })
      .then((id) => {
        if (id) {
          navigate(`/survey`);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="real-background">
      <div className="center-box">
        <h1 className="header-text">로그인</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ left: "5%", position: "relative" }}>
            <label htmlFor="input_id">이메일 : </label>
            <input
              type="text"
              name="input_id"
              value={inputId}
              onChange={handleInputId}
              className="login-input-box"
            />
          </div>
          <div className="blank-box"></div>
          <div style={{ left: "4%", position: "relative" }}>
            <label htmlFor="input_pw">비밀번호 : </label>
            <input
              type="password"
              name="input_pw"
              value={inputPw}
              onChange={handleInputPw}
              className="login-input-box"
            />
          </div>
          <div className="blank-box"></div>
          <div>
            <button
              type="button"
              onClick={onClickLogin}
              className="login-button"
            >
              로그인
            </button>
          </div>
          <div className="blank-box"></div>
        </form>
        <div>
          <Link to="/findpassword">
            <button type="button" className="login-fp-button">
              비밀번호 찾기
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="login-register-button">
              회원가입
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
