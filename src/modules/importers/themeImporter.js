const themeImporter = requireContext => requireContext.keys()
    .map(fileName => [fileName.replace(/(^.\/)|(\.lazy.scss$)/g, ''), requireContext(fileName)])
    .reduce((themes, [name, theme]) => ({ ...themes, [name]: theme.default }), {});

export default themeImporter;
