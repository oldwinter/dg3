export { ThemeSwitcher } from './components/index.js';
export { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, StringResource } from '@quartz-community/types';

declare const REQUIRED_THEME_TOKEN_KEYS: readonly ["light", "lightgray", "gray", "darkgray", "dark", "secondary", "tertiary", "highlight", "textHighlight", "accentH", "accentS", "accentL"];
type ThemeTokenKey = (typeof REQUIRED_THEME_TOKEN_KEYS)[number];
type ThemeTokens = Readonly<Record<ThemeTokenKey, string>>;
type ThemePreset = {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly previewAccent: string;
    readonly light: ThemeTokens;
    readonly dark: ThemeTokens;
};
type ValidationResult = {
    readonly valid: boolean;
    readonly errors: readonly string[];
};
type Hsl = {
    readonly h: number;
    readonly s: number;
    readonly l: number;
};
declare const THEME_PRESETS: readonly [{
    readonly id: "linear";
    readonly label: "Linear";
    readonly description: "Engineered graphite and cool indigo for focused reading.";
    readonly previewAccent: "#5e6ad2";
    readonly light: {
        readonly light: "#f7f8f8";
        readonly lightgray: "#eceef1";
        readonly gray: "#9aa3af";
        readonly darkgray: "#3f4652";
        readonly dark: "#15171c";
        readonly secondary: "#5e6ad2";
        readonly tertiary: "#7170ff";
        readonly highlight: "rgba(94, 106, 210, 0.14)";
        readonly textHighlight: "rgba(94, 106, 210, 0.22)";
        readonly accentH: "234";
        readonly accentS: "56%";
        readonly accentL: "60%";
    };
    readonly dark: {
        readonly light: "#08090a";
        readonly lightgray: "#191a1b";
        readonly gray: "#62666d";
        readonly darkgray: "#d0d6e0";
        readonly dark: "#f7f8f8";
        readonly secondary: "#828fff";
        readonly tertiary: "#5e6ad2";
        readonly highlight: "rgba(130, 143, 255, 0.18)";
        readonly textHighlight: "rgba(130, 143, 255, 0.28)";
        readonly accentH: "234";
        readonly accentS: "100%";
        readonly accentL: "75%";
    };
}, {
    readonly id: "raycast";
    readonly label: "Raycast";
    readonly description: "Near-black utility chrome with precise blue interaction.";
    readonly previewAccent: "#ff6363";
    readonly light: {
        readonly light: "#f9f9f9";
        readonly lightgray: "#e8ecef";
        readonly gray: "#9c9c9d";
        readonly darkgray: "#34383c";
        readonly dark: "#18191a";
        readonly secondary: "#55b3ff";
        readonly tertiary: "#ff6363";
        readonly highlight: "rgba(85, 179, 255, 0.16)";
        readonly textHighlight: "rgba(255, 99, 99, 0.24)";
        readonly accentH: "207";
        readonly accentS: "100%";
        readonly accentL: "67%";
    };
    readonly dark: {
        readonly light: "#07080a";
        readonly lightgray: "#101111";
        readonly gray: "#6a6b6c";
        readonly darkgray: "#cecece";
        readonly dark: "#f9f9f9";
        readonly secondary: "#55b3ff";
        readonly tertiary: "#ff6363";
        readonly highlight: "rgba(85, 179, 255, 0.18)";
        readonly textHighlight: "rgba(255, 99, 99, 0.26)";
        readonly accentH: "207";
        readonly accentS: "100%";
        readonly accentL: "67%";
    };
}, {
    readonly id: "apple";
    readonly label: "Apple";
    readonly description: "Gallery-neutral clarity with thin chrome and action blue.";
    readonly previewAccent: "#0071e3";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#f5f5f7";
        readonly gray: "#86868b";
        readonly darkgray: "#424245";
        readonly dark: "#1d1d1f";
        readonly secondary: "#0071e3";
        readonly tertiary: "#0066cc";
        readonly highlight: "rgba(0, 113, 227, 0.12)";
        readonly textHighlight: "rgba(0, 113, 227, 0.2)";
        readonly accentH: "210";
        readonly accentS: "100%";
        readonly accentL: "45%";
    };
    readonly dark: {
        readonly light: "#000000";
        readonly lightgray: "#272729";
        readonly gray: "#6e6e73";
        readonly darkgray: "#d2d2d7";
        readonly dark: "#ffffff";
        readonly secondary: "#2997ff";
        readonly tertiary: "#0071e3";
        readonly highlight: "rgba(41, 151, 255, 0.18)";
        readonly textHighlight: "rgba(41, 151, 255, 0.28)";
        readonly accentH: "209";
        readonly accentS: "100%";
        readonly accentL: "58%";
    };
}, {
    readonly id: "notion";
    readonly label: "Notion";
    readonly description: "Warm paper surfaces with whisper borders and blue links.";
    readonly previewAccent: "#0075de";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#f6f5f4";
        readonly gray: "#a39e98";
        readonly darkgray: "#615d59";
        readonly dark: "#31302e";
        readonly secondary: "#0075de";
        readonly tertiary: "#2a9d99";
        readonly highlight: "rgba(0, 117, 222, 0.12)";
        readonly textHighlight: "rgba(0, 117, 222, 0.2)";
        readonly accentH: "208";
        readonly accentS: "100%";
        readonly accentL: "44%";
    };
    readonly dark: {
        readonly light: "#31302e";
        readonly lightgray: "#3d3a36";
        readonly gray: "#a39e98";
        readonly darkgray: "#f0eee6";
        readonly dark: "#ffffff";
        readonly secondary: "#62aef0";
        readonly tertiary: "#2a9d99";
        readonly highlight: "rgba(98, 174, 240, 0.18)";
        readonly textHighlight: "rgba(98, 174, 240, 0.28)";
        readonly accentH: "208";
        readonly accentS: "83%";
        readonly accentL: "66%";
    };
}, {
    readonly id: "vercel";
    readonly label: "Vercel";
    readonly description: "Monochrome infrastructure minimalism with crisp blue focus.";
    readonly previewAccent: "#0072f5";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#fafafa";
        readonly gray: "#808080";
        readonly darkgray: "#4d4d4d";
        readonly dark: "#171717";
        readonly secondary: "#0072f5";
        readonly tertiary: "#171717";
        readonly highlight: "rgba(0, 114, 245, 0.12)";
        readonly textHighlight: "rgba(0, 114, 245, 0.2)";
        readonly accentH: "212";
        readonly accentS: "100%";
        readonly accentL: "48%";
    };
    readonly dark: {
        readonly light: "#000000";
        readonly lightgray: "#171717";
        readonly gray: "#666666";
        readonly darkgray: "#ebebeb";
        readonly dark: "#ffffff";
        readonly secondary: "#2997ff";
        readonly tertiary: "#fafafa";
        readonly highlight: "rgba(41, 151, 255, 0.16)";
        readonly textHighlight: "rgba(41, 151, 255, 0.28)";
        readonly accentH: "209";
        readonly accentS: "100%";
        readonly accentL: "58%";
    };
}, {
    readonly id: "claude";
    readonly label: "Claude";
    readonly description: "Parchment warmth, charcoal text, and terracotta accents.";
    readonly previewAccent: "#c96442";
    readonly light: {
        readonly light: "#f5f4ed";
        readonly lightgray: "#faf9f5";
        readonly gray: "#87867f";
        readonly darkgray: "#5e5d59";
        readonly dark: "#141413";
        readonly secondary: "#c96442";
        readonly tertiary: "#d97757";
        readonly highlight: "rgba(201, 100, 66, 0.14)";
        readonly textHighlight: "rgba(201, 100, 66, 0.24)";
        readonly accentH: "15";
        readonly accentS: "56%";
        readonly accentL: "52%";
    };
    readonly dark: {
        readonly light: "#141413";
        readonly lightgray: "#30302e";
        readonly gray: "#87867f";
        readonly darkgray: "#b0aea5";
        readonly dark: "#faf9f5";
        readonly secondary: "#d97757";
        readonly tertiary: "#c96442";
        readonly highlight: "rgba(217, 119, 87, 0.18)";
        readonly textHighlight: "rgba(217, 119, 87, 0.3)";
        readonly accentH: "15";
        readonly accentS: "63%";
        readonly accentL: "60%";
    };
}, {
    readonly id: "stripe";
    readonly label: "Stripe";
    readonly description: "Deep navy text and premium purple financial precision.";
    readonly previewAccent: "#533afd";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#f6f9fc";
        readonly gray: "#64748d";
        readonly darkgray: "#273951";
        readonly dark: "#061b31";
        readonly secondary: "#533afd";
        readonly tertiary: "#4434d4";
        readonly highlight: "rgba(83, 58, 253, 0.12)";
        readonly textHighlight: "rgba(83, 58, 253, 0.22)";
        readonly accentH: "248";
        readonly accentS: "98%";
        readonly accentL: "61%";
    };
    readonly dark: {
        readonly light: "#0d253d";
        readonly lightgray: "#1c1e54";
        readonly gray: "#8ea0bd";
        readonly darkgray: "#d6d9fc";
        readonly dark: "#ffffff";
        readonly secondary: "#665efd";
        readonly tertiary: "#b9b9f9";
        readonly highlight: "rgba(102, 94, 253, 0.18)";
        readonly textHighlight: "rgba(102, 94, 253, 0.3)";
        readonly accentH: "243";
        readonly accentS: "98%";
        readonly accentL: "68%";
    };
}, {
    readonly id: "figma";
    readonly label: "Figma";
    readonly description: "Binary black-and-white interface with selection clarity.";
    readonly previewAccent: "#000000";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#f4f4f4";
        readonly gray: "#8a8a8a";
        readonly darkgray: "#333333";
        readonly dark: "#000000";
        readonly secondary: "#000000";
        readonly tertiary: "#555555";
        readonly highlight: "rgba(0, 0, 0, 0.08)";
        readonly textHighlight: "rgba(0, 0, 0, 0.14)";
        readonly accentH: "0";
        readonly accentS: "0%";
        readonly accentL: "0%";
    };
    readonly dark: {
        readonly light: "#000000";
        readonly lightgray: "#1f1f1f";
        readonly gray: "#8a8a8a";
        readonly darkgray: "#f4f4f4";
        readonly dark: "#ffffff";
        readonly secondary: "#ffffff";
        readonly tertiary: "#d6d6d6";
        readonly highlight: "rgba(255, 255, 255, 0.16)";
        readonly textHighlight: "rgba(255, 255, 255, 0.24)";
        readonly accentH: "0";
        readonly accentS: "0%";
        readonly accentL: "100%";
    };
}, {
    readonly id: "spotify";
    readonly label: "Spotify";
    readonly description: "Immersive charcoal layers with functional green selection.";
    readonly previewAccent: "#1ed760";
    readonly light: {
        readonly light: "#fdfdfd";
        readonly lightgray: "#eeeeee";
        readonly gray: "#7c7c7c";
        readonly darkgray: "#4d4d4d";
        readonly dark: "#121212";
        readonly secondary: "#1ed760";
        readonly tertiary: "#1db954";
        readonly highlight: "rgba(30, 215, 96, 0.12)";
        readonly textHighlight: "rgba(30, 215, 96, 0.22)";
        readonly accentH: "141";
        readonly accentS: "76%";
        readonly accentL: "48%";
    };
    readonly dark: {
        readonly light: "#121212";
        readonly lightgray: "#181818";
        readonly gray: "#7c7c7c";
        readonly darkgray: "#b3b3b3";
        readonly dark: "#ffffff";
        readonly secondary: "#1ed760";
        readonly tertiary: "#1db954";
        readonly highlight: "rgba(30, 215, 96, 0.16)";
        readonly textHighlight: "rgba(30, 215, 96, 0.28)";
        readonly accentH: "141";
        readonly accentS: "76%";
        readonly accentL: "48%";
    };
}, {
    readonly id: "tesla";
    readonly label: "Tesla";
    readonly description: "Radical subtraction with carbon text and electric blue.";
    readonly previewAccent: "#3e6ae1";
    readonly light: {
        readonly light: "#ffffff";
        readonly lightgray: "#f4f4f4";
        readonly gray: "#8e8e8e";
        readonly darkgray: "#393c41";
        readonly dark: "#171a20";
        readonly secondary: "#3e6ae1";
        readonly tertiary: "#5c5e62";
        readonly highlight: "rgba(62, 106, 225, 0.12)";
        readonly textHighlight: "rgba(62, 106, 225, 0.22)";
        readonly accentH: "224";
        readonly accentS: "73%";
        readonly accentL: "56%";
    };
    readonly dark: {
        readonly light: "#171a20";
        readonly lightgray: "#23262c";
        readonly gray: "#8e8e8e";
        readonly darkgray: "#d0d1d2";
        readonly dark: "#ffffff";
        readonly secondary: "#6f8dff";
        readonly tertiary: "#3e6ae1";
        readonly highlight: "rgba(111, 141, 255, 0.16)";
        readonly textHighlight: "rgba(111, 141, 255, 0.28)";
        readonly accentH: "228";
        readonly accentS: "100%";
        readonly accentL: "72%";
    };
}];
type CanonicalThemePreset = (typeof THEME_PRESETS)[number];
declare const THEME_PRESET_IDS: readonly CanonicalThemePreset["id"][];
declare function hexToHsl(hex: string): Hsl;
declare function validateThemeCatalog(presets: readonly ThemePreset[]): ValidationResult;
declare function buildThemePresetCss(presets?: readonly ThemePreset[]): string;

declare const manifest: {
    name: string;
    displayName: string;
    description: string;
    category: "component";
    version: string;
    quartzVersion: string;
    dependencies: never[];
    defaultOrder: number;
    defaultEnabled: true;
    defaultOptions: {
        defaultPreset: "linear";
        storageKey: "themePreset";
    };
    components: {
        ThemeSwitcher: {
            name: "ThemeSwitcher";
            displayName: string;
            description: string;
            version: string;
            defaultPosition: "left";
            defaultPriority: 32;
        };
    };
};

export { type CanonicalThemePreset, REQUIRED_THEME_TOKEN_KEYS, THEME_PRESETS, THEME_PRESET_IDS, type ThemePreset, type ThemeTokens, buildThemePresetCss, hexToHsl, manifest, validateThemeCatalog };
