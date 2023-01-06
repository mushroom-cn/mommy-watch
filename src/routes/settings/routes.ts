import { routeScreenRegister } from '../stackRegister';
import { AboutMe } from './AboutMe';
import { ConfigFilePath } from './ConfigDetail';
import { ChangeLanguageDetails } from './Languge';

export const routes = {
  changeLanguageDetail: {
    name: 'changeLanguageDetail',
    component: ChangeLanguageDetails,
  },
  configDetail: {
    name: 'config!detail',
    component: ConfigFilePath,
  },
  aboutMe: {
    name: 'aboutMe',
    component: AboutMe,
  },
};
routeScreenRegister.register(
  routes.changeLanguageDetail.name,
  routes.changeLanguageDetail.component
);
routeScreenRegister.register(
  routes.configDetail.name,
  routes.configDetail.component
);
routeScreenRegister.register(routes.aboutMe.name, routes.aboutMe.component);
