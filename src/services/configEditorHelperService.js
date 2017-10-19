const SUPPORTED_THEMES = ["github", "monokai"];
const SUPPORTED_MODES = ["json", "javascript", "sql", "sh", "plain_text"];
const EXT_TO_MODE_MAP = {
    'sh': 'sh',
    'json': 'json',
    'js': 'javascript',
    'sql': 'sql'
};

export const getSupportedThemes = () => {
    return SUPPORTED_THEMES;
};

export const getSupportedModes = () => {
    return SUPPORTED_MODES;
};

export const getModeByExt = (ext) => {
    return EXT_TO_MODE_MAP[ext] || "plain_text";
}