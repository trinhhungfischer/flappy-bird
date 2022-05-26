

var Pipe = cc.Sprite.extend({
    _speed : 100,
    _mode: null,
    _isScore: false,
    active:true,
    _startPos: null,

    ctor:function (mode) {
        this._super("#pipe-green.png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this._startPos = g_sharedGameLayer.screenRect.width + this.width;
        this.x = this._startPos;
        this._mode = mode;
        if (mode == MW.UNIT_TAG.DOWN_PIPE)
            this.setRotation(180);

    },

    leftMoving:function (dt) {
        this.x -= dt * this._speed;
    },

    update:function (dt) {
        if (this.active)
            this.leftMoving(dt);
            if (this.x < 0 - this.width) {
                this.destroy();
            }
    },

    collideRect:function (x, y){
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    },

    destroy:function () {
        this.active = false;
        this.visible = true;
        this._isScore = false;
        this.x = this._startPos;
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
        var pipe = new Pipe(MW.UNIT_TAG.UPPER_PIPE);
        g_sharedGameLayer.addChild(pipe, MW.ZORDER.PIPE);
        MW.CONTAINER.UPPER_PIPE.push(pipe);
    }
    else {
        var pipe = new Pipe(MW.UNIT_TAG.DOWN_PIPE);
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
