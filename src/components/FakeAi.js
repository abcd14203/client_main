import { useState } from "react";

// Fake Ai 값을 나타내주는 component
function FakeAi({ loginStatus }) {
  // suggestion 값은 useState로 update
  const [suggestion, setSuggestion] = useState("0");

  let test_num = localStorage.getItem("test_num");
  let mean_column = `init_group_mean_${test_num}`;

  let body = {
    id: localStorage.getItem("ID"),
    meanColumn: mean_column,
  };

  // fetch로 fake ai 값 가져오기
  // fake ai 값은 해당 group 구성원들의 initial prediction의 mean 값. db에 저장된 값을 불러옴.
  fetch(
    "https://server-real.herokuapp.com/fakeAi",
    //"http://localhost:4000/suggestion",
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
        setSuggestion(res[0][mean_column]);
      }
    });

  return (
    <div>
      <h3 className="group-suggestion-box">제안 값 : {suggestion}</h3>
    </div>
  );
}

export default FakeAi;
