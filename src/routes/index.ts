import { Home } from './home';
import { Settings } from './settings';
import { Welcome } from './welcome';

export const routes = {
  home: {
    id: 'home',
    name: 'homeTabTitle',
    component: Home,
  },
  welcome: {
    id: 'welcome',
    name: 'welcomeTabTitle',
    component: Welcome,
  },
  settings: {
    id: 'settings',
    name: 'settingTabTitle',
    component: Settings,
  },
};
