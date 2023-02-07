import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

// pw 찾는 page
function FindPasswordPage() {
  // email은 useState로 update
  const [email, setEmail] = useState("");

  // useNavigate로 페이지 이동
  const navigate = useNavigate();

  // input email이 바뀌면 email 변경
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // submit 누르면 실행되는 함수
  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    // email을 입력하지 않으면 alert
    if (email === "") {
      return alert("이메일을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      email: email,
    };

    // email이 있는 email이면 그 email의 pw 출력, 없으면 alert
    fetch(
      "https://server-real.herokuapp.com/findpassword",
      //"http://localhost:4000/findpassword",
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
        if (res["message"]) {
          alert("유효하지 않은 이메일입니다.");
        }
        let password = res[0]["password"];
        alert(`비밀번호는 ${password}입니다.`);
      })
      .then((res) => {
        navigate("/");
      });
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
            type="text"
            value={email}
            onChange={onEmailHandler}
            className="input-box"
          />
          <button type="submit" className="button">
            비밀번호 찾기
          </button>
        </form>
      </div>
    </div>
  );
}

export default FindPasswordPage;
