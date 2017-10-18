const extToTypeMap = {
    '.sh': 'sh',
    '.json': 'json',
    '.js': 'js',
    '.sql': 'sql'
};

export default (fileExtension) => {
    return extToTypeMap[fileExtension] || "plain_text";
}