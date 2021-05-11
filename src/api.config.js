const MOCK_SERVICE = 'https://my-json-server.typicode.com/sanidhyatandon/blustacks-server';

const defaultValues = {
  retry: 0,
  interval: 0,
  timeout: 2000
};

const appPath = 'https://www.flickr.com/services/rest/';

const apiKey = '83a1eebf8fe298813824d11d885af847';

//www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=83a1eebf8fe298813824d11d885af847&per_page=10&page=1&format=json&nojsoncallback=1

https: const config = {
  // Current User
  getPhotos: {
    ...defaultValues,
    url: `${appPath}?method=flickr.photos.getRecent&api_key=${apiKey}`
  },
  getImage: {},
  searchPhotos: {}
};

export default config;
