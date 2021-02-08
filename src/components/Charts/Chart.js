import React, {useEffect, useState} from 'react'
import { Line,Bar } from 'react-chartjs-2';
import {getDailyStatus} from '../../Api';
import styles from './Chart.module.css'
const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

    const [daily,setdaily]=useState([]);
    useEffect(
      () =>{
       async function forData(){
        const myData = await getDailyStatus();
       // console.log(myData);
        //const holdData=myData.data;
        setdaily(myData)
  
       }//forData end
       forData();
      } ,[]
    ); //useEffect end
  //console.log(daily);

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    daily[0] ? (
      <Line
        data={{
          labels: daily.map(({ date }) => date),
          datasets: [{
            data: daily.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: daily.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return(
        <div className={styles.container}>
      {country ? barChart : lineChart}
       {/* <p>{lineChart}</p> */}
     {/* <p>{barChart}</p> */}
       </div>

    )
}
export default Chart;