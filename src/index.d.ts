/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type Nullable<T> = T | null;

interface IObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}

interface SizeStyle {
  width: number;
  height: number;
}

interface PositionStyle {
  top: number;
  left: number;
}

interface ComponentItem {
  id: string;
  label: string;
  component: string;
  sizeStyle: SizeStyle;
  positionStyle: PositionStyle;
}
