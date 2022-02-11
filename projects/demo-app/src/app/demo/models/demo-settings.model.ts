import { DemoView } from './demo-view.enum';
import { LibrarySettings } from './library-settings.model';
import { PlaygroundSettings } from './playground-settings.model';

export interface DemoSettings {
    currentView: DemoView;
    playground: PlaygroundSettings;
    library: LibrarySettings;
}
