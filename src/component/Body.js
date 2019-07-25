import React from 'react'
import {StatusBar,SafeAreaView,StyleSheet} from 'react-native'
import Main from './Main'

export default function Body(props) {

  const style = {
    flex: 1,
    backgroundColor: 'black',
  }

  return (
    <SafeAreaView style={style}>
      <Main />
    </SafeAreaView>
  )
}
