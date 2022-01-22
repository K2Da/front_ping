export function date_to_s(slim_mode: boolean, date_number: number): string {
  const date = new Date(date_number)

  if (slim_mode) {
    return `'${date.getFullYear() % 100}/${date.getMonth() + 1}/${date.getDate()}`
  } else {
    return date.toLocaleDateString()
  }
}

export function span_to_s(slim_mode: boolean, date_number1: number, date_number2: number): string {
  const date1 = new Date(date_number1)
  const date2 = new Date(date_number2)

  if (slim_mode) {
    const str1 = `'${date1.getFullYear() % 100}/${date1.getMonth() + 1}/${date1.getDate()}`
    const str2 = date1.getFullYear() == date2.getFullYear()
      ? `${date1.getMonth() + 1}/${date1.getDate()}`
      : `'${date2.getFullYear() % 100}/${date2.getMonth() + 1}/${date2.getDate()}`
    return `${str1}<br />- ${str2}`
  } else {
    return `${date1.toLocaleDateString()} 〜 ${date2.toLocaleDateString()}`
  }
}

export function sha1(txt: string): string {
  // @ts-ignore
  return SHA1.createHash().update(txt).digest("hex");
}
