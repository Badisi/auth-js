import type { AuthGuardOptions } from '@badisi/auth-js/oidc';

import { useAuthService } from './auth.service';

export const useAuthGuard = async (toUrl: string, options?: AuthGuardOptions): Promise<boolean | string> =>
    useAuthService().runGuard(toUrl, options);
