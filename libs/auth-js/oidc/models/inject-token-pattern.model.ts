export type InjectTokenPattern =
    | (string | RegExp)[]
    | ((url: string) => boolean);
