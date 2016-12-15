export default (url, { width, height }) => {
  const { open, innerWidth: screenWidth, innerHeight: screenHeight } = window;

  const left = (screenWidth / 2) - (width / 2);
  const top = (screenHeight / 2) - (height / 2);

  return open(url, 'OAuth2', `
    width=${width},
    height=${height},
    left=${left},
    top=${top},
  `);
};
