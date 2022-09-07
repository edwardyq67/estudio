import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';

function App() {
  const [clima,setClima]=useState({})
  const [temp,settemp]=useState(0)
  const [cambio,setCambio]=useState(true)
  
  useEffect(()=>{
    function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=b95203633d0f67ec25ce3d9230290535`)
    .then(res=>{
      setClima(res.data)
      console.log(res.data)
      settemp(res.data.main.temp-273.15)})
      
      
  }
    
    
    navigator.geolocation.getCurrentPosition(success);
    
  },[])
  const convertHeight=()=>{
      if(cambio){
        settemp((temp* 9/5) + 32)
        setCambio(false)
      }else{
        settemp((temp-32)* 5/9)
        setCambio(true)
      }
    }
    const result=temp.toFixed(2)
  return (
    <div className="App">
      <h2><b>{clima.sys?.country},</b>{clima.name}</h2>
      <img src={`http://openweathermap.org/img/wn/${clima.weather?.[0].icon}.png`} alt="" />
      <h3>{result} {cambio? "°C":"°F"}</h3>
      <button onClick={convertHeight}>cambio</button>
    </div>
  )
}

export default App
