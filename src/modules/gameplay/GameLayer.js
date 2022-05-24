/**
 * Created by GSN on 7/9/2015.
 */


var GameLayer = cc.Layer.extend({
    _itemMenu:null,
    _bird:null,
    _backSky:null,
    _beginPos:0,
    isMouseDown:false,




    ctor:function() {
        this._super();
        this.init();
    },
    init:function() {
        var size = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(res.textureGame_plist);
        this._bird = new Bird();

        this._bird.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(this._bird);


        this.addTouchListener();


    },


    addTouchListener:function () {
        var self = this;
        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,

            onTouchBegan: function (touch, event) {

                return true;
            }
        }, this);
    }
});