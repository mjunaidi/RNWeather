import React from 'react'
import {TouchableOpacity,Text} from 'react-native'
import {k2c,k2f} from '../Util'

const fontSizeFrom = (style)=>{
  if (Array.isArray(style)&&style.length>0) {
    for (let i=0;i<style.length;i++) {
      const {fontSize} = style[i]
      if (typeof(fontSize)==='number'&&fontSize>0) {
        return fontSize
      }
    }
  }
  return 14
}

export default function Temp(props) {
  const {style,onPress,value,celcius=false} = props
  const fontSize = fontSizeFrom(style)*2/3

  if (celcius) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={style}>
          <Text>{k2c(value)}</Text>
          <Text style={{fontSize}}> °C</Text>
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>
        <Text>{k2f(value)}</Text>
        <Text style={{fontSize}}> °F</Text>
      </Text>
    </TouchableOpacity>
  )
}
