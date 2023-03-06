import { NextApiRequest } from "next";
import { ScopeType } from "./scope";

export const checkOwnerAndRepo = (query: NextApiRequest['query']) => {
  const { owner, repo } = query;
  if (!owner) throw Error('without owner');
  if (repo) return ScopeType.REPO;
  return ScopeType.USER;
}

export const checkQuery = (query: NextApiRequest['query']) => {
  try {
    const scope = checkOwnerAndRepo(query);
    console.log("✅ scope:", scope)
  } catch(err: any) {
    console.log("❌ ERROR:", err.message);
  }
}


