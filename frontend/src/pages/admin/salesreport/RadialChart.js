import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = () => {
    const [chartData, setChartData] = useState({
        series: [44, 55],
        options: {
            chart: {
                height: 295,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '16px',
                        },
                        value: {
                            fontSize: '12px',
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            formatter: function (w) {
                                console.log(w);
                                return 249
                            }
                        }
                    }
                }
            },
            labels: ['Product 1', 'Product 2'],
        },
    });
    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={295}  />
        </div>
    );
}

export default RadialChart;