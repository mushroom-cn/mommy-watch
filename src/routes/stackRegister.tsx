const screenCache: {
  routeName: string;
  component: React.ComponentType<any>;
  isNesting: boolean;
}[] = [];
export const routeScreenRegister = {
  register(
    routeName: string,
    component: React.ComponentType<any>,
    { isNesting = false }: { isNesting?: boolean } = {}
  ) {
    screenCache.push({ routeName, component, isNesting });
  },
  getRegisteredScreen() {
    return [...screenCache];
  },
};
