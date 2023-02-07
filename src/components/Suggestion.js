import { useState } from "react";

// real ai recommendation 추천을 위한 component
function Suggestion({ loginStatus }) {
  // suggestion 값은 useState로 update
  const [suggestion, setSuggestion] = useState("0");

  let test_num = localStorage.getItem("test_num");
  let ai_pred_column = `ai_price_${test_num}`;

  let body = {
    groupType: localStorage.getItem("group_type"),
    aiPredColumn: ai_pred_column,
  };

  // fetch를 통해 ai prediction 불러오기
  fetch(
    "https://server-real.herokuapp.com/suggestion",
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
        setSuggestion(res[0][ai_pred_column]);
      }
    });

  return (
    <div>
      <h3 className="group-suggestion-box">제안 값 : {suggestion}</h3>
    </div>
  );
}

export default Suggestion;
