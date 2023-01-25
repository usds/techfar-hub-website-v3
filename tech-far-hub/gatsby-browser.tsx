export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location.pathname === "/contact/" && prevLocation && touchpointFormfbdc7110) {
    touchpointFormfbdc7110.loadHtml();
  }
};
