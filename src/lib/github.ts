import { Octokit } from "@octokit/rest"

let octokitInstance: Octokit | null = null

export function getOctokit(): Octokit {
  if (octokitInstance) return octokitInstance
  
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set")
  }
  
  octokitInstance = new Octokit({ auth: token })
  return octokitInstance
}

export async function getRepoInfo(owner: string, repo: string) {
  const octokit = getOctokit()
  const { data } = await octokit.rest.repos.get({ owner, repo })
  return data
}

export async function getFileContent(owner: string, repo: string, path: string, ref?: string) {
  const octokit = getOctokit()
  const { data } = await octokit.rest.repos.getContent({ owner, repo, path, ref })
  if ("content" in data && data.content) {
    return Buffer.from(data.content, "base64").toString("utf-8")
  }
  throw new Error("Not a file or empty content")
}

export async function createOrUpdateFile(
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string,
  branch: string,
  sha?: string
) {
  const octokit = getOctokit()
  const { data } = await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: Buffer.from(content).toString("base64"),
    branch,
    sha,
  })
  return data
}

export async function createPullRequest(
  owner: string,
  repo: string,
  title: string,
  body: string,
  head: string,
  base: string
) {
  const octokit = getOctokit()
  const { data } = await octokit.rest.pulls.create({ owner, repo, title, body, head, base })
  return data
}

export async function getDefaultBranch(owner: string, repo: string): Promise<string> {
  const repoInfo = await getRepoInfo(owner, repo)
  return repoInfo.default_branch
}
