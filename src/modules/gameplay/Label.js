

var Label = cc.LabelTTF.extend({
    ctor:function (text, font) {
        this._super(text, font);
        this.addTouchListener();
    },

    addTouchListener:function () {
        var self = this;
        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,

            onTouchBegan: function (touch, event) {

                g_sharedGameLayer.resetGame();

                return true;
            }
        }, this);
    },
})