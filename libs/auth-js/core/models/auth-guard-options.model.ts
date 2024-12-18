import type { AuthGuardValidator } from './auth-guard-validator.model';

export interface AuthGuardOptions {
    validator?: AuthGuardValidator;
    fallbackUrl?: string;
}
