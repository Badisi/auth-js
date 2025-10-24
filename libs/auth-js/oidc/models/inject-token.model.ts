import type { InjectTokenPattern } from './inject-token-pattern.model';

export type InjectToken =
    | boolean
    | { include?: InjectTokenPattern; exclude?: InjectTokenPattern };
