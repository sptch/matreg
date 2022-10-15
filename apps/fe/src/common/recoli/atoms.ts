import { atom } from 'recoil';

// selected object state
export const selectedObjectId = atom({
  key: 'selectedObjectId',
  default: null as string | null,
});
