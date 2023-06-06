import { ExtraSigninRequestArgs, ExtraSignoutRequestArgs, IFrameWindowParams, PopupWindowParams, RedirectParams } from 'oidc-client-ts';

import { DesktopNavigation } from './desktop-navigation.enum';
import { MobileWindowParams } from './mobile-window-params.model';

export type LoginArgs = MobileWindowParams & PopupWindowParams & RedirectParams & Omit<ExtraSigninRequestArgs, 'redirect_uri'> & {
    redirectUrl?: string;
    desktopNavigationType?: DesktopNavigation;
};

export type LogoutArgs = MobileWindowParams & PopupWindowParams & RedirectParams & Omit<ExtraSignoutRequestArgs, 'post_logout_redirect_uri'> & {
    redirectUrl?: string;
    desktopNavigationType?: DesktopNavigation;
};

export type RenewArgs = IFrameWindowParams & ExtraSigninRequestArgs;

export type SigninMobileArgs = MobileWindowParams & ExtraSigninRequestArgs;

export type SignoutMobileArgs = MobileWindowParams & ExtraSignoutRequestArgs;
