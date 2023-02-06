import { useState, useEffect } from "react";

function RemainingTimeAndInitialPrice({ onNextPage }) {
  // remaining time과 price prediction은 useState로 update
  const [time, setTime] = useState(180);
  const [initialPrice, setInitialPrice] = useState();

  // price input이 변화하면 작동하는 함수
  const onInitialPriceHandler = (event) => {
    setInitialPrice(event.currentTarget.value);

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      initialPrice: event.currentTarget.value,
      predTime: 180 - time,
    };

    // db에 initial price prediction update
    fetch(
      "https://server-real.herokuapp.com/initialPrice",
      //"http://localhost:4000/initialPrice",
      {
        method: "post", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  };

  // initial prediction의 submit 버튼을 누르면 작동하는 함수
  const onSubmitHandler = (event) => {
    // 태그의 기본 기능으로 리프레쉬 되는 것을 방지.
    event.preventDefault();

    // input이 들어오지 않았다면 alert
    if (initialPrice === "") {
      return alert("가격을 입력해주세요.");
    }

    let body = {
      id: localStorage.getItem("ID"),
      test_num: localStorage.getItem("test_num"),
      initialPrice: initialPrice,
      predTime: 180 - time,
    };

    // db에 initial price prediction, prediction time update
    // 다음 페이지로 이동
    fetch(
      "https://server-real.herokuapp.com/initialPrice",
      //"http://localhost:4000/initialPrice",
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
        alert("응답이 기록되었습니다.");

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
        setTime((realTime) => 20);
      }
    }, 1000);
  };

  const onClickTempNext = () => {
    onNextPage();
  };
  // 여기까지

  // 타이머 구현을 위한 useEffect
  useEffect(() => {
    if (time > 0) {
      const timer = window.setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => {
        window.clearInterval(timer);
      };
    } else {
      onNextPage();
    }
  }, [time]);

  return (
    <div
      style={{
        top: "5%",
        marginLeft: "30%",
        marginRight: "30%",
        position: "relative",
      }}
    >
      <h4>
        팀이 3분 이내에 매도하려 합니다. 코인의 매도 가격을 제시해주시기
        바랍니다.
      </h4>
      남은 시간 : {time}
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <h3 style={{ textAlign: "center", top: "20%", position: "relative" }}>
          Initial Price
        </h3>
        <input
          type="text"
          value={initialPrice}
          onChange={onInitialPriceHandler}
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
export default RemainingTimeAndInitialPrice;
