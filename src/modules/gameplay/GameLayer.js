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
    _overSprite: null,
    _retryText:null,
    _backMenuText:null,

    isMouseDown:false,
    screenRect:null,
    lblScore:null,

    ctor:function() {
        this._super();
        this.init();
        g_sharedGameLayer = this;

    },

    init:function() {
        var winSize = cc.director.getWinSize();

        cc.spriteFrameCache.addSpriteFrames(res.textureGame_plist);
        this._bird = new Bird();

        this._bird.setPosition(cc.p(winSize.width / 2, 3 * winSize.height / 4));
        this.addChild(this._bird, MW.UNIT_TAG.BIRD);

        this.initReadySprite();

        // score
        this.lblScore = new cc.LabelTTF("Score: 0", res.fontPixelBoy);
        this.lblScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: winSize.width - 5,
            y: winSize.height - 30,
            scale: MW.SCALE
        });
        this.lblScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.lblScore, MW.ZORDER.SCORE);

        // Schedule
        this.addTouchListener();
        this.scheduleUpdate();


        this.screenRect = cc.rect(0, 0, winSize.width, winSize.height);
        g_sharedGameLayer = this;

        // preset
        Background.preSet();
        Ground.preSet();
        Pipe.preSet();

        this.initBackground();
        this.initGround();
        this._lastPipe = this.initPairPipe();


    },

    initReadySprite:function () {
        var winSize = cc.director.getWinSize();
        this._readySprite = cc.Sprite("#message.png");
        this._readySprite.setPosition(cc.p(winSize.width / 2,  winSize.height / 2));
        this.addChild(this._readySprite, MW.UNIT_TAG.READY);
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
        down_pipe.y = g_sharedGameLayer.screenRect.height - distance;
        var upper_pipe = Pipe.getOrCreate(MW.UNIT_TAG.UPPER_PIPE);

        var mode = Math.random() + 3;
        upper_pipe.y = g_sharedGameLayer.screenRect.height / mode - distance;
        return down_pipe;
    },

    initPipe:function () {
        if (this._lastPipe.x < g_sharedGameLayer.screenRect.width * 7 / 8)
        {
            this._lastPipe = this.initPairPipe();
        }
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
                    self._firstClick = true;
                }

                self._bird.addForce();

                if (MW.SOUND) {
                }

                return true;
            }
        }, this);
    },

    updateUI:function () {
      this.lblScore.setString("Score: " + this._score);
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

            this.initPipe();
            this.calculateScore();
            this.updateUI()
        }
        if (this._state == MW.GAME_STATE.OVER && this._state != null) {
            this._state = MW.GAME_STATE.RETRY;
            this._overSprite = cc.Sprite("#gameover.png");
            this._overSprite.setPosition(g_sharedGameLayer.screenRect.width / 2, 3 *g_sharedGameLayer.screenRect.height / 4);
            this.addChild(this._overSprite, MW.ZORDER.OVER);

            this._retryText = new Label("Retry ?", res.fontPixelBoy, MW.GAME_LAYER_TEXT.RETRY);
            this._retryText.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: g_sharedGameLayer.screenRect.width / 2,
                y: this._overSprite.y - this._overSprite.height * 2,
                scale: MW.SCALE
            });
            this._retryText.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            this.addChild(this._retryText, MW.ZORDER.SCORE);

            this._backMenuText = new Label("Main Menu ?", res.fontPixelBoy, MW.GAME_LAYER_TEXT.BACK_MAIN);
            this._backMenuText.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: g_sharedGameLayer.screenRect.width / 2,
                y: this._retryText.y - this._retryText.height * 4,
                scale: MW.SCALE
            });
            this._backMenuText.textAlign = cc.TEXT_ALIGNMENT_CENTER;
            this.addChild(this._backMenuText, MW.ZORDER.SCORE);



        }
    },

    calculateScore: function () {
        for (var j = 0; j < MW.CONTAINER.DOWN_PIPE.length; j++) {
            var down_pipe = MW.CONTAINER.DOWN_PIPE[j];
            if (down_pipe.active && (!down_pipe._isScore) && (down_pipe.x < g_sharedGameLayer.screenRect.width / 2 - down_pipe.width / 2))
            {
                this._score += 1;
                down_pipe._isScore = true;
            }
        }

    },

    onResetGame: function () {
        var winSize = cc.director.getWinSize();

        this._score = 0;
        this._overSprite.visible = false;
        this._retryText.visible = false;
        this._firstClick = false;
        this._backMenuText.visible = false;
        this._bird.setPosition(cc.p(winSize.width / 2, 3 * winSize.height / 4));
        for (var j = 0; j < MW.CONTAINER.DOWN_PIPE.length; j++) {
            var down_pipe = MW.CONTAINER.DOWN_PIPE[j];
            if (down_pipe.active) down_pipe.destroy();
        }

        for (var j = 0; j < MW.CONTAINER.UPPER_PIPE.length; j++) {
            var upper_pipe = MW.CONTAINER.UPPER_PIPE[j];
            if (upper_pipe.active) upper_pipe.destroy();
        }



        this._state = MW.GAME_STATE.READY;
        this._lastPipe = this.initPairPipe();


        this.initReadySprite();


    },

    onBackMenu: function () {
        var scene = new ScreenMenu.scene();
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }



});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 1);
    return scene;
};