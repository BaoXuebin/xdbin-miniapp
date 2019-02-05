import { fetch, flatCondition } from './req';

const baseUrl = 'https://xdbin.com/api/v1/miniapp';

export const login = code => fetch(`${baseUrl}/login?code=${code}`, 'post');
export const collect = condition => fetch(`${baseUrl}/collect?${flatCondition(condition)}`, 'post');