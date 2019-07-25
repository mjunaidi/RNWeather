import React from 'react'
import {StyleSheet,View,Text,Button} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import List from './List'
import {Day,Month,mode,k2f} from '../Util'
import Constant from '../Constant'

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
        const range = `${k2f(Math.min(...min))} - ${k2f(Math.max(...max))}`
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
        const {coord,city,country,list} = data

        if (typeof(coord)==='object'&&coord!==null) {
          setCoord(coord)
        }

        if (typeof(city)==='string'&&city.length>0&&city!=='none') setCity(city)
        else if (typeof(city)==='object'&&city!==null) {
          const {name,coord} = city
          if (typeof(name)==='string'&&name.length>0&&name!=='none') {
            setCity(name)
          }
          if (typeof(coord)==='object'&&coord!==null) {
            setCoord(coord)
          }
        }

        if (typeof(country)==='string'&&country.length>0&&country!=='none') setCountry(country)
        else if (typeof(country)==='object'&&country!==null) {
          const {name} = country
          if (typeof(name)==='string'&&name.length>0&&name!=='none') {
            setCountry(name)
          }
        }

        if (Array.isArray(list)&&list.length>0) {
          setList(aggregate(list))
          //setList(list.slice(0,2))
          //setList([list[0]])
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
    const Style = StyleSheet.create({
      container: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'gray',
      },
      fontWeightBold: {
        fontWeight: 'bold',
      },
      textBlack50: {
        color: '#888',
      },
    })
    return (
      <View style={Style.container}>
        <Text style={[Style.fontWeightBold]}>{date}</Text>
        <Text style={[Style.fontWeightBold,Style.textBlack50]}>{range}</Text>
        <Text style={Style.textBlack50}>{weather}</Text>
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

  const datetime = ()=>{
    const d = new Date()
    return `${Day[d.getDay()].slice(0,3)}, ${d.getDate()} ${Month[d.getMonth()].slice(0,3)} ${d.getFullYear()} ${`0${d.getHours()}`.slice(-2)}:${`0${d.getMinutes()}`.slice(-2)} ${d.getHours()<12?'AM':'PM'}`
  }

  const temp = ()=>{
    if (typeof(data)==='object'&&data!==null) {
      const {list} = data
      if (Array.isArray(list)&&list.length>0) {
        const {main,weather} = list[0]
        const {temp_max} = main
        return k2f(temp_max)
      }
    }
  }

  const weather = ()=>{
    if (typeof(data)==='object'&&data!==null) {
      const {list} = data
      if (Array.isArray(list)&&list.length>0) {
        const {main,weather} = list[0]
        if (Array.isArray(weather)&&weather.length>0) {
          return weather[0].main
        }
      }
    }
  }

  const Style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
    },
    datetime: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    temp: {
      fontSize: 56,
    },
    weather: {
      fontSize: 28,
      color: 'gray',
    },
    mb1: {
      marginBottom: 8,
    },
    mb2: {
      marginBottom: 16,
    },
    mb3: {
      marginBottom: 24,
    },
    danger: {
      color: 'red'
    },
    border: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'gray',
    },
    rounded: {
      borderRadius: 8,
    },
    shadow: {
      shadowOpacity: 0.75,
      shadowRadius: 32,
      shadowColor: 'black',
      shadowOffset: {width:5,height:10},
    },
  })

  return (
    <View style={Style.container}>
      <Text style={[Style.title,Style.mb3]}>{title()}</Text>
      <Text style={[Style.datetime,Style.mb2]}>{datetime()}</Text>
      <Text style={[Style.temp,Style.mb1]}>{temp()}</Text>
      <Text style={[Style.weather,Style.mb3]}>{weather()}</Text>

      <List value={list} renderItem={renderItem} />

      {message&&<View>
        <Text style={[Style.danger,Style.mb2]}>{message}</Text>
        <View style={[Style.border,Style.rounded,Style.shadow]}>
          <Button onPress={e=>setPosition(Date.now())} title={`\u27f3 Reload`} />
        </View>
      </View>}
    </View>
  )
}
