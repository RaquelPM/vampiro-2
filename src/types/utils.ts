import { ClassKeys } from '~/game';
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type classActiveListType = Partial<Record<ClassKeys, boolean>>;
