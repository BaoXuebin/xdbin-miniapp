import { fetch, flatCondition } from './req';

const baseUrl = 'https://xdbin.com/api/v1/note';

export const fetchPubNotes = condition => fetch(`${baseUrl}?${flatCondition(condition)}`);
export const saveOrUpdateNote = condition => fetch(baseUrl, 'post', condition, {
  method: 'post'
});