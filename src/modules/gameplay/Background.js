
var numBackGround = 5;

var Background = cc.Sprite.extend({
    active:true,

    ctor:function () {
        this._super("#background-day.png");
        this.anchorX = 0;
        this.anchorY = 0;
    },
});

Background.create = function () {
    var background = new Background();
    g_sharedGameLayer.addChild(background, MW.ZORDER.BACKGROUND);
    MW.CONTAINER.BACKGROUND.push(background);
    return background;
};

Background.getOrCreate = function () {
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.BACKGROUND.length; j++) {
        selChild = MW.CONTAINER.BACKGROUND[j];
        if (selChild.active == false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }

    }

    selChild = Background.create();
    return selChild;
};


Background.preSet = function () {
    var background = null;
    // TODO: Fix magic number here
    for (var i = 0; i < numBackGround; i++) {
        background = Background.create();
        background.active = false;
        background.visible = false;
    }
};