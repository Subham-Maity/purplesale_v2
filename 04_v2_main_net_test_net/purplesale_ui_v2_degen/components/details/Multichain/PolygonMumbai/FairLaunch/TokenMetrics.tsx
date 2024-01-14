import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";
import DetailsFinishWrapper from "@/components/TailwindWrapper/Details/FinishPage";

interface TokenMetricsProps {
  labels: string[];
  data: number[];
  darkTheme: boolean;
}

const TokenMetrics: React.FC<TokenMetricsProps> = ({
  labels,
  data,
  darkTheme,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        //@ts-ignore
        chartInstanceRef.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Token Metrics",
                data: data,
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  // "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  // "rgb(75, 192, 192)",
                  "rgb(153, 102, 255)",
                  // "rgb(201, 203, 207)",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: {
                    color: darkTheme ? "white" : "black", // Set font color based on theme
                  },
                },
              },
            },
          },
        } as ChartConfiguration<"doughnut">);
      }
    }
  }, [labels, data, darkTheme]);

  return (
    <DetailsFinishWrapper>
      <h1 className="text-xl font-bold dark:text-gray-200 text-gray-300">
        Token Metrics
      </h1>
      <hr className="mt-8 mb-8 h-px mx-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div>
        <canvas ref={chartRef} />
      </div>
    </DetailsFinishWrapper>
  );
};

export default TokenMetrics;
