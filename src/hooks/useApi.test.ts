import { renderHook } from '@testing-library/react-hooks';
import { useApi } from './useApi';

jest.mock('isomorphic-fetch');

describe('useApi', () => {
  beforeEach(() => {
    const mockSuccessResponse = { data: 'mock data' };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    (global as any).fetch = jest
      .fn()
      .mockImplementation(() => mockFetchPromise);
  });
  test('useApi should return loading, error, and data state', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi('search query', 1, 'stars')
    );
    expect(result.current).toEqual([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toEqual([false, null, { data: 'mock data' }]);
  });

  test('useApi should handle fetch errors', async () => {
    const mockError = new Error('fetch error');
    (global as any).fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(mockError));

    const { result, waitForNextUpdate } = renderHook(() =>
      useApi('search query', 1, 'stars')
    );
    expect(result.current).toEqual([true, null, null]);
    await waitForNextUpdate();
    expect(result.current).toEqual([false, mockError, null]);
  });

  test('useApi should not fetch data if the search query is too short', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApi('se', 1, 'stars')
    );
    expect(result.current).toEqual([false, null, null]);
    expect(result.current).toEqual([false, null, null]);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
