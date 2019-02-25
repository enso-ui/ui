const storeImporter = requireContext => requireContext.keys()
    .map(fileName => [fileName.replace(/(^.\/)|(\.js$)/g, ''), requireContext(fileName)])
    .reduce((modules, [name, module]) => {
        module.namespaced = true;
        return Object.assign({}, modules, { [name]: module });
    }, {});

export default storeImporter;
