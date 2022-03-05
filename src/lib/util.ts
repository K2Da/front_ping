// const CDN_DATA = "https://dfxbbu1v7k99l.cloudfront.net/003"
const LOCAL_DATA = "https://dfxbbu1v7k99l.cloudfront.net/003"
const CDN_DATA = "https://dfxbbu1v7k99l.cloudfront.net/003"

export function fetch_data(path: string): Promise<Response> {
  const data_host = window.location.host.includes('localhost') ? LOCAL_DATA : CDN_DATA
  return fetch(`${data_host}/${path}`)
}

export function sha1(txt: string): string {
  // @ts-ignore
  return SHA1.createHash().update(txt).digest("hex");
}

export function get_param_hash(func_param: string|null, key_name: string): string|null {
  return func_param || new URLSearchParams(window.location.search).get(key_name)
}
