export function generatePhotoRequestURL(url, page, perPage, ...args) {
  return `${url}?page=${page}&per+page=${perPage}`;
}
