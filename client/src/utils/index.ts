export function getUrlData(key: string): string {
  const data = new URLSearchParams(window.location.search).get(key) || 'null';
  localStorage.removeItem(key);
  localStorage.setItem(key, data);
  return data;
}

export function print() {
  console.log('print');
}
