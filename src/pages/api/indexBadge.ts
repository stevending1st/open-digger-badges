// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { makeBadge } from 'badge-maker'
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import { indexFilter } from '@/common/filter';
import { BadgeStyleType } from '@/common/badgeStyle';
import { getIndexBadgeSVG } from '@/common/getBadges';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Content-Type", "image/svg+xml");
  let svg = '';
  try {
    const { owner, repo, metric, month, labelColor, color, badgeStyle } = checkQuery(req.query);
    const batchMetricsData = await fetchBatchMetricsData({ owner, repo, metric })
    const re = indexFilter(batchMetricsData[metric[0]], month)
    svg = getIndexBadgeSVG({
      index: metric[0],
      monthNum: month,
      message: re + '',
      labelColor,
      color,
      style: badgeStyle
    })
  } catch (err: any) {
    svg = makeBadge({
      message: 'ERR: ' + err.message,
      color: 'red',
      style: BadgeStyleType.FOR_THE_BADGE,
    });
  } finally {
    res.status(200).send(svg);
  }
}
