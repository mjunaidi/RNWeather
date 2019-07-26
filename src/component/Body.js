import React from 'react'
import {StatusBar,SafeAreaView,StyleSheet,View} from 'react-native'
import Main from './Main'

export default function Body(props) {

  const style = {
    flex: 1,
    backgroundColor: 'black',
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <View style={style}>
        <Main />
      </View>
    </>
  )
}
