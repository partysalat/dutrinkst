module.exports = {
  assets: {
    baseUrl: {
      $filter: 'stage',
      $default: 'https://d2bd4hfewq4seu.cloudfront.net',
      offline: 'http://localhost:9211',
    },
  },
};

