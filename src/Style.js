import {StyleSheet} from 'react-native'

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orangered',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    padding: 8,
    fontFamily: 'Futura-CondensedMedium',
  },
  datetime: {
    fontSize: 22,
    fontFamily: 'Futura-CondensedMedium',
  },
  temp: {
    fontSize: 56,
    fontFamily: 'Futura',
  },
  weather: {
    fontSize: 28,
    color: 'gray',
    fontFamily: 'Heiti TC',
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
  borderTop: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'gray',
  },
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
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
  textWhite: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontWeightBold: {
    fontWeight: 'bold',
  },
  textBlack50: {
    color: '#888',
  },
  angle: {
    fontSize: 32,
    color: 'orangered',
  },
  block: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  p2: {
    padding: 16,
  },
  ps1: {
    paddingRight: 8,
    paddingLeft: 8,
  },
})

export default Style
