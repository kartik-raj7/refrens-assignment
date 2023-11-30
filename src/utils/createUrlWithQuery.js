const createUrlWithQuery = (baseUrl, endpoint, data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Data must be an object");
  }
  if (endpoint == "/episode") {
    if (data.episodes) {
      return `${baseUrl}${endpoint}/${data?.episodes?.join(",")}`;
    }
  }
  if (endpoint == "/location") {
    if (data.character) {
      return `${baseUrl}${endpoint}/${data?.character}`;
    } else if (!data.page) {
      return `${baseUrl}${endpoint}/`;
    }
  }
  const queryParams = Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
  return `${baseUrl}${endpoint}?${queryParams}`;
};
export default createUrlWithQuery;
