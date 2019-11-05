const styleImporter = requireContext => requireContext.keys()
    .map(fileName => [fileName.replace(/(^.\/)|(\.scss$)|(\.lazy.scss$)/g, ''), requireContext(fileName)])
    .reduce((modules, [name, module]) => {
        return Object.assign({}, modules, { [name]: module });
    }, {});

export default styleImporter;
