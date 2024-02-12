// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    expect(axios.create).toHaveBeenCalledWith({ baseURL: 'https://jsonplaceholder.typicode.com' });
  });
  
  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    throttledGetDataFromApi(relativePath);
    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });
  
  test('should return response data', async () => {
    jest.mock('axios');
    const relativePath = '/posts/1';
    const responseData = { id: 1, title: 'Sample Post' };
    axios.get.mockResolvedValue({ data: responseData });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseData);
  });
});
