import React from 'react'
import {View,Text} from 'react-native'

export default function List(props) {
  const {value,renderItem} = props
  if (Array.isArray(value)&&value.length>0&&typeof(renderItem)==='function') {
    return (
      <View style={{alignSelf:'stretch'}}>
        {
          value.map((e,i)=>(
            <View style={{alignSelf:'stretch'}} key={i}>{renderItem(e)}</View>
          ))
        }
      </View>
    )
  }
  return null
}
