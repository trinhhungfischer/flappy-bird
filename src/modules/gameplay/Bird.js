

var Bird = cc.Sprite.extend({
    _velocity: 0,
    _xVelocity: 100,
    _startVelocity: 500,
    _gravity: -1500,
    _size : cc.winSize,
    _rotation:0,

    ctor:function () {
        this._super("#bluebird-midflap.png");


        var frame0 = cc.spriteFrameCache.getSpriteFrame("bluebird-upflap.png");
        var frame1 = cc.spriteFrameCache.getSpriteFrame("bluebird-downflap.png");


        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        var animation = new cc.Animation(animFrames, 0.3);
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());

    },

    update:function(dt) {
        this.drop(dt);
        this.checkIsCollide();
    },

    addForce: function () {
      this._velocity = this._startVelocity;
      this._rotation = 0;
    },

    drop: function (dt) {
        this._velocity += this._gravity * dt;
        this.y += this._velocity * dt;
        this._rotation -= this._velocity / Math.sqrt(this._velocity * this._velocity + this._xVelocity * this._xVelocity) * 180 / 3.14 * dt;
        // this._rotation += dt * 10;
        this.setRotation(this._rotation);
    },

    collideRect:function (x, y){
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h);
    },

    checkIsCollide:function () {
        var bird = this;
        var selChild;
        // check collide
        for (var i = 0; i < MW.CONTAINER.GROUND.length; i++) {
            selChild = MW.CONTAINER.GROUND[i];
            if (!selChild.active)
                continue;

            if (this.collide(selChild, bird)) {
                // TODO: If bird collide with grounds
                g_sharedGameLayer._state = MW.GAME_STATE.OVER
            }

        }

        for (var i = 0; i < MW.CONTAINER.UPPER_PIPE.length; i++) {
            selChild = MW.CONTAINER.UPPER_PIPE[i];

            if (selChild.active && this.collide(selChild, bird)) {
                // TODO: If bird collide with upper pipes
                g_sharedGameLayer._state = MW.GAME_STATE.OVER
            }
        }

        for (var i = 0; i < MW.CONTAINER.DOWN_PIPE.length; i++) {
            selChild = MW.CONTAINER.DOWN_PIPE[i];

            if (selChild.active && this.collide(selChild, bird)) {
                // TODO: If bird collide with down pipes
                g_sharedGameLayer._state = MW.GAME_STATE.OVER
            }
        }

    },

    collide:function (a, b) {
        var ax = a.x, ay = a.y, bx = b.x, by = b.y;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return cc.rectIntersectsRect(aRect, bRect);
    },

})