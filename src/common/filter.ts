import { Big } from 'big.js';
import { MetricsDataType } from "./fetchData";

export const indexFilter = (data: MetricsDataType, month: number) => {
  if (month < -1) {
    return 0
  } else if (month === -1) {
    let result = 0;
    for (const property in data) {
      if (/\S*-raw/.test(property)) continue
      result = (new Big(result)).add(data[property]).toNumber();
    }
    return result
  } else {
    const dataMap = new Map();
    const monthArr = [];
    for (const property in data) {
      if (/\S*-raw/.test(property)) continue
      const propertyWithoutDash = property.replace("-", "")
      const monthIndex = Number.parseInt(propertyWithoutDash);
      if (Number.isNaN(monthIndex)) continue;
      dataMap.set(monthIndex, data[property])
      monthArr.push(monthIndex)
    }
    const monthArrInverted = monthArr.sort((a, b) => b - a)
    let result = 0;
    if(month > monthArrInverted.length){
      result = monthArrInverted.reduce((pre, current) => (new Big(pre)).add(dataMap.get(current)).toNumber(), 0)
    } else {
      for (let i = 0; i < month ; i++) {
        result = (new Big(result)).add(dataMap.get(monthArrInverted[i])).toNumber();
      }
    }
    return result
  }
}