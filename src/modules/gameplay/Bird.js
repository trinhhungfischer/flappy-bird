

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
    }



})