import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HighchartsOfficial from 'highcharts-react-official';
import Highcharts from 'highcharts';
// import config from '../config';

const Charts = () => {
  const [departmentInfo, setDepartmentInfo] = useState({});
  const apiUrl = `https://mern-app-cv74.onrender.com/projectDetails/departmentInfo`;
  const getDepartmentWiseData = async() => {
    try{
      let res = await axios.get(apiUrl);
      setDepartmentInfo(res.data);
    }catch(err){
      console.log(err)
    }
  }

  const successPercentage =
  departmentInfo.departments &&
  departmentInfo.totalClosed &&
  departmentInfo.totalRegistered &&
  departmentInfo.departments.map((department, index) => ({
      name: department,
      y: (departmentInfo.totalClosed[index] / departmentInfo.totalRegistered[index]) * 100,
    }));

  const chartOptions = {
    chart: {
      type: 'column',
      spacing: [30, 30, 30, 30]
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: departmentInfo?.departments,
      labels: {
        formatter: function () {
          const index = this.pos;
          const successPercent = successPercentage[index].y;
          const departmentName = this.value;
          return `<span style="font-weight: bold; fontSize: 16px">${successPercent.toFixed(0)}%</span><br/><span style="fontSize: 15px">${departmentName}</span>`;
        },
      },
      lineColor: 'gray',
      lineWidth: 2,
    },
    yAxis: [
      {
        gridLineWidth: 0,
        tickLength: 0,
        lineColor: 'gray',
        lineWidth: 2,
      },
      {
        title: {
          text: '',
        },
        labels: {
          format: '{value}',
        },
      },
      {
        title: {
          text: '',
        }
      },
    ],
    series: [
      {
        name: 'Total',
        data: departmentInfo?.totalRegistered,
        color: 'blue',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: 'black',
          },
        },
      },
      {
        name: 'Closed',
        data: departmentInfo?.totalClosed,
        color: 'green',
        dataLabels: {
          enabled: true,
          format: '{point.y}',
          style: {
            color: 'black',
          },
        },
      },
    ],
  };

  useEffect(()=>{
    getDepartmentWiseData();
  }, []);



  return (
    <div className='chart-div'>
      <div className="shadow p-3 mb-5 bg-white rounded-3">
        {successPercentage ? (
          <HighchartsOfficial
            highcharts={Highcharts}
            options={chartOptions}
            containerProps={{ style: { height: '400px' } }}
          />
        ) : (
          <div>please wait...</div>
        )}
      </div>
    </div>
  );
};

export default Charts