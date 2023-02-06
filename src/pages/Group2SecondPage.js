import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BitCoin from "../components/bitcoin-chart/src/BitCoin";
import CoinAndCash from "../components/CoinAndCash";
import RemainingTimeAndFinalPrice from "../components/RemainingTimeAndFinalPrice";
import "../css/App.css";

// group 2의 두 번째 prediction page
// group 1과 몇몇 보여지는 요소만 다를 뿐
function Group2SecondPage({ loginStatus }) {
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");
    navigate("/");
  };

  const onNextPage = (e) => {
    const curTestNum = parseInt(localStorage.getItem("test_num"));

    if (curTestNum < 10) {
      localStorage.setItem("test_num", curTestNum + 1);

      navigate("/group/2");
    } else {
      navigate("/survey3");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  if (localStorage.getItem("ID")) {
    let userinfo = localStorage.getItem("ID");
    return (
      <div className="real-background-research">
        <div className="group-one-box">
          <h3
            className="header-text"
            style={{ border: "1px solid", padding: "10px" }}
          >
            Test Number : {localStorage.getItem("test_num")}
          </h3>
          <h1
            style={{
              marginLeft: "35%",
              marginRight: "30%",
              position: "relative",
            }}
          >
            {userinfo} user id, 두 번째 집단입니다.
          </h1>
          <button type="button" onClick={onClickLogout} className="button">
            로그아웃
          </button>
          <div style={{ height: "70px" }}></div>

          <CoinAndCash />
          <div style={{ height: "50px" }}></div>

          {/* <Suggestion /> */}
          <div className="bitcoin-chart">
            <BitCoin />
          </div>
          <div className="second-response">
            <RemainingTimeAndFinalPrice onNextPage={onNextPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Group2SecondPage;
