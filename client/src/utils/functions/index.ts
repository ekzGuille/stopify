export function getUrlData(key: string): string {
  const data = new URLSearchParams(window.location.search).get(key) || '';
  localStorage.removeItem(key);
  if (data) {
    localStorage.setItem(key, data);
  }
  return data;
}

export function getTime(milliseconds?: boolean): number {
  if (milliseconds) {
    return Date.now();
  }
  return ~~(Date.now() / 1000);
}

export function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function lengthNormalizer(str = '', _offset = 40) {
  console.log(_offset);
  const _str = str.trim();
  const strLength = _str.length;
  const extraLength = _offset - strLength;
  if (extraLength < 0) {
    const newStr = _str.slice(0, extraLength - 3).trim();
    return newStr.padEnd(newStr.length + 3, '...');
  }
  return _str;
}
