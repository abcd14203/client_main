import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

// new member를 register하는 component
function Register() {
  // register되는 정보들을 useState로 update
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIschecked] = useState(false);
  const [isRedundancy, setisRedundancy] = useState(false);

  // useNavigate으로 페이지 이동
  const navigate = useNavigate();

  // handler 함수들 (input 값에 변화가 있을 때마다 update)
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    setIschecked(false);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  // 이메일 중복 체크 버튼을 눌렀을 때 실행하는 함수
  const onEmailRedundancyCheck = (event) => {
    event.preventDefault();
    // fetch를 통해 입력된 email이 db에 있는지 중복 확인
    // 이미 존재하는 email이면 alert
    fetch(
      "https://server-real.herokuapp.com/userinfo"
      //"http://localhost:4000/userinfo"
    )
      .then((response) => response.json())
      .then((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i]["email"] === Email) {
            setisRedundancy(true);
            return alert("이미 사용 중인 이메일입니다!");
          } else {
            setisRedundancy(false);
          }
        }
        if (!isRedundancy) alert("사용 가능한 이메일입니다!");
        setIschecked(true);
      });
  };

  // 최종 register 할 때 동작하는 함수
  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    // 각 항목을 입력하지 않거나, 중복 체크를 하지 않거나, email이 중복이거나, pw와 pw확인이 일치하지 않으면 register 되지 않음.
    if (Email === "") {
      return alert("이메일을 입력해주세요.");
    } else if (!isChecked) {
      return alert("이메일 중복 체크를 해주세요.");
    } else if (isRedundancy) {
      return alert("다른 이메일을 사용해주세요.");
    } else if (Name === "") {
      return alert("이름을 입력해주세요.");
    } else if (Password === "") {
      return alert("비밀번호를 입력해주세요.");
    } else if (Password !== ConfirmPassword) {
      return alert("비밀번호 확인이 일치하지 않습니다.");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // fetch를 통해 db에 register 되는 사람의 정보 update
    fetch(
      "https://server-real.herokuapp.com/register",
      //"http://localhost:4000/register",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    alert("회원 가입이 완료되었습니다.");

    // login page로 이동
    navigate("/");
  };

  return (
    <div className="real-background">
      <div className="center-box">
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <h2 className="header-text">이메일</h2>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            className="input-box"
          />
          <div className="blank-box"></div>
          <button
            type="submit"
            onClick={onEmailRedundancyCheck}
            className="register-redundancy-button"
          >
            이메일 중복 체크
          </button>
          <div className="blank-box"></div>
          <h2 className="header-text">이름</h2>
          <input
            type="text"
            value={Name}
            onChange={onNameHandler}
            className="input-box"
          />
          <div className="blank-box"></div>
          <h2 className="header-text">비밀번호</h2>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            className="input-box"
          />
          <div className="blank-box"></div>
          <h2 className="header-text">비밀번호 확인</h2>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            className="input-box"
          />
          <div className="blank-box"></div>
          <button type="submit" className="button">
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
