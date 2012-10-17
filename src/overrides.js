// only overriding this until knockout supports storing templates in memory instead of requiring they be appended to the dom.
ko.nativeTemplateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options) {
    var useNodesIfAvailable = !(ko.utils.ieVersion < 9), // IE<9 cloneNode doesn't work properly
        templateNodesFunc = useNodesIfAvailable ? templateSource['nodes'] : null,
        templateNodes = templateNodesFunc ? templateSource['nodes']() : null;

    if (templateNodes) {
        return ko.utils.makeArray(templateNodes.cloneNode(true).childNodes);
    } else {
        var templateText = templateSource['text']() || templateSource.domElement ? templateSource.domElement.innerHTML : templateSource.i.innerHTML;
        return ko.utils.parseHtmlFragment(templateText);
    }
};