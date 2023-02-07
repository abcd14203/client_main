import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BitCoin from "../components/bitcoin-chart/src/BitCoin";
import CoinAndCash from "../components/CoinAndCash";
import MembersDecision from "../components/MembersDecision";
import RemainingTimeAndInitialPrice from "../components/RemainingTimeAndInitialPrice";
import "../css/App.css";

// group 5의 첫 번째 prediction page
// group 1과 몇몇 보여지는 요소만 다를 뿐
function Group5Page({ loginStatus }) {
  const navigate = useNavigate();

  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");
    localStorage.setItem("fetchMemberDecision", "");

    navigate("/");
  };

  const onNextPage = (e) => {
    localStorage.setItem("fetchMemberDecision", "");
    navigate("second");
  };

  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  if (localStorage.getItem("ID")) {
    let userinfo = localStorage.getItem("ID");
    localStorage.setItem("fetchMemberDecision", true);
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
            {userinfo} user id, 다섯 번째 집단입니다.
          </h1>
          <button type="button" onClick={onClickLogout} className="button">
            로그아웃
          </button>
          <div style={{ height: "30px" }}></div>

          <CoinAndCash />
          <MembersDecision />
          <div className="bitcoin-chart">
            <div style={{ height: "50px" }}></div>

            <BitCoin />
          </div>
          <RemainingTimeAndInitialPrice onNextPage={onNextPage} />
        </div>
      </div>
    );
  }
}

export default Group5Page;
