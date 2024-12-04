import type { OIDCAuthSettings, Optional } from "..";

export type DefaultSettings =
    Optional<OIDCAuthSettings,
        'authorityUrl' |
        'clientId'
    > &
    Required<Pick<OIDCAuthSettings,
        'loginRequired' |
        'retrieveUserSession' |
        'loadUserInfo' |
        'automaticSilentRenew' |
        'desktopNavigationType' |
        'scope' |
        'logLevel'
    >> &
    {
        internal:
            OIDCAuthSettings['internal'] &
            Required<Pick<NonNullable<OIDCAuthSettings['internal']>,
                'response_type' |
                'redirect_uri' |
                'post_logout_redirect_uri' |
                'popup_redirect_uri' |
                'popup_post_logout_redirect_uri' |
                'silent_redirect_uri' |
                'mobileWindowPresentationStyle'
            >>
    };
