import { useState } from "react";
import "../css/App.css";

// 자신이 속한 group의 other members의 prediction을 나타내는 component
function MembersDecision({ loginStatus }) {
  // group member들의 prediction은 useState로 update
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");

  let body = {
    id: localStorage.getItem("ID"),
    test_num: localStorage.getItem("test_num"),
  };

  // setInterval을 이용하여 5초마다 other member들의 prediction update
  const interval = setInterval(() => {
    let fMD = localStorage.getItem("fetchMemberDecision"); // localStorage를 이용하여 현재 페이지에 있을 때에만 fetch를 하도록 설정
    if (fMD) {
      // fetch로 다른 db에 존재하는 other member들의 prediction값 불러오기
      fetch(
        "https://server-real.herokuapp.com/membersdecision",
        //"http://localhost:4000/membersdecision",
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
            for (let i = 0; i < res.length; i++) {
              if (res[i]["user_id"] === localStorage.getItem("ID")) {
                res.splice(i, 1);
              }
            }
            setMember1(res[0][`init_price_${body.test_num}`]);
            setMember2(res[1][`init_price_${body.test_num}`]);
            setMember3(res[2][`init_price_${body.test_num}`]);
            setMember4(res[3][`init_price_${body.test_num}`]);
          }
        });
    }
  }, 5000);

  return (
    <div>
      <div style={{ height: "140px" }}></div>

      <div style={{ top: "6%", position: "relative" }}>
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
          멤버 1의 예측값 : {member1}
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
          멤버 2의 예측값 : {member2}
        </div>

        <div style={{ height: "140px" }}></div>

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
          멤버 3의 예측값 : {member3}
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
          멤버 4의 예측값 : {member4}
        </div>
      </div>
    </div>
  );
}

export default MembersDecision;
