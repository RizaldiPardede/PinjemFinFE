import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const featureGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const requiredFeature = route.data['requiredFeature'];
  const userFeatures: string[] = JSON.parse(localStorage.getItem('features') || '[]');

  if (userFeatures.includes(requiredFeature)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
