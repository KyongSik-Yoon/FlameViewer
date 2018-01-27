class BackTracesDrawer extends TreeDrawer {
    constructor(tree) {
        super(tree);
    }

    /**
     * Get canvas Y coordinate (it start from top)
     * @param y
     * @returns {number}
     * @protected
     * @override
     */
    flipY(y) {
        return y;
    }

    /**
     * @return {number}
     */
    getNodesCount() {
        console.log("nodes count: " + this.nodesCount);
        return this.nodesCount;
    }

    /**
     * @param {Number} offsetX
     * @param depth
     * @override
     */
    _setPopupPosition(offsetX, depth) {
        this.$popup
            .css("left", offsetX)
            .css("margin-top", -this.canvasHeight + TreeDrawer._calcNormaOffsetY(depth + 1) - POPUP_MARGIN)
    }
}