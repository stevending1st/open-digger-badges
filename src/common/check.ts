import { NextApiRequest } from "next";
import { BadgeStyleType } from "./badgeStyle";
import { metricScope, ScopeType } from "./scope";

export const checkOwnerAndRepo = (query: NextApiRequest['query']) => {
  const { owner, repo } = query;
  if (!owner) throw Error('without owner');
  if (Array.isArray(owner)) throw Error("owner cannot be an array type");
  if (Array.isArray(repo)) throw Error("owner cannot be an array type");
  if (repo) return { owner, repo, scope: ScopeType.REPO };
  return { owner, scope: ScopeType.USER };
}

export const checkMonth = (query: NextApiRequest['query']) => {
  const { month } = query;
  if(!month) return -1;
  if(Array.isArray(month)) throw Error("month cannot be an array type");
  const monthNumber = Number.parseInt(month);
  if(Number.isNaN(monthNumber)) throw Error("month must be a number");
  return monthNumber;
}

export const scopeCheck = (scope: ScopeType, query: NextApiRequest['query']) => {
  const { metric } = query;
  if (!metric) throw Error('without metric')
  const metricArr = typeof metric === 'string' ? metric.split(",") : metric;
  const metricNotInScope = metricArr.reduce<string[]>((pre, cur) => {
    const currentScope = metricScope[cur.toLocaleLowerCase() as keyof typeof metricScope]
    if (!currentScope) return [...pre, cur];
    if (!currentScope.includes(scope)) return [...pre, cur];
    return pre;
  }, [])
  if (metricNotInScope.length > 0) throw Error(`${metricNotInScope.join(",")} ${metricNotInScope.length > 1 ? 'is' : 'are'}n't in scope`)
  return metricArr;
}

export const badgeStyleCheck = (query: NextApiRequest['query']) => {
  const { badgeStyle } = query;
  if (!badgeStyle) return BadgeStyleType.PLASTIC
  if (Array.isArray(badgeStyle)) throw Error("badgeStyle cannot be an array type");
  return badgeStyle in BadgeStyleType ? badgeStyle : BadgeStyleType.FLAT
}

export const labelColorCheck = (query: NextApiRequest['query']) => {
  const { labelColor } = query;
  if (Array.isArray(labelColor)) throw Error("labelColor cannot be an array type");
  return labelColor || 'default'
}

export const colorCheck = (query: NextApiRequest['query']) => {
  const { color } = query;
  if (Array.isArray(color)) throw Error("color cannot be an array type");
  return color || 'default'
}

export const checkQuery = (query: NextApiRequest['query']) => {
  const { owner, repo, scope } = checkOwnerAndRepo(query);
  const metricArr = scopeCheck(scope, query);
  const month = checkMonth(query);
  const labelColor = labelColorCheck(query);
  const color = colorCheck(query);
  const badgeStyle = badgeStyleCheck(query);
  return { owner, repo, metrics: metricArr, month, labelColor, color, badgeStyle }
}
