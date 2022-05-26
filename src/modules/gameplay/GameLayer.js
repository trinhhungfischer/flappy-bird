/**
 * Created by GSN on 7/9/2015.
 */

var g_sharedGameLayer;


var GameLayer = cc.Layer.extend({
    _itemMenu:null,
    _bird:null,
    _background:null,
    _beginPos:0,
    _ground: null,
    _state: MW.GAME_STATE.READY,
    _texTransparentBatch:null,

    _score: 0,
    _firstClick: false,
    _lastPipe: null,
    _readySprite: null,

    isMouseDown:false,
    screenRect:null,

    ctor:function() {
        this._super();
        this.init();

    },

    init:function() {
        var winSize = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.textureGame_plist);
        this._bird = new Bird();

        this._bird.setPosition(cc.p(winSize.width / 2, 3 * winSize.height / 4));
        this.addChild(this._bird, MW.UNIT_TAG.BIRD);

        this._readySprite = cc.Sprite("#message.png");
        this._readySprite.setPosition(cc.p(winSize.width / 2,  winSize.height / 2));
        this.addChild(this._readySprite, MW.UNIT_TAG.READY);



        // Schedule
        this.addTouchListener();
        this.scheduleUpdate();


        this.screenRect = cc.rect(0, 0, winSize.width, winSize.height);
        g_sharedGameLayer = this;

        // preset
        Background.preSet();
        Ground.preSet();
        Pipe.preSet();

        cc.log(MW.CONTAINER.GROUND.length);

        this.initBackground();
        this.initGround();
        this._lastPipe = this.initPairPipe();

    },

    checkIsCollide:function () {
        var selChild;
        // check collide
        for (var i = 0; i < MW.CONTAINER.GROUND.length; i++) {
            selChild = MW.CONTAINER.GROUND[i];
            if (!selChild.active)
                continue;

            var bird = this._bird;
            if (this.collide(selChild, bird)) {
                // TODO: If bird collide with grounds
                this._state = MW.GAME_STATE.OVER
            }

        }

        for (var i = 0; i < MW.CONTAINER.UPPER_PIPE.length; i++) {
            var bird = this._bird;
            selChild = MW.CONTAINER.UPPER_PIPE[i];

            if (selChild.active && this.collide(selChild, bird)) {
                // TODO: If bird collide with upper pipes
                this._state = MW.GAME_STATE.OVER
            }
        }

        for (var i = 0; i < MW.CONTAINER.DOWN_PIPE.length; i++) {
            var bird = this._bird;
            selChild = MW.CONTAINER.DOWN_PIPE[i];

            if (selChild.active && this.collide(selChild, bird)) {
                // TODO: If bird collide with down pipes
                this._state = MW.GAME_STATE.OVER
            }
        }

    },

    initBackground:function () {
        for (var i = 0; i < numBackGround; i++) {
            this._background = Background.getOrCreate();
            var ratio = g_sharedGameLayer.screenRect.height / this._background.height;
            this._background.runAction(cc.scaleTo(0, ratio));
            this._background.setPosition(cc.p(i * this._background.width * ratio * 0.97, 0));
        }
    },

    initGround:function () {
        for (var i = 0; i < numBackGround; i++) {
            this._ground = Ground.getOrCreate();
        }
    },



    initPairPipe:function () {
        var distance = Math.random() * MW.PIPE_CONFIG.RANDOM_RANGE;
        var down_pipe = Pipe.getOrCreate(MW.UNIT_TAG.DOWN_PIPE);
        down_pipe.y = g_sharedGameLayer.screenRect.height + distance;
        var upper_pipe = Pipe.getOrCreate(MW.UNIT_TAG.UPPER_PIPE);
        upper_pipe.y = g_sharedGameLayer.screenRect.height / 4 + distance;
        return down_pipe;
    },

    initPipe:function (dt) {
        if (this._lastPipe.x < g_sharedGameLayer.screenRect.width * 7 / 8)
        {
            this._lastPipe = this.initPairPipe();
        }
    },

    collide:function (a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },

    addTouchListener:function () {
        var self = this;
        cc.eventManager.addListener({
            prevTouchID: -1,
            event: cc.EventListener.TOUCH_ONE_BY_ONE,

            onTouchBegan: function (touch, event) {
                if (!self._firstClick) {
                    self._state = MW.GAME_STATE.PLAY;
                    self._readySprite.visible = false;
                }
                self._bird.addForce();

                if (MW.SOUND) {
                    var s = cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WINDOWS || cc.sys.OS_WINRT ? res.soundWindEffect_wav : res.soundWindEffect_mp3);
                }
                return true;
            }
        }, this);
    },

    update: function (dt) {
        if (this._state == MW.GAME_STATE.PLAY) {
            this._bird.update(dt);
            for (var j = 0; j < MW.CONTAINER.UPPER_PIPE.length; j++) {
                var upper_pipe = MW.CONTAINER.UPPER_PIPE[j];
                if (upper_pipe.active) upper_pipe.update(dt);
            }

            for (var j = 0; j < MW.CONTAINER.DOWN_PIPE.length; j++) {
                var down_pipe = MW.CONTAINER.DOWN_PIPE[j];
                if (down_pipe.active) down_pipe.update(dt);
            }

            this.checkIsCollide(dt);
            this.initPipe(dt);
            this.caculateScore(dt);
        }
    },

    caculateScore: function (dt) {
        for (var j = 0; j < MW.CONTAINER.DOWN_PIPE.length; j++) {
            var down_pipe = MW.CONTAINER.DOWN_PIPE[j];
            cc.log(down_pipe.x);
            if (down_pipe.active && (!down_pipe._isScore) && (down_pipe.x < g_sharedGameLayer / 2 - down_pipe.width / 2))
            {
                this._score += 1;
                down_pipe._isScore = true;
                cc.log(this._score);
            }
        }

    }



});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 1);
    return scene;
};