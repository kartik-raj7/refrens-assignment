import { config } from '../../config';
import createUrlWithQuery from '../../utils/createUrlWithQuery';
import axios from 'axios';
const {baseUrl} = config
export const axiosGet = async (endpoint,data={}) => {
  try {
  let apiUrl;
  apiUrl = createUrlWithQuery(baseUrl,endpoint,data);
  console.log(apiUrl)
  const response = await axios.get(apiUrl);
    
    return {
      status: response?.data?.status || response?.data?.[0]?.status,
      message: response?.data?.message || response?.data?.[0]?.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message || 'Something went wrong',
      data: error.response?.data || error,
    };
  }
};
