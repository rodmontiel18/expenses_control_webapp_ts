/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Chart from 'chart.js';

interface ChartOptions {
  chartColors: Chart.ChartColor;
  chartLabels: string[];
  chartType: string;
  chartValues: number[];
  title: string;
}

const CreateChart = (chartOptions: ChartOptions) => {
  const myChartRef = useRef<Chart | null>(null);

  const formatData = (chartOptions: ChartOptions): Chart.ChartData => ({
    labels: chartOptions.chartLabels,
    datasets: [
      { data: chartOptions.chartValues, backgroundColor: chartOptions.chartColors, label: chartOptions.title },
    ],
  });

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.data = formatData(chartOptions);
      myChartRef.current.update();
    }
  }, [chartOptions]);

  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      myChartRef.current = new Chart(ctx, {
        type: chartOptions.chartType,
        data: formatData(chartOptions),
        options: {
          scales: {
            yAxes: [
              {
                offset: true,
              },
            ],
          },
        },
      });
    }
  };

  return <canvas ref={canvasCallback} height="400" width="400" />;
};

CreateChart.propTypes = {
  chartColors: PropTypes.array,
  chartLabels: PropTypes.array.isRequired,
  chartType: PropTypes.string.isRequired,
  chartValues: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default React.memo(CreateChart);
