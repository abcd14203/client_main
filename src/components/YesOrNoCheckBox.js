import { useState } from "react";
import styled, { css } from "styled-components";
import "../css/App.css";

// 이지선다형 체크박스 component
// 구조는 오지선다형 체크박스 component와 동일
export default function YesOrNoCheckBox({ setValue, dataList }) {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const onClickCheck1 = () => {
    if (!isChecked1) {
      setIsChecked1(true);
      setIsChecked2(false);
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
      setValue(dataList[2]["value"]);
    } else {
      setIsChecked2(false);
      setValue(dataList[0]["value"]);
    }
  };

  return (
    <>
      <div style={{ left: "40%", position: "relative" }}>
        <div
          style={{
            width: "15%",
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
            width: "15%",
            height: "30px",
            float: "left",
          }}
        >
          <SCustomCheckboxWrapper>
            <SCustomCheckbox type="checkbox" isChecked={isChecked2} />
            <SCustomLabel onClick={onClickCheck2} isChecked={isChecked2} />
          </SCustomCheckboxWrapper>
        </div>
      </div>
      <div className="blank-box"></div>

      <div style={{ left: "40%", position: "relative" }}>
        <div
          style={{
            width: "15%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "4px",
            position: "relative",
          }}
        >
          Yes
        </div>

        <div
          style={{
            width: "15%",
            height: "30px",
            float: "left",
            top: "-10px",
            left: "4px",
            position: "relative",
          }}
        >
          No
        </div>
      </div>
    </>
  );
}

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
