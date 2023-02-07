import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import SurveyCheckBox from "../components/SurveyCheckBox";

// after survey page
function SurverPage3({ loginStatus }) {
  // survey 항목 useState로 update
  const [surveyContent1, setSurveyContent1] = useState("");
  const [surveyContent2, setSurveyContent2] = useState("");
  const [surveyContent3, setSurveyContent3] = useState("");
  const [surveyContent4, setSurveyContent4] = useState("");
  const [surveyContent5, setSurveyContent5] = useState("");
  const [surveyContent6, setSurveyContent6] = useState("");
  const [surveyContent7, setSurveyContent7] = useState("");
  const [surveyContent8, setSurveyContent8] = useState("");

  const dataList = [
    { key: 0, value: "" },
    { key: 1, value: "매우 그렇지 않다" },
    { key: 2, value: "그렇지 않다" },
    { key: 3, value: "보통이다" },
    { key: 4, value: "그렇다" },
    { key: 5, value: "매우 그렇다" },
  ];

  const navigate = useNavigate();

  // 최종 submit 버튼 누르면 실행되는 함수
  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    // 모든 항목 입력해야함
    if (surveyContent1 === "") {
      return alert("1-1 항목에 응답해주세요.");
    } else if (surveyContent2 === "") {
      return alert("1-2 항목에 응답해주세요.");
    } else if (surveyContent3 === "") {
      return alert("1-3 항목에 응답해주세요.");
    } else if (surveyContent4 === "") {
      return alert("1-4 항목에 응답해주세요.");
    } else if (surveyContent5 === "") {
      return alert("1-5 항목에 응답해주세요.");
    } else if (surveyContent6 === "") {
      return alert("1-6 항목에 응답해주세요.");
    } else if (surveyContent7 === "") {
      return alert("1-7 항목에 응답해주세요.");
    } else if (surveyContent8 === "") {
      return alert("1-8 항목에 응답해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      afterSurvey1: surveyContent1,
      afterSurvey2: surveyContent2,
      afterSurvey3: surveyContent3,
      afterSurvey4: surveyContent4,
      afterSurvey5: surveyContent5,
      afterSurvey6: surveyContent6,
      afterSurvey7: surveyContent7,
      afterSurvey8: surveyContent8,
    };

    // db에 survey 항목 update
    fetch(
      "https://server-real.herokuapp.com/survey3",
      //"http://localhost:4000/survey3",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    alert("설문이 완료되었습니다.");

    // 마지막 페이지로 이동
    navigate("/end");
  };

  // 로그인 없이 접근 불가능
  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  return (
    <div className="real-background-survey2">
      <div className="survey2-one-box">
        <h4 className="header-text">
          1-1. 팀원들은 과업을 수행하는 과정에서 많은 정보를 제공하였다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent1}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-2. 팀원들은 과업을 수행하는 과정에서 중요한 정보를 제공하였다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent2}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-3. 팀원들은 공통된 목표를 가지고 있었다고 생각한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent3}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-4. 팀의 성과 목표를 팀원들이 공유하고 있었다고 생각한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent4}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-5. 팀원들은 성과 목표를 위해서 무엇이 중요한지에 대해서 알고
          있었다고 생각한다.{" "}
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent5}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-6. 인공지능은 과업 수행과 관련하여 전문가와 같았다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent6}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-7. 인공지능은 우리 팀원들의 가격 선호도를 이해할 수 있는 능력이
          있었다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent7}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          1-8. 인공지능은 과업과 관련한 전문 지식을 가지고 있었다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent8}
          dataList={dataList}
        ></SurveyCheckBox>

        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <button type="submit" className="button">
            완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default SurverPage3;
