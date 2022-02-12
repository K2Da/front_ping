export function sha1(txt: string): string {
  // @ts-ignore
  return SHA1.createHash().update(txt).digest("hex");
}

export function get_param_hash(func_param: string|null, key_name: string): string|null {
  return func_param || new URLSearchParams(window.location.search).get(key_name)
}
