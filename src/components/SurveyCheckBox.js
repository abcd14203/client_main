import { useState } from "react";
import styled, { css } from "styled-components";
import "../css/App.css";

// 오지선다형 체크박스 component
export default function SurveyCheckBox({ setValue, dataList }) {
  // 다섯 선지에 대한 체크 여부 useState로 update
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);

  // 각 체크박스가 선택되었을 때 실행되는 함수들
  const onClickCheck1 = () => {
    if (!isChecked1) {
      setIsChecked1(true);
      setIsChecked2(false);
      setIsChecked3(false);
      setIsChecked4(false);
      setIsChecked5(false);
      setValue(dataList[1]["value"]);
    } else {
      setIsChecked1(false);
      setValue(dataList[0]["value"]);
    }
  };

  const onClickCheck2 = () => {
    if (!isChecked2) {
      setIsChecked1(false);
      setIsChecked2(true);
      setIsChecked3(false);
      setIsChecked4(false);
      setIsChecked5(false);
      setValue(dataList[2]["value"]);
    } else {
      setIsChecked2(false);
      setValue(dataList[0]["value"]);
    }
  };

  const onClickCheck3 = () => {
    if (!isChecked3) {
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(true);
      setIsChecked4(false);
      setIsChecked5(false);
      setValue(dataList[3]["value"]);
    } else {
      setIsChecked3(false);
      setValue(dataList[0]["value"]);
    }
  };

  const onClickCheck4 = () => {
    if (!isChecked4) {
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(false);
      setIsChecked4(true);
      setIsChecked5(false);
      setValue(dataList[4]["value"]);
    } else {
      setIsChecked4(false);
      setValue(dataList[0]["value"]);
    }
  };

  const onClickCheck5 = () => {
    if (!isChecked5) {
      setIsChecked1(false);
      setIsChecked2(false);
      setIsChecked3(false);
      setIsChecked4(false);
      setIsChecked5(true);
      setValue(dataList[5]["value"]);
    } else {
      setIsChecked5(false);
      setValue(dataList[0]["value"]);
    }
  };

  return (
    <>
      <div style={{ left: "19%", position: "relative" }}>
        <p
          style={{
            width: "15%",
            height: "10px",
            float: "left",
            top: "-15px",
            position: "relative",
          }}
        >
          매우 그렇지 않다
        </p>
        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked1} />
            <SCustomLabel onClick={onClickCheck1} isChecked={isChecked1} />
          </SCustomCheckboxWrapper>
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked2} />
            <SCustomLabel onClick={onClickCheck2} isChecked={isChecked2} />
          </SCustomCheckboxWrapper>
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked3} />
            <SCustomLabel onClick={onClickCheck3} isChecked={isChecked3} />
          </SCustomCheckboxWrapper>
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked4} />
            <SCustomLabel onClick={onClickCheck4} isChecked={isChecked4} />
          </SCustomCheckboxWrapper>
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked5} />
            <SCustomLabel onClick={onClickCheck5} isChecked={isChecked5} />
          </SCustomCheckboxWrapper>
        </div>
        <p
          style={{
            width: "15%",
            height: "10px",
            float: "left",
            top: "-15px",
            position: "relative",
          }}
        >
          매우 그렇다
        </p>
      </div>
      <div className="blank-box"></div>

      <div style={{ left: "35%", position: "relative" }}>
        <div className="blank-box"></div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "-2px",
            position: "relative",
          }}
        >
          1
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "-2px",
            position: "relative",
          }}
        >
          2
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "-2px",
            position: "relative",
          }}
        >
          3
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "-2px",
            position: "relative",
          }}
        >
          4
        </div>

        <div
          style={{
            width: "8%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "-2px",
            position: "relative",
          }}
        >
          5
        </div>
        <div className="blank-box"></div>
      </div>
    </>
  );
}

// 체크박스 design
const SCustomCheckboxWrapper = styled.div`
  position: relative;
`;

const SCustomCheckbox = styled.input`
  visibility: hidden;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

const SCustomLabel = styled.label`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  top: 0;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
            content: "";
            height: 6px;
            left: 7px;
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        `
      : css`
          background-color: #fff !important;
          &:after {
            opacity: 1;
          }
        `}
`;
