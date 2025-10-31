import type { InjectTokenPattern } from './inject-token-pattern.model';

export type InjectToken =
    | boolean
    | {
        headerName?: string;
        include?: InjectTokenPattern;
        exclude?: InjectTokenPattern;
    };
