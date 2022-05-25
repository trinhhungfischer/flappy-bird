

var Pipe = cc.Sprite.extend({
    _speed : 100,
    active:true,

    ctor:function () {
        this._super("#pipe-green.png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.x = g_sharedGameLayer.screenRect.width;
    },

    leftMoving:function (dt) {
        this.x -= dt * this._speed;
    },

    update:function (dt) {
        if (this.active)
            this.leftMoving(dt);
    },

    collideRect:function (x, y){
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    }

});


Pipe.getOrCreate = function (mode){
    var selChild = null;
    if (mode == MW.UNIT_TAG.DOWN_PIPE) {
        for (var j = 0; j < MW.CONTAINER.DOWN_PIPE.length; j++) {
            selChild  = MW.CONTAINER.DOWN_PIPE[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.active = true;
                return selChild
            }
        }
    }
    else {
        for (var j = 0; j < MW.CONTAINER.UPPER_PIPE.length; j++) {
            selChild  = MW.CONTAINER.UPPER_PIPE[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.active = true;
                return selChild
            }
        }
    }
    selChild = Pipe.create(mode);
    return selChild;
}

Pipe.create = function (mode) {
    if (mode == MW.UNIT_TAG.UPPER_PIPE) {
        var pipe = new Pipe();
        g_sharedGameLayer.addChild(pipe, MW.ZORDER.PIPE);
        MW.CONTAINER.UPPER_PIPE.push(pipe);
    }
    else {
        var pipe = new Pipe();
        pipe.setRotation(180);
        g_sharedGameLayer.addChild(pipe, MW.ZORDER.PIPE);
        MW.CONTAINER.DOWN_PIPE.push(pipe);
    }
    return pipe;
};

Pipe.preSet = function () {
    var pipe = null;
    // TODO: fix magic number
    for (var i = 0; i < 10; i++) {
        pipe = Pipe.create(MW.UNIT_TAG.UPPER_PIPE);
        pipe.visible = false;
        pipe.active = false;
    }

    for (var i = 0; i < 10; i++) {
        pipe = Pipe.create(MW.UNIT_TAG.DOWN_PIPE);
        pipe.visible = false;
        pipe.active = false;
    }

};
