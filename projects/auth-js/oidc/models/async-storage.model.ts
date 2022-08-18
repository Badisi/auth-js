export interface AsyncStorage {
    length: () => Promise<number>;
    key: (index: number) => Promise<string | null>;
    clear: () => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}
