export const Day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function today() {
  const d = new Date()
  return `${Day[d.getDay()].slice(0,3)}, ${d.getDate()} ${Month[d.getMonth()].slice(0,3)} ${d.getFullYear()} ${`0${d.getHours()}`.slice(-2)}:${`0${d.getMinutes()}`.slice(-2)} ${d.getHours()<12?'AM':'PM'}`
}

export function iconOf(s) {
  if (typeof(s)==='string'&&s.length>0) {
    if (/thunderstorm/i.test(s)) {
      if (/rain/i.test(s)) {
        return '\u26c8'
      }
      return '\u{1f329}'
    }
    if (/drizzle/i.test(s)) {
      return '\u{1f327}'
    }
    if (/rain/i.test(s)) {
      return '\u{1f327}'
    }
    if (/snow/i.test(s)) {
      return '\u{1f328}'
    }
    if (/sleet/i.test(s)) {
      return '\u{1f328}'
    }
    if (/mist/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/smoke/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/haze/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/sand/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/dust/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/whirls/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/fog/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/ash/i.test(s)) {
      return '\u{1f32b}'
    }
    if (/squalls/i.test(s)) {
      return '\u{1f32c}'
    }
    if (/tornado/i.test(s)) {
      return '\u{1f32a}'
    }
    if (/clear/i.test(s)) {
      return '\u{1f31e}'
    }
    if (/clouds/i.test(s)) {
      return '\u26c5'
    }
    if (/storm/i.test(s)) {
      return '\u26c8'
    }
    if (/hurricane/i.test(s)) {
      return '\u26c8'
    }
    if (/cold/i.test(s)) {
      return '\u26c4'
    }
    if (/hot/i.test(s)) {
      return '\u{1f31e}'
    }
    if (/windy/i.test(s)) {
      return '\u{1f32c}'
    }
    if (/hail/i.test(s)) {
      return '\u{1f328}'
    }
    if (/calm/i.test(s)) {
      return '\u26c5'
    }
    if (/breeze/i.test(s)) {
      return '\u{1f32c}'
    }
    if (/gale/i.test(s)) {
      return '\u{1f38f}'
    }
  }
  return ''
}

export function mode(arr){
  return arr.sort((a,b)=>arr.filter(v=>v===a).length-arr.filter(v=>v===b).length).pop()
}

// kelvin to celcius
// 0K − 273.15 = -273.1°C
export const k2c = n=>{
  if (typeof(n)==='number') {
    return `${(n-273.15).toFixed(1)}`
  }
  return ''
}

//kelvin to fahrenheit
//(0K − 273.15) × 9/5 + 32 = -459.7°F
export const k2f = n=>{
  if (typeof(n)==='number') {
    return `${((n-273.15)*9/5+32).toFixed(1)}`
  }
  return ''
}
