

var Ground = cc.Sprite.extend({
    active:true,

    ctor:function (i) {
        this._super("#base.png");
        this.anchorX = 0;
        this.anchorY = 0;
        this.y = 0;
        this.x = i * this.width;
    },


    collideRect:function (x, y) {
        var w = this.width, h = this.height;

        return cc.rect(x, y, w, h);
    }

})


Ground.create = function () {
    var ground = new Ground(MW.CONTAINER.GROUND.length);
    g_sharedGameLayer.addChild(ground, MW.ZORDER.GROUND);
    MW.CONTAINER.GROUND.push(ground);
    return ground;
};

Ground.getOrCreate = function () {
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.GROUND.length; j++) {
        selChild = MW.CONTAINER.GROUND[j];
        if (selChild.active == false) {
            selChild.visible = true;
            selChild.active = true;
            return selChild;
        }

    }
    selChild = Ground.create();
    return selChild;
};


Ground.preSet = function () {
    var ground = null;
    // TODO: Fix magic number here
    for (var i = 0; i < 5; i++) {
        ground = Ground.create();
        ground.active = false;
        ground.visible = false;
    }
};