import { NextApiRequest } from "next";
import { metricScope, ScopeType } from "./scope";

export const checkOwnerAndRepo = (query: NextApiRequest['query']) => {
  const { owner, repo } = query;
  if (!owner) throw Error('without owner');
  if (repo) return ScopeType.REPO;
  return ScopeType.USER;
}

export const scopeCheck = (scope: ScopeType, query: NextApiRequest['query']) => {
  const { metric } = query;
  if(!metric) throw Error('without metric')
  const metricArr = typeof metric === 'string' ? metric.split(",") : metric;
  const metricNotInScope = metricArr.reduce<string[]>((pre, cur) => {
    const currentScope = metricScope[cur.toLocaleLowerCase() as keyof typeof metricScope]
    if(!currentScope) return [...pre, cur];
    if(!currentScope.includes(scope)) return [...pre, cur];
    return pre;
  } , [])
  if(metricNotInScope.length > 0) throw Error(`${metricNotInScope.join(",")} isn't in scope`)
  return metricArr;
}

export const checkQuery = (query: NextApiRequest['query']) => {
  try {
    const scope = checkOwnerAndRepo(query);
    const metricArr = scopeCheck(scope, query);
    console.log("✅ metricArr:", metricArr.join(","))
  } catch(err: any) {
    console.log("❌ ERROR:", err.message);
  }
}


