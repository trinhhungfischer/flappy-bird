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


        this._backSky = new BackSky();
        this.addChild(this._backSky, -999);

        // Schedule
        this.scheduleUpdate();


        this.addTouchListener();

    },


    addTouchListener:function () {
        var self = this;
        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,

            onTouchBegan: function (touch, event) {
                self._bird.jump();

                if (MW.SOUND) {
                    var s = cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WINDOWS || cc.sys.OS_WINRT ? res.soundWindEffect_wav : res.soundWindEffect_mp3);
                }
                return true;
            }
        }, this);
    },

    update: function (dt) {
        this._bird.update(dt);
    }
});