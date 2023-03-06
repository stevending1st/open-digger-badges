export enum ScopeType {
  USER = 'user',
  REPO = 'repo',
}

export const metricScope = {
  openrank: [ScopeType.REPO, ScopeType.USER],
  activity: [ScopeType.REPO, ScopeType.USER],
  attention: [ScopeType.REPO],
  stars: [ScopeType.REPO],
}