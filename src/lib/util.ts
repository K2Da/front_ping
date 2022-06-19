const LOCAL_DATA = "/data"
// const LOCAL_DATA = "https://dfxbbu1v7k99l.cloudfront.net/008"
const CDN_DATA = "https://dfxbbu1v7k99l.cloudfront.net/036"
const WORKER_HOST = "https://back_ping.center-ping.workers.dev"

export function fetch_worker(path: string): Promise<Response> {
  return fetch(`${WORKER_HOST}/${path}`)
}

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

export function get_param(default_value: string|null, key_name: string): string|null {
  return new URLSearchParams(window.location.search).get(key_name) || default_value
}

export function days(date1: number, date2: number): number {
  return Math.floor(((date2 - date1) / 1000.0 / 60.0 / 60.0 / 24.0) + 1)
}
