import { Big } from 'big.js';
import { MetricsDataType } from "./fetchData";

export const indexFilter = (data: MetricsDataType, month: number) => {
  let result = new Big(0);
  if (month < -1) {
  } else if (month === -1) {
    for (const property in data) {
      if (/\S*-raw/.test(property)) continue
      result = result.add(data[property]);
    }
  } else {
    const dataArr = Object.entries(data)
      .filter(([key, value]) => !/\S*-raw/.test(key))
      .map(([key, value]) => ({ month: Number.parseInt(key.replace("-", "")), value }))
      .sort((a, b) => b.month - a.month);
    if(month > dataArr.length){
      for(const { value } of dataArr){
        result = result.add(value);
      }
    } else {
      for (const { value } of dataArr.slice(0, month)) {
        result = result.add(value);
      }
    }
  }
  return result.toNumber();
}

export const filterEmptyStringKey = (obj: {[key: string]: any}) =>
  Object.keys(obj).reduce((pre, key) => {
    if(obj[key] !== '') { pre[key] = obj[key]}
    return pre
  }, {} as {[key: string]: any})
