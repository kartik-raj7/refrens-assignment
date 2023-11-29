const createUrlWithQuery = (baseUrl,endpoint, data) => {
    console.log(data)
    if (!data || typeof data !== 'object') {
      throw new Error('Data must be an object');
    }
    if(endpoint=='/episode'){
      return `${baseUrl}${endpoint}/${data.episodes.join(',')}`;
    }
    if(endpoint=='/location'){
      console.log(endpoint,data)
      return `${baseUrl}${endpoint}/${data.character}`;
    }
    console.log(Object.keys(data).length);
    const queryParams = Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
        return `${baseUrl}${endpoint}?${queryParams}`;
  };
  export default createUrlWithQuery