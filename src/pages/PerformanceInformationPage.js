import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

// group 5, group 8에게만 보여지는 performance information page
// 같은 group 내의 other members의 initial prediction, whether to change, final price를 보여주는 page
function PerformanceInformationPage({ loginStatus }) {
  const navigate = useNavigate();

  const finalList = [];
  const idxList = [0, 1, 2, 3];
  const [realList, setRealList] = useState("");

  // logout button 클릭 시 작동하는 함수
  const onClickLogout = (e) => {
    localStorage.setItem("ID", "");

    // login page로 이동
    navigate("/");
  };

  // group의 첫 번째 prediction page로 이동하는 함수
  const onNextPage = (e) => {
    const groupType = localStorage.getItem("group_type");
    let curTestNum = Number(localStorage.getItem("test_num"));
    localStorage.setItem("test_num", curTestNum + 1);
    navigate(`/group/${groupType}`);
  };

  let body = {
    id: localStorage.getItem("ID"),
    test_num: localStorage.getItem("test_num"),
  };

  // group 내의 other members의 prediction 정보를 fetch로 받아오기
  useEffect(() => {
    fetch(
      "https://server-real.herokuapp.com/perfinf",
      //"http://localhost:4000/coinandcash",
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
        if (res) {
          for (let i = 0; i < res.length; i++) {
            let individualInfo = res[i];
            finalList.push(individualInfo[`user_id`]);

            finalList.push(individualInfo[`init_price_${body.test_num}`]);
            finalList.push(
              individualInfo[`whether_to_change_${body.test_num}`]
            );
            finalList.push(individualInfo[`final_price_${body.test_num}`]);

            if (res[i]["user_id"] === localStorage.getItem("ID")) {
              res.splice(i, 1);
            }
          }

          setRealList(finalList);
        }
      });
  }, []);

  // 로그인 없이 접근 불가능
  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  if (localStorage.getItem("ID")) {
    let userinfo = localStorage.getItem("ID");
    return (
      <div className="real-background-survey">
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
            {userinfo} user id, {localStorage.getItem("group_type")} 번째
            그룹입니다.
          </h1>
          <button type="button" onClick={onClickLogout} className="button">
            로그아웃
          </button>

          {idxList.map((key) => (
            <div style={{ top: "20px", position: "relative" }}>
              <div style={{ height: "100px", position: "relative" }} />
              <h2
                style={{
                  left: "60px",
                  position: "relative",
                  border: "1px solid",
                  height: "50px",
                  width: "150px",
                  backgroundColor: "yellow",
                  textAlign: "center",
                }}
              >
                User Id : {realList[key * 4]}
              </h2>

              <div className="perfinf-left-box">
                initial estimation : {realList[key * 4 + 1]}
              </div>
              <div className="perfinf-center-box">
                whether to change : {realList[key * 4 + 2]}
              </div>
              <div className="perfinf-right-box">
                final estimation : {realList[key * 4 + 3]}
              </div>
            </div>
          ))}

          <button
            style={{
              backgroundColor: "rgb(47, 139, 225)",
              top: "100px",
              left: "70%",
              position: "relative",
              height: "50px",
              width: "20%",
            }}
            onClick={onNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default PerformanceInformationPage;
