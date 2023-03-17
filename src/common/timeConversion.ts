export const metricsRangeCalculation = (monthNum: number) =>{
  if(monthNum % 12 === 0) {
    const yearNum = monthNum / 12;
    return `${yearNum} year${yearNum > 1 ?  "s" : ''}`
  }
  return `${monthNum} month${monthNum > 1 ?  "s" : ''}`
}
