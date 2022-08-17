export type ClassVars<
  T extends {
    game?: Record<string, any>;
    player?: Record<string, any>;
    instance?: Record<string, any>;
    actions?: Record<string, (...args: any[]) => void>;
  } = Record<never, never>
> = {
  game: T['game'] extends Record<string, any>
    ? T['game']
    : Record<never, never>;
  player: T['player'] extends Record<string, any>
    ? T['player']
    : Record<never, never>;
  instance: T['instance'] extends Record<string, any>
    ? T['instance']
    : Record<never, never>;
  actions: T['actions'] extends Record<string, (...args: any[]) => void>
    ? T['actions']
    : undefined;
};
