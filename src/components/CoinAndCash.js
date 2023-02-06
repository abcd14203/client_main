import { useState } from "react";
import "../css/App.css";

// 현재 group이 보유 중인 coin과 cash를 보여주는 component
function CoinAndCash({ loginStatus }) {
  // coin과 cash는 useState로 update
  const [coin, setCoin] = useState("");
  const [cash, setCash] = useState("");

  let body = {
    id: localStorage.getItem("ID"),
  };

  // fetch로 db에 있는 group의 현재 coin, cash 불러오기
  fetch(
    "https://server-real.herokuapp.com/coinandcash",
    //"http://localhost:4000/coinandcash",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )
    .then((response) => response.json())
    .then((res) => {
      if (res) {
        setCoin(res[0]["num_of_coins"]);
        setCash(res[0]["amount_of_cash"]);
      }
    });

  return (
    <div>
      <div
        className="group-left-box"
        style={{
          border: "1px solid",
          padding: "10px",
          top: "15%",
          left: "20%",
          width: "25%",
          position: "relative",
          float: "left",
        }}
      >
        팀의 남은 코인 : {coin}
      </div>
      <div
        className="group-right-box"
        style={{
          border: "1px solid",
          padding: "10px",
          top: "15%",
          left: "30%",
          width: "25%",
          position: "relative",
          float: "left",
        }}
      >
        팀의 현재 보유 중인 금액 : {cash}
      </div>
    </div>
  );
}

export default CoinAndCash;
