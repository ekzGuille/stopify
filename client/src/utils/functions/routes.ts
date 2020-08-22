import router from '@/router';

export async function goHome() {
  if (router.currentRoute.name !== 'Home') {
    await router.push({ name: 'Home' });
  }
}

/**
 * @deprecated
 */
export function foo() {
  console.log('bar');
}
