import { ComponentsData, Game } from '..';

export type ComponentData<
  T extends {
    props?: Record<string, any>;
    controller?: Record<string, any>;
  }
> = {
  props: T['props'] extends Record<string, any>
    ? T['props']
    : Record<never, never>;
  controller: T['controller'] extends Record<string, any>
    ? T['controller']
    : undefined;
};

export type ComponentsProps = {
  [Property in keyof ComponentsData]?: ComponentsData[Property]['props'];
};

export type Component<K extends keyof ComponentsData> = (
  props: ComponentsData[K]['props'] & { game: Game }
) => JSX.Element;

export type ComponentController<K extends keyof ComponentsData> =
  ComponentsData[K]['controller'] extends undefined
    ? undefined
    : (game: Game) => ComponentsData[K]['controller'];
