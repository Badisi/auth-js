export interface MobileWindowParams {
    /**
     * A hex color to which the toolbar color is set.
     */
    mobileWindowToolbarColor?: string;

    /**
     * iOS only: The presentation style of the browser. Defaults to fullscreen.
     *
     * Ignored on other platforms.
     */
    mobileWindowPresentationStyle?: 'fullscreen' | 'popover';

    /**
     * iOS only: The width the browser when using presentationStyle 'popover' on iPads.
     *
     * Ignored on other platforms.
     */
    mobileWindowWidth?: number;

    /**
     * iOS only: The height the browser when using presentationStyle 'popover' on iPads.
     *
     * Ignored on other platforms.
     */
    mobileWindowHeight?: number;
}
