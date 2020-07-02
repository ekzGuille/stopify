export function getUrlData(key: string): string {
  const data = new URLSearchParams(window.location.search).get(key) || '';
  localStorage.removeItem(key);
  if (data) {
    localStorage.setItem(key, data);
  }
  return data;
}

export function print() {
  console.log('print');
}
