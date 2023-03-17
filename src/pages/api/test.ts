// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { makeBadge } from 'badge-maker'
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import { indexFilter } from '@/common/filter';
import { BadgeStyleType } from '@/common/badgeStyle';
import { metricsRangeCalculation } from '@/common/timeConversion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Content-Type", "image/svg+xml");
  try {
    const { owner,repo, metrics, month, badgeStyle } = checkQuery(req.query);
    const batchMetricsData = await fetchBatchMetricsData({owner,repo, metrics})
    const re = indexFilter(batchMetricsData[metrics[0]], month)
    const timeRange = month < -1 ? '' : month === -1 ? "all" : 'last ' + metricsRangeCalculation(month);
    const svg = makeBadge({
      label: metrics[0] + ` (${timeRange})`,
      message: re.toString(),
      style: badgeStyle
    })
    res.status(200).send(svg);
  } catch (err: any) {
    const svg = makeBadge({
      message: 'ERR: ' + err.message,
      color: 'red',
      style: BadgeStyleType.FOR_THE_BADGE,
    });
    res.status(200).send(svg);
  }
}
