import router from '@/router';

export async function goHome() {
  if (router.currentRoute.name !== 'Home') {
    await router.push({ name: 'Home' });
  }
}

export async function goTop() {
  if (router.currentRoute.name !== 'Top') {
    await router.push({ name: 'Top' });
  }
}

export async function goMe() {
  if (router.currentRoute.name !== 'Me') {
    await router.push({ name: 'Me' });
  }
}
