
import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: '896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043',
});

export const getThumbs = (page) => api.photos.list({
  page: page,
  perPage: 30,
}).then(result => result.response).then(res => res);

export const getPhoto = (id) => api.photos.get({
  photoId: id
}).then(result => result.response).then(res => res);