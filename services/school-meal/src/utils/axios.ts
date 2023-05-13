import axios from 'axios';

const testToken =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxYWMyODcwZi1iYTMwLTExZWQtYTUyYy0wZTk0MTc2NTg4ZjYiLCJyb2xlIjoiU0NIIiwiZXhwIjoxNjgxMzQ4ODA2LCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiYXV0aG9yaXRpZXMiOlsiU0NIIl19.pbuFeozZOiEad1ztnjXDEzSFMDFzq9kWzZdeD5WAQzw';

export const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/meals`,
    timeout: 10000,
    withCredentials: true,
});

process.env.NODE_ENV === 'development' &&
    (instance.defaults.headers.common['Authorization'] = testToken);
