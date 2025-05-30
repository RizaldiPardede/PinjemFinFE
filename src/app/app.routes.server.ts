import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'resetpassword/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams() {
      return Promise.resolve([]);
    }
     // ✅ fix ini
  },
];
