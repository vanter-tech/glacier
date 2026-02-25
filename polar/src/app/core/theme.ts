import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  isDarkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('glacier-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.isDarkMode.set(true);
    }

    effect(() => {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('glacier-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('glacier-theme', 'light');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}
