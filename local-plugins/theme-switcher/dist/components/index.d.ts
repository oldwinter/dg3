import { QuartzComponent } from '@quartz-community/types';

type ThemeSwitcherOptions = {
    readonly defaultPreset?: string;
    readonly storageKey?: string;
};
declare const ThemeSwitcher: (options?: ThemeSwitcherOptions) => QuartzComponent;

export { ThemeSwitcher };
