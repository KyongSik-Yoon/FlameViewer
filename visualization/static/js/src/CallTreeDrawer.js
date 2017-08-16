const PIX_IN_MS = 0.5;

/**
 * @param {{css: Function}} $element
 * @param {String} property
 */
function scrollHorizontally($element, property) {
    //noinspection JSUnresolvedFunction
    constants.$main.scroll(() => {
        //noinspection JSValidateTypes
        $element.css(property, constants.$main.scrollLeft());
    });
}

class CallTreeDrawer extends AccumulativeTreeDrawer {
    /**
     * @param tree
     * @param {Number} id
     */
    constructor(tree, id) {
        super(tree);
        this.canvasWidth = Math.ceil(this.treeWidth * PIX_IN_MS);
        this.threadName = this.tree.getTreeInfo().getThreadName();
        this.canvasOffset = 0;
        this.id = id;
        this.enableZoom = false;
        this._countNodesRecursively(this.baseNode);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param node
     * @private
     * @override
     */
    _setPopupContent(node) {
        super._setPopupContent(node);
        this.$popup.find(".duration").text("duration: " + node.getWidth() + " ms")
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {Number} offsetX
     * @param depth
     * @override
     */
    _setPopupPosition(offsetX, depth) {
        //noinspection JSValidateTypes
        if (offsetX < $(".call-tree-wrapper").scrollLeft()) {
            //noinspection JSValidateTypes
            offsetX = $(".call-tree-wrapper").scrollLeft();
        } else {
            offsetX += 30;
        }
        super._setPopupPosition(offsetX, depth);
    }

    draw() {
        this._prepareDraw();

        this.$section = this._createSection();
        this.stage = new createjs.Stage("canvas-" + this.id);
        this.stage.id = "canvas-" + this.id;
        this.stage.enableMouseOver(20);

        this.zoomedStage = new createjs.Stage("canvas-zoomed-" + this.id);
        this.zoomedStage.id = "canvas-zoomed-" + this.id;
        this.stage.enableMouseOver(20);

        this._createPopup();

        const childNodes = this.baseNode.getNodesList();
        if (childNodes.length === 0) {
            return;
        }
        this._drawFullTree();
    };

    _createSection() {
        const sectionContent = templates.tree.getCallTreeSection(
            {
                id: this.id,
                threadName: this.threadName,
                nodesCount: this.nodesCount,
                canvasHeight: this.canvasHeight,
                canvasWidth: this.canvasWidth,
                canvasOffset: this.canvasOffset
            }
        ).content;
        const $section = $(sectionContent);
        // scrollHorizontally($section.find(".call-tree-header"), "padding-left");
        if (this.id === 0) {
            $section.find("h2").css("border", "none");
        }
        return $section.appendTo($(".call-tree-wrapper"));
    };

    _createPopup() {
        const popupContent = templates.tree.callTreePopup().content;
        this.$popup = $(popupContent).appendTo(this.$section);
    }
}
