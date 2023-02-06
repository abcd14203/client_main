import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import SurveyCheckBox from "../components/SurveyCheckBox";

// before survey 2 page
function SurverPage2({ loginStatus }) {
  // survey contents는 useState로 update
  const [surveyContent1, setSurveyContent1] = useState("");
  const [surveyContent2, setSurveyContent2] = useState("");
  const [surveyContent3, setSurveyContent3] = useState("");
  const [surveyContent4, setSurveyContent4] = useState("");
  const [surveyContent5, setSurveyContent5] = useState("");
  const [surveyContent6, setSurveyContent6] = useState("");
  const [surveyContent7, setSurveyContent7] = useState("");
  const [surveyContent8, setSurveyContent8] = useState("");
  const [surveyContent9, setSurveyContent9] = useState("");

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

    // 각 항목 반드시 체크해야함
    if (surveyContent1 === "") {
      return alert("5-1 항목에 응답해주세요.");
    } else if (surveyContent2 === "") {
      return alert("5-2 항목에 응답해주세요.");
    } else if (surveyContent3 === "") {
      return alert("5-3 항목에 응답해주세요.");
    } else if (surveyContent4 === "") {
      return alert("5-4 항목에 응답해주세요.");
    } else if (surveyContent5 === "") {
      return alert("5-5 항목에 응답해주세요.");
    } else if (surveyContent6 === "") {
      return alert("5-6 항목에 응답해주세요.");
    } else if (surveyContent7 === "") {
      return alert("5-7 항목에 응답해주세요.");
    } else if (surveyContent8 === "") {
      return alert("5-8 항목에 응답해주세요.");
    } else if (surveyContent9 === "") {
      return alert("5-9 항목에 응답해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      beforeSurvey1: surveyContent1,
      beforeSurvey2: surveyContent2,
      beforeSurvey3: surveyContent3,
      beforeSurvey4: surveyContent4,
      beforeSurvey5: surveyContent5,
      beforeSurvey6: surveyContent6,
      beforeSurvey7: surveyContent7,
      beforeSurvey8: surveyContent8,
      beforeSurvey9: surveyContent9,
    };

    // db에 survey 항목 update
    fetch(
      "https://server-real.herokuapp.com/survey2",
      //"http://localhost:4000/survey2",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    alert("설문이 완료되었습니다.");

    // notice 페이지로 이동
    navigate("/notice");
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
          5-1. 나는 새로운 사람을 만날때, 신뢰를 하지 못할 특별한 이유를
          발견하지 않는다면, 나는 그 사람을 신뢰하는 편이다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent1}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-2. 나는 새로운 것(회사, 게임 등)을 경험할때, 신뢰를 하지 못할 특별한
          이유를 발견하지 않는다면, 나는 그것을 신뢰하는 편이다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent2}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-3. 나는 인공지능이 유용하다고 생각한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent3}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-4. 인공지능을 사용하는 것은 과업을 수행하는데 도움을 준다고
          생각한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent4}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-5. 인공지능을 사용하는 것은 생산성을 향상 시킨다고 생각한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent5}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-6. 나는 결정을 연기하려고 하는 경향이 있다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent6}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-7. 나는 내가 의사결정을 하는 위치에 있는 것을 선호한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent7}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-8. 나는 잘못된 의사결정을 할 것 같아 걱정한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent8}
          dataList={dataList}
        ></SurveyCheckBox>

        <h4 className="header-text">
          5-9. 나는 사소한 의사결정을 하는데 많은 시간을 소비한다.
        </h4>
        <SurveyCheckBox
          setValue={setSurveyContent9}
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

export default SurverPage2;
