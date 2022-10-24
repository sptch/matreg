import { atom } from 'recoil';

// selected object state
export const selectedObjectId = atom({
  key: 'selectedObjectId',
  default: null as string | null,
});
export const hoveredObjectId = atom({
  key: 'hoveredObjectId',
  default: null as string | null,
});

export const searchString = atom({
  key: 'searchString',
  default: null as string | null,
});

export const preSelectedObjects = atom({
  key: 'preSelectedObjects',
  default: null as any[] | null,
});

export const selectedObject = atom({
  key: 'selectedObject',
  default: null as any,
});

export const elements = atom({
  key: 'elements',
  default: null as any[] | null,
});
