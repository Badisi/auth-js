/* eslint-disable @typescript-eslint/naming-convention */

export enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4
}

export interface ILogger {
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
}

export class AuthLogger {
    static #logger: ILogger = console;
    static #level: LogLevel = LogLevel.ERROR;
    static #libName = '???';

    #prefixes: string[] = [];

    public constructor(prefix?: string) {
        if (prefix) {
            this.#prefixes.push(prefix);
        }
    }

    public static setLibName(value: string): void {
        this.#libName = value;
    }

    public static setLogLevel(value: LogLevel): void {
        this.#level = value;
    }

    public static setLogger(value: ILogger): void {
        this.#logger = value;
    }

    public createChild(childName: string): AuthLogger {
        const logger = new AuthLogger();
        logger.#prefixes.push(...this.#prefixes, childName);
        return logger;
    }

    public debug(...args: unknown[]): void {
        if (AuthLogger.#level >= LogLevel.DEBUG) {
            AuthLogger.#logger.debug(this.#getTitle(), ...args);
        }
    }

    public info(...args: unknown[]): void {
        if (AuthLogger.#level >= LogLevel.INFO) {
            AuthLogger.#logger.info(this.#getTitle(), ...args);
        }
    }

    public warn(...args: unknown[]): void {
        if (AuthLogger.#level >= LogLevel.WARN) {
            AuthLogger.#logger.warn(this.#getTitle(), ...args);
        }
    }

    public error(...args: unknown[]): void {
        if (AuthLogger.#level >= LogLevel.ERROR) {
            AuthLogger.#logger.error(this.#getTitle(), ...args);
        }
    }

    public getError(message: string, displayPrefix = false): Error {
        AuthLogger.#logger.error(this.#getTitle(displayPrefix), message);
        return new Error(message);
    }

    public notif(...args: unknown[]): void {
        AuthLogger.#logger.warn(this.#getTitle(false), ...args);
    }

    // --- HELPER(s) ---

    #getTitle(withPrefix = true): string {
        let title = `[${AuthLogger.#libName}]`;
        if (withPrefix) {
            title += `[${this.#prefixes.join('.')}]`;
        }
        return title;
    }
}
