import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import root ngModule
import RootModule from './app/root.module';

if (process.env.ENV === 'build') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(RootModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}