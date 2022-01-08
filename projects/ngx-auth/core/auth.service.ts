import { Observable } from 'rxjs';
import { UserProfile } from './models/user-profile.model';
import { UserSession } from './models/user-session.model';

export abstract class AuthService {
    init: (...args: any[]) => Promise<UserProfile | void>;
    login: (redirectUrl?: string) => Promise<void>;
    logout: (redirectUrl?: string) => Promise<void>;
    refresh: () => Promise<UserProfile>;
    isAuthenticated: () => Observable<boolean>;
    getUserProfile: () => UserProfile;
    getUserSession: () => UserSession;
    getAccessToken: () => string;
}
