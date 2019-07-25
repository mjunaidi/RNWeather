export const Day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
