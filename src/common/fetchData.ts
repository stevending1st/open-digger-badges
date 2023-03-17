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
}

export type FetchBatchMetricsDataInputType = Omit<FetchMetricsDataInputType, 'metric'> & {
  metrics: string[]
}

export const fetchMetricsData = async ({ owner, repo, metric }: FetchMetricsDataInputType) => {
  const json = await fetch(`https://oss.x-lab.info/open_digger/github/${owner}/${!repo ? '' : repo + '/'}${metric}.json`);
  const result = await json.json();
  return result
}

export const fetchBatchMetricsData = async ({ owner, repo, metrics }: FetchBatchMetricsDataInputType) => {
  let resultBatchData: BatchMetricsDataInputType = {};
  for (let metric of metrics) {
    const result = await fetchMetricsData({ owner, repo, metric})
    resultBatchData = {...resultBatchData, [metric]: result}
  }
  return resultBatchData;
}
