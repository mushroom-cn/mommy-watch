import { Home } from './home';
import { Settings } from './settings';
import { Welcome } from './welcome';

export const routes = {
  home: {
    id: 'home',
    name: 'homeTab!title',
    component: Home,
  },
  welcome: {
    id: 'welcome',
    name: 'welcomeTab!title',
    component: Welcome,
  },
  settings: {
    id: 'settings',
    name: 'settingTab!title',
    component: Settings,
  },
};
