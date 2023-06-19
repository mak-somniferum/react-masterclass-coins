import { useState } from "react";
import { useQueries } from "react-query";
import { fetchHistoDay, fetchHistoHour, fetchHistoMinute } from "./api";
import CandlestickChart from "../components/chart/CandlestickChart";
import styled from "styled-components";
import { RiLineChartLine } from "react-icons/ri";
import { TbChartCandle } from "react-icons/tb";
import LineChart from "../components/chart/LineChart";
import Loader from "../components/Loader";

const ChartBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  > div {
    display: flex;
    gap: 5px;
  }
`;

const ChartTimeBtn = styled.button<IBtnProps>`
  width: 32px;
  height: 32px;
  font-size: 12px;
  color: ${props => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  border: 0;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;

const ChartTypeBtn = styled(ChartTimeBtn)`
  font-size: 16px;
`;
interface IChartProps {
  coinId: string;
}

interface IBtnProps {
  isActive: boolean;
  value: string;
}

function Chart({ coinId }: IChartProps) {
  const [requestedChart, setRequestedChart] = useState({ type: "candle", time: "day" });

  const result = useQueries([
    {
      queryKey: ["histoDay", coinId],
      queryFn: () => fetchHistoDay(coinId),
    },
    {
      queryKey: ["histoHour", coinId],
      queryFn: () => fetchHistoHour(coinId),
    },
    {
      queryKey: ["histoMinute", coinId],
      queryFn: () => fetchHistoMinute(coinId),
    },
  ]);

  const chartData = requestedChart.time === "day" ? result[0] : requestedChart.time === "hour" ? result[1] : requestedChart.time === "minute" ? result[2] : undefined;

  const loading = result.every(res => res.status === "loading");
  const error = result.every(res => res.status === "error");
  const success = result.every(res => res.status === "success");

  const changeType = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setRequestedChart(state => {
      return { ...state, type: value };
    });
  };

  const changeTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setRequestedChart(state => {
      return { ...state, time: value };
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        "Error"
      ) : (
        success && (
          <div>
            <ChartBtns>
              <div>
                <ChartTypeBtn isActive={requestedChart.type === "candle"} value="candle" onClick={changeType}>
                  <TbChartCandle />
                </ChartTypeBtn>
                <ChartTypeBtn isActive={requestedChart.type === "line"} value="line" onClick={changeType}>
                  <RiLineChartLine />
                </ChartTypeBtn>
              </div>

              <div>
                <ChartTimeBtn isActive={requestedChart.time === "minute"} value="minute" onClick={changeTime}>
                  M
                </ChartTimeBtn>
                <ChartTimeBtn isActive={requestedChart.time === "hour"} value="hour" onClick={changeTime}>
                  H
                </ChartTimeBtn>
                <ChartTimeBtn isActive={requestedChart.time === "day"} value="day" onClick={changeTime}>
                  D
                </ChartTimeBtn>
              </div>
            </ChartBtns>

            {requestedChart.type === "candle" ? <CandlestickChart data={chartData?.data} /> : requestedChart.type === "line" && <LineChart data={chartData?.data} />}
          </div>
        )
      )}
    </>
  );
}

export default Chart;
