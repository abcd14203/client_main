import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";
import styled from "styled-components";

// before survey 1 page
function SurverPage({ loginStatus }) {
  // 설문 항목들은 useState로 update
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("남성");
  const [Degree, setDegree] = useState("");
  const [EduBackground, setEduBackground] = useState("");
  const [checkItems, setCheckItems] = useState([]);
  const [major1, setMajor1] = useState("");
  const [major2, setMajor2] = useState("");
  const [major3, setMajor3] = useState("");
  const [workExperience, setWorkExperience] = useState("직장 경력이 없음");

  const majorData = [
    { id: 0, title: "인문학" },
    { id: 1, title: "경영/경제" },
    { id: 2, title: "예체능" },
    { id: 3, title: "화학(공학)" },
    { id: 4, title: "전기/전자/정보통신" },
    { id: 5, title: "생명공학" },
    { id: 6, title: "기계공학" },
    { id: 7, title: "정치/사회학" },
    { id: 8, title: "기타" },
  ];

  const navigate = useNavigate();

  // 설문 항목에 입력을 하면 시행되는 함수들
  const onAgeHandler = (event) => {
    setAge(event.currentTarget.value);
  };

  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };

  const onDegreeHandler = (event) => {
    setDegree(event.currentTarget.value);
  };

  const onEduBackgroundHandler = (event) => {
    setEduBackground(event.currentTarget.value);
  };

  // major 선택할 때 실행되는 함수
  // major는 최대 3개까지만 선택할 수 있게끔 설정해둠
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      if (checkItems.length === 0) {
        setMajor1(majorData[id].title);
        setCheckItems((prev) => [...prev, id]);
      } else if (checkItems.length === 1) {
        setMajor2(majorData[id].title);
        setCheckItems((prev) => [...prev, id]);
      } else if (checkItems.length === 2) {
        setMajor3(majorData[id].title);
        setCheckItems((prev) => [...prev, id]);
      } else if (checkItems.length === 3) {
        alert("3개까지만 선택 가능합니다.");
      }
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
      if (checkItems.length === 1) {
        setMajor1("");
      } else if (checkItems.legnth === 2) {
        setMajor2("");
      } else if (checkItems.length === 3) {
        setMajor3("");
      }
    }
  };

  const onWorkExperienceHandler = (event) => {
    setWorkExperience(event.currentTarget.value);
  };

  // 최종 submit 버튼 누르면 작동하는 함수
  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    // 필수 입력 항목 입력하지 않으면 alert
    if (Age === "") {
      return alert("나이를 선택해주세요.");
    } else if (major1 === "") {
      return alert("전공을 한 개 이상 선택해주세요.");
    } else if (Degree === "") {
      return alert("최종 학력을 입력해주세요.");
    } else if (EduBackground === "") {
      return alert("교육 배경을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      age: Age,
      gender: Gender,
      degree: Degree,
      eduBackground: EduBackground,
      major1: major1,
      major2: major2,
      major3: major3,
      workExperience: workExperience,
    };

    // fetch로 survey 항목 db에 update
    fetch(
      "https://server-real.herokuapp.com/survey",
      //"http://localhost:4000/survey",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    alert("설문이 완료되었습니다.");

    // before survey 2 page로 이동
    navigate("/survey2");
  };

  // 로그인 없이 접근 불가능
  useEffect(() => {
    if (!localStorage.getItem("ID")) {
      alert("로그인 해주세요!");
      navigate("/");
    }
  }, [loginStatus]);

  return (
    <div className="real-background-survey">
      <div className="survey-one-box">
        <h4 className="header-text">귀하의 나이는 얼마입니까?</h4>
        <select value={Age} onChange={onAgeHandler} className="input-box">
          <option value="">-</option>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대">50대</option>
          <option value="60대 이상">60대 이상</option>
        </select>
        <div className="blank-box"></div>
        <h4 className="header-text">귀하의 성별은 무엇입니까?</h4>
        <select value={Gender} onChange={onGenderHandler} className="input-box">
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        <div className="blank-box"></div>
        <h4 className="header-text">
          귀하의 전공과 가장 가까운 전공을 선택해주세요.
          <br /> (최대 3개 선택 가능)
        </h4>
        <StyledTable>
          <tbody>
            {majorData?.map((data, key) => (
              <tr key={key}>
                <td>
                  <input
                    type="checkbox"
                    name={`select-${data.id}`}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.id)
                    }
                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                    checked={checkItems.includes(data.id) ? true : false}
                  />
                </td>
                <td className="second-row">{data.title}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <div className="blank-box"></div>
        <h4 className="header-text">
          귀하의 직장 경력은 얼마입니까? <br />
          (직장 경력이 없다면 선택하지 마세요.)
        </h4>
        <select
          value={workExperience}
          onChange={onWorkExperienceHandler}
          className="input-box"
        >
          <option value="직장 경력이 없음">-</option>
          <option value="1년 미만">1년 미만</option>
          <option value="1년 이상 ~ 3년 미만">1년 이상 ~ 3년 미만</option>
          <option value="3년 이상 ~ 5년 미만">3년 이상 ~ 5년 미만</option>
          <option value="5년 이상 ~ 10년 미만">5년 이상 ~ 10년 미만</option>
          <option value="10년 이상">10년 이상</option>
        </select>
        <div className="blank-box"></div>
        <h4 className="header-text">최종 학력</h4>
        <select value={Degree} onChange={onDegreeHandler} className="input-box">
          <option value="">-</option>
          <option value="고졸">고졸</option>
          <option value="학부">학부 재학</option>
          <option value="대졸">대졸 (석사과정 포함)</option>
          <option value="석사">석사</option>
          <option value="박사">박사</option>
        </select>
        <div className="blank-box"></div>
        <h4 className="header-text">교육 배경</h4>
        <select
          value={EduBackground}
          onChange={onEduBackgroundHandler}
          className="input-box"
        >
          <option value="">-</option>
          <option value="인문">인문</option>
          <option value="사회">사회</option>
          <option value="경제,경영">경제, 경영</option>
          <option value="공학">공학</option>
          <option value="예술">예술</option>
        </select>
        <div className="blank-box"></div>

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

export default SurverPage;

const StyledTable = styled.table`
  text-align: center;
  border-collapse: collapse;
  left: 25%;
  position: relative;
  thead {
    tr {
      th {
        padding: 10px 15px;
        background-color: #888;
        color: #fff;
        font-weight: 700;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 7px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row {
    width: 200px;
  }
`;
