import React from 'react'
import {View,Text,Button} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import List from './List'
import Temp from './Temp'
import {Day,Month,mode,k2f,today,iconOf} from '../Util'
import Constant from '../Constant'
import Country from '../Country'
import Style from '../Style'

const toDate = dt=>{
  if (typeof(dt)==='number') {
    const d = new Date(dt*1000)
    return `${d.getDate()} ${Month[d.getMonth()].slice(0,3)} ${d.getFullYear()}, ${Day[d.getDay()].slice(0,3)}`
  }
  return ''
}

export default function Main(props) {

  const [coord,setCoord] = React.useState()
  const [city,setCity] = React.useState()
  const [country,setCountry] = React.useState()
  const [position,setPosition] = React.useState()
  const [message,setMessage] = React.useState()
  const [data,setData] = React.useState()
  const [list,setList] = React.useState([])
  const [celcius,setCelcius] = React.useState(false)

  const aggregate = list=>{
    if (Array.isArray(list)&&list.length>0) {
      const a = []
      list.forEach(e=>{
        const {dt,main,weather} = e
        const {temp_min,temp_max} = main
        const date = toDate(dt)
        const index = a.findIndex(e=>e.date===date)
        if (index>=0) {
          a[index].min.push(temp_min)
          a[index].max.push(temp_max)
          weather.push(weather[0].main)
        } else {
          a.push({date,min:[temp_min],max:[temp_max],weather:[weather[0].main]})
        }
      })
      return a.map(e=>{
        const {date,min,max,weather} = e
        const range = {
          min: Math.min(...min),
          max: Math.max(...max),
        }
        return {date,range,weather:mode(weather)}
      })
    }
    return []
  }

  const forecast = (lat,lon)=>{
    const {appId} = Constant
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appId}`

    fetch(url).then(res=>res.json()).then(data=>{
      setData(data)
      if (typeof(data)==='object'&&data!==null) {
        const {coord,city,list} = data

        if (typeof(coord)==='object'&&coord!==null) {
          setCoord(coord)
        }

        if (typeof(city)==='string'&&city.length>0&&city!=='none') setCity(city)
        else if (typeof(city)==='object'&&city!==null) {
          const {name,coord,country} = city
          if (typeof(name)==='string'&&name.length>0&&name!=='none') {
            setCity(name)
          }
          if (typeof(coord)==='object'&&coord!==null) {
            setCoord(coord)
          }
          if (typeof(country)==='string'&&country.length>0) {
            setCountry(Country[country])
          }
        }

        if (Array.isArray(list)&&list.length>0) {
          setList(aggregate(list))
        }
      }
    }).catch(e=>{
      setMessage(`${e}`)
    })
  }

  React.useEffect(()=>{;
    if (typeof(position)==='object'&&position!==null) {
      const {coords} = position
      if (typeof(coords)==='object'&&coords!==null) {
        const {latitude,longitude} = coords
        if (typeof(latitude)==='number'&&typeof(longitude)==='number') {
          forecast(latitude,longitude)
        }
      }
    } else {
      try {
        Geolocation.getCurrentPosition(position=>{
          setPosition(position)
        }, err=>{
          const {message} = err
          setMessage(message)
        }, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 1000,
        })
      } catch(err) {
        console.warn(err);
      }
    }
  }, [position])

  const renderItem = e=>{
    const {date,range,weather} = e
    const {min,max} = range
    return (
      <View style={[Style.p2,Style.borderTop]}>
        <View style={Style.row}>
          <View>
            <Text style={[Style.fontWeightBold]}>{date}</Text>
            <View style={Style.row}>
              <Temp onPress={toggle} value={min} celcius={celcius} style={[Style.fontWeightBold,Style.textBlack50]} />
              <Text> - </Text>
              <Temp onPress={toggle} value={max} celcius={celcius} style={[Style.fontWeightBold,Style.textBlack50]} />
            </View>
            {false&&<Text style={[Style.fontWeightBold,Style.textBlack50]}>{range}</Text>}
            <Text style={Style.textBlack50}>{iconOf(weather)} {weather}</Text>
          </View>
          <View><Text style={Style.angle}>{'\u203a'}</Text></View>
        </View>
      </View>
    )
  }

  const title = ()=>{
    if (typeof(city)==='string'&&city.length>0) {
      if (typeof(country)==='string'&&country.length>0) {
        return `${city}, ${country}`
      }
      return `${city}`
    }
    if (typeof(country)==='string'&&country.length>0) {
      return `${country}`
    }
    if (typeof(coord)==='object'&&coord!==null) {
      const {lat,lon} = coord
      return `${lat}, ${lon}`
    }
    return `Weather`
  }

  const toggle = e=>{
    setCelcius(!celcius)
  }

  const renderTemp = ()=>{
    if (typeof(data)==='object'&&data!==null) {
      const {list} = data
      if (Array.isArray(list)&&list.length>0) {
        const {main,weather} = list[0]
        const {temp} = main
        return (
          <Temp style={[Style.temp,Style.mb0]} value={temp} celcius={celcius} onPress={toggle} />
        )
      }
    }
    return null
  }

  const weather = ()=>{
    if (typeof(data)==='object'&&data!==null) {
      const {list} = data
      if (Array.isArray(list)&&list.length>0) {
        const {weather} = list[0]
        if (Array.isArray(weather)&&weather.length>0) {
          const {main} = weather[0]
          if (typeof(main)==='string'&&main.length>0) {
            return `${iconOf(main)} ${main}`
          }
        }
      }
    }
    return ''
  }

  return (
    <View style={Style.container}>
      <View style={[{backgroundColor:'orangered',alignSelf:'stretch',alignItems:'center'}]}>
        <Text style={[Style.title]}>{title()}</Text>
      </View>
      <View style={[Style.content]}>
        <Text style={[Style.datetime,Style.mb1]}>{today()}</Text>
        {renderTemp()}
        <Text style={[Style.weather,Style.mb2]}>{weather()}</Text>

        <View style={[Style.block,Style.ps1]}>
          <List value={list} renderItem={renderItem} />
        </View>

        {message&&<View>
          <Text style={[Style.danger,Style.mb2]}>{message}</Text>
          <View style={[Style.border,Style.rounded,Style.shadow]}>
            <Button onPress={e=>setPosition(Date.now())} title={`\u27f3 Reload`} />
          </View>
        </View>}
      </View>
    </View>
  )
}
