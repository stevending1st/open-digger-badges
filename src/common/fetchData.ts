import { BadgeStyleType } from "./badgeStyle";

export interface MetricsDataType {
  [key: string]: number,
}

export interface BatchMetricsDataInputType {
  [key: string]: MetricsDataType
}

export interface FetchMetricsDataInputType {
  owner: string,
  repo?: string,
  metric: string,
  badgeStyle?: BadgeStyleType,
  labelColor?: string,
  color?: string,
}

export type FetchBatchMetricsDataInputType = Omit<FetchMetricsDataInputType, 'metric'> & {
  metric: string[]
}

export const fetchMetricsData = async ({ owner, repo, metric }: FetchMetricsDataInputType) => {
  const json = await fetch(`https://oss.x-lab.info/open_digger/github/${owner}/${!repo ? '' : repo + '/'}${metric}.json`);
  const result = await json.json();
  return result
}

export const fetchBatchMetricsData = async ({ owner, repo, metric }: FetchBatchMetricsDataInputType) => {
  let resultBatchData: BatchMetricsDataInputType = {};
  for (let item of metric) {
    const result = await fetchMetricsData({ owner, repo, metric: item})
    resultBatchData = {...resultBatchData, [item]: result}
  }
  return resultBatchData;
}
