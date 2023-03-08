import { Big } from 'big.js';
import { MetricsDataType } from "./fetchData";

export const indexFilter = (data: MetricsDataType, month: number) => {
  if(month === -1){
    let result = 0;
    for(const property in data) {
      if(/\S*-raw/.test(property)) continue
      result = (new Big(result)).add(data[property]).toNumber();
    }
    return result
  } else {
    const keyOfData = Object.keys(data);
    const dataMap = new Map();
    return 0
  }
}