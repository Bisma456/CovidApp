import axios from 'axios'
const url='https://api.covid19api.com/' //covid api
const url2='https://covid19.mathdro.id/api' //covid api daily

export const getData=async ()=>{
    try{
        const res = await axios.get(`${url}/summary`)
        return res
    }
    catch(error){
        console.log(error)

    }
}//get data func end
export const getCountry=async ()=>{
    try{
        const res = await axios.get(`${url}/countries`)
        return res
    }
    catch(error){
        console.log(error)

    }
}//getCountry func end

export const getDailyStatus=async ()=>{
    try{
        const { data } = await axios.get(`${url2}/daily`);
  const mydaily = data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }))
  console.log(mydaily)    
  return mydaily;
      }
    catch(error){
        console.log(error)

    }
}//getDailyStatus func end

  
  export const getCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url2}/countries`);
  
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };

  export const getAllData = async (country) => {
    let changeableUrl = url2;
  
    if (country) {
      changeableUrl = `${url2}/countries/${country}`;
    }
    try {
      const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
  
      return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
      return error;
    }
  };