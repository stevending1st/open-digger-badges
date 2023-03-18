import { makeBadge } from "badge-maker"
import { BadgeStyleType } from "./badgeStyle";
import { metricsRangeCalculation } from "./timeConversion";

export interface GetIndexBadgeSVGProps {
  index: string;
  monthNum?: number;
  message: string;
  labelColor?: string;
  color?: string;
  style?: BadgeStyleType;
}

export const getIndexBadgeSVG = ({
  index,
  monthNum,
  message,
  labelColor,
  color,
  style
}: GetIndexBadgeSVGProps) => {
  const timeRange = typeof monthNum === 'undefined' ? '' : monthNum < -1 ? '' : monthNum === -1 ? "all" : 'last ' + metricsRangeCalculation(monthNum);
  return makeBadge({
    label: index + `${timeRange ? ` (${timeRange})` : ''}`,
    message,
    labelColor,
    color,
    style,
  })
}
