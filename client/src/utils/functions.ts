export function getUrlData(key: string): string {
  const data = new URLSearchParams(window.location.search).get(key) || '';
  localStorage.removeItem(key);
  if (data) {
    localStorage.setItem(key, data);
  }
  return data;
}

export function getTime(miliseconds?: boolean) {
  if (miliseconds) {
    return Date.now();
  }
  return ~~(Date.now() / 1000);
}
