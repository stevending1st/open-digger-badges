// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { makeBadge } from 'badge-maker'
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import { indexFilter } from '@/common/filter';
import { BadgeStyleType } from '@/common/badgeStyle';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    res.setHeader("Content-Type", "image/svg+xml");
    const { owner,repo, metrics, month, badgeStyle } = checkQuery(req.query);
    const batchMetricsData = await fetchBatchMetricsData({owner,repo, metrics})
    const re = indexFilter(batchMetricsData[metrics[0]], month)
    const svg = makeBadge({
      label: metrics[0],
      message: re.toString(),
      style: badgeStyle
    })
    res.status(200).send(svg);
  } catch (err: any) {
    res.setHeader("Content-Type", "image/svg+xml");
    const svg = makeBadge({
      message: 'ERR: ' + err.message,
      color: 'red',
      style: BadgeStyleType.FOR_THE_BADGE,
    });
    res.status(200).send(svg);
  }
}
