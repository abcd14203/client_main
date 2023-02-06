import { useState, useEffect, useRef } from "react";
import YesOrNoCheckBox from "./YesOrNoCheckBox";

// second page에서 whether to change, final price 를 보여주는 component
function RemainingTimeAndFinalPrice({ onNextPage }) {
  // remaining time이나, whether to change 값, final price 값은 모두 useState로 update
  const [firstTime, setFirstTime] = useState(60);
  const [finalTime, setFinalTime] = useState(30);

  const [finalPrice, setFinalPrice] = useState();
  const [whetherToChange, setWhetherToChange] = useState("NO");

  // whether to change 값이 입력되기 전까지 final price 입력을 하지 못하게 하는 useRef
  const inputRef = useRef(null);

  const dataList = [
    { key: 0, value: "" },
    { key: 1, value: "YES" },
    { key: 2, value: "NO" },
  ];

  // final price의 input 값이 변화하면 작동하는 함수
  const onFinalPriceHandler = (event) => {
    setFinalPrice(event.currentTarget.value);

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      finalPrice: event.currentTarget.value,
      predTime: 30 - finalTime,
    };

    // fetch로 final price update
    fetch(
      "https://server-real.herokuapp.com/finalPrice",
      //"http://localhost:4000/finalPrice",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  };

  // whether to change의 submit 버튼을 누르면 작동하는 함수
  const onWhetherToChangeSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      whetherToChange: whetherToChange,
      predTime: 60 - firstTime,
    };

    // whether to change 값이 없으면 alert
    // whether to change 값이 YES면 final price의 input 활성화하고, NO면 next page로 이동
    if (whetherToChange === "") {
      return alert("가격을 입력해주세요.");
    } else {
      setFirstTime(0);
      alert("응답이 기록되었습니다.");
      if (whetherToChange === "YES") {
        inputRef.current.readOnly = false;
        inputRef.current.focus();
      } else {
        onNextPage();
      }
    }

    // db에 whether to change, decision time update
    fetch(
      "https://server-real.herokuapp.com/whetherToChange",
      //"http://localhost:4000/whetherToChange",
      {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  };

  // final price의 submit 버튼을 누르면 작동하는 함수
  const onFinalPriceSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      finalPrice: finalPrice,
      predTime: 30 - finalTime,
    };

    // final price를 입력하지 않았다면 alert
    if (finalPrice === "") {
      return alert("가격을 입력해주세요.");
    } else {
      setFinalPrice(0);
      alert("응답이 기록되었습니다.");
    }

    // db에 final price prediction 값, decision time update
    // 다음 페이지로 이동
    fetch(
      "https://server-real.herokuapp.com/finalPrice",
      //"http://localhost:4000/finalPrice",
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
        onNextPage();
      });
  };

  // 테스트에서만 사용하는 stop timer, temp next 함수
  // deploy 때는 없앨 것임
  let temp = "off";

  const onClickStopTimer = () => {
    if (temp == "off") {
      temp = "on";
    } else {
      temp = "off";
    }
    let interval = setInterval(() => {
      if (temp == "on") {
        setFirstTime((realTime) => 20);
      }
    }, 1000);
  };

  const onClickTempNext = () => {
    onNextPage();
  };
  // 여기까지

  // 타이머 구현을 위한 useEffect
  useEffect(() => {
    if (firstTime > 0) {
      const timerFirst = window.setInterval(() => {
        setFirstTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => {
        window.clearInterval(timerFirst);
      };
    } else {
      if (finalTime > 0) {
        const timerFinal = window.setInterval(() => {
          setFinalTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => {
          window.clearInterval(timerFinal);
        };
      } else if (finalTime == 0) {
        onNextPage();
      }
    }
  }, [firstTime, finalTime]);

  return (
    <div
      style={{ marginLeft: "35%", marginRight: "10%", position: "relative" }}
    >
      {/*<p>
        You can change your initial price within a minute. Will you change your
        initial price?
  </p>*/}
      <h4>
        1분 이내에 초기 가격을 변경할 수 있습니다. 초기 가격을 변경하시겠습니까?
      </h4>
      남은 시간 : {firstTime}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onWhetherToChangeSubmitHandler}
      >
        <h3 style={{ textAlign: "center" }}>Whether To Change?</h3>
        <YesOrNoCheckBox
          setValue={setWhetherToChange}
          dataList={dataList}
        ></YesOrNoCheckBox>
        <div className="blank-box"></div>
        <button type="submit" className="button">
          제출
        </button>
        <div className="blank-box"></div>
      </form>
      <h4>30초 이내에 최종 가격을 입력해야 합니다.</h4>
      {/*<p>You should enter your final price within 30 seconds.</p>*/}
      남은 시간 : {finalTime}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onFinalPriceSubmitHandler}
      >
        <h3 style={{ textAlign: "center" }}>Final Price</h3>
        <input
          diabled
          type="text"
          value={finalPrice}
          onChange={onFinalPriceHandler}
          ref={inputRef}
          readOnly
          className="input-box"
        />
        <div className="blank-box"></div>
        <button type="submit" className="button">
          제출
        </button>
      </form>
      <button onClick={onClickStopTimer}>Stop Timer</button>
      <button onClick={onClickTempNext}>Temp next page</button>
    </div>
  );
}

export default RemainingTimeAndFinalPrice;
