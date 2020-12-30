function getHashedUrlParams(): URLSearchParams {
  return (new URLSearchParams(window.location.hash.split('?')[1]));
}

export function getUrlData(key: string): string {
  const data = getHashedUrlParams().get(key) || '';
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

export function lengthNormalizer(str = '', offset = 40) {
  const trimmedStr = str.trim();
  const strLength = trimmedStr.length;
  const extraLength = offset - strLength;
  if (extraLength < 0) {
    const newStr = trimmedStr.slice(0, extraLength - 3).trim();
    return newStr.padEnd(newStr.length + 3, '...');
  }
  return trimmedStr;
}
