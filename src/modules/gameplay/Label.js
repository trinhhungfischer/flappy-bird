

var Label = cc.LabelTTF.extend({

    _mode : null,

    active: true,
    boundingBox : null,

    ctor:function (text, font, mode) {
        this._super(text, font);
        this._mode = mode;


        this.addTouchListener();
    },

    addTouchListener:function () {
        var self = this;

        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // swallowTouches: true,

            onTouchBegan: function (touch, event) {
                if (! self.isClick(touch.getLocation()))
                    return true;
             if (self._mode == MW.GAME_LAYER_TEXT.RETRY && self.active)
                {
                    g_sharedGameLayer.onResetGame();
                    self.active = false;
                }


                if (self._mode == MW.GAME_LAYER_TEXT.BACK_MAIN && self.active)
                {
                    g_sharedGameLayer.onBackMenu();
                    self.active = false;
                }

                return true;
            }
        }, this);
    },

    isClick: function (point) {
        if (this.x + this.width / 2 > point.x && this.x - this.width / 2 < point.x &&
            this.y + this.height / 2 > point.y && this.y - this.height / 2 < point.y)
            return true;
        return false;
    }

})