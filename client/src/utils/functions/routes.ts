import router from '@/router';
import { Routes } from '@/utils/constants';

export async function goHome() {
  if (router.currentRoute.name !== Routes.Home.name) {
    await router.push({ name: Routes.Home.name });
  }
}

export async function goTop() {
  if (router.currentRoute.name !== Routes.Top.name) {
    await router.push({ name: Routes.Top.name });
  }
}

export async function goMe() {
  if (router.currentRoute.name !== Routes.Me.name) {
    await router.push({ name: Routes.Me.name });
  }
}
