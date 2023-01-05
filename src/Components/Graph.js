import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { useTheme } from "../Context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ chartData, type }) => {
  const { theme } = useTheme();

  return (
    <div>
      <Line
            data={
                {
                    labels: chartData.map(i=>(type==='date')?(i[0].toDate().toLocaleString()):(i[0]+1)),
                    datasets: [
                        {
                            data: chartData.map(i=>i[1]),
                            label: 'wpm',
                            borderColor: theme.title,
                            tension: 0.25,
                            borderWidth: 1,
                            fill: false,
                            pointRadius: 0
                        }
                    ]
                }
            }
        >
        </Line>
    </div>
  );
};

export default Graph;
