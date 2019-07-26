import React from 'react'
import {TouchableOpacity,Text} from 'react-native'
import {k2c,k2f} from '../Util'

export default function Temp(props) {
  const {style,onPress,value,celcius=false} = props

  if (celcius) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={style}>{k2c(value)} °C</Text>
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={style}>{k2f(value)} °F</Text>
    </TouchableOpacity>
  )
}
