import React, { useState, useEffect } from "react";
import { init, dispose } from "klinecharts";

import Layout from "../Layout";
import useNewData from "../hooks/useNewData";
import getInitialDataList from "../utils/getInitialDataList";
import getBeforeDataList from "../utils/getBeforeDataList";

import getLanguageOption from "../utils/getLanguageOption";

const types = [
  { key: "candle_solid", text: "캔들" },
  { key: "candle_stroke", text: "투명 캔들" },
  { key: "ohlc", text: "Bar 형식의 OHLC" },
  { key: "area", text: "Mountain" },
];

const dateDuration = [
  { key: 0, text: "1년" },
  { key: 182, text: "6개월" },
  { key: 275, text: "3개월" },
  { key: 335, text: "1개월" },
];

const CoinChart = () => {
  let chart;
  const [initialized, setInitialized] = useState(false);

  const [startDate, setStartDate] = useState(0);
  const [currentValue, setCurrentValue] = useState("");

  const newData = useNewData(setCurrentValue);

  useEffect(() => {
    chart = init("coin-chart");
    chart.setStyleOptions(getLanguageOption());
    const fetchData = async () => {
      const dataList = await getInitialDataList(1);
      const beforeDataList = await getBeforeDataList(1);
      const yearDataList = [...beforeDataList, ...dataList];
      setCurrentValue(yearDataList[364]["close"]);

      const realDataList = yearDataList.slice(startDate, 365);

      chart.applyNewData(realDataList);
      setInitialized(true);
    };
    fetchData();
    return () => {
      dispose("chart");
    };
  }, [startDate]);

  useEffect(() => {
    chart = init("coin-chart");
    if (initialized) {
      chart.updateData(newData);
    }
  }, [newData]);

  return (
    <div>
      <h4
        style={{
          width: "70%",
          marginLeft: "15%",
          marginRight: "15%",
          position: "relative",
          height: "50px",
          backgroundColor: "rgb(123, 123, 255)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid black",
        }}
      >
        현재 비트코인 가격 : {currentValue} 원
      </h4>
      <Layout title="Bitcoin(BTC-KRW) 차트">
        <div id="coin-chart" className="coin-chart" />
        <div style={{ height: "15px" }}></div>

        <div className="chart-menu-container">
          {types.map(({ key, text }) => {
            return (
              <button
                key={key}
                onClick={(_) => {
                  chart.setStyleOptions({
                    candle: {
                      type: key,
                    },
                  });
                }}
              >
                {text}
              </button>
            );
          })}
        </div>
        <div style={{ height: "15px" }}></div>

        <div className="chart-menu-container">
          {dateDuration.map(({ key, text }) => {
            return (
              <button
                key={key}
                onClick={(_) => {
                  setStartDate(key);
                }}
              >
                {text}
              </button>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default CoinChart;
