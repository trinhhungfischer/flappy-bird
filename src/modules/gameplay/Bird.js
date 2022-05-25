

var Bird = cc.Sprite.extend({
    ctor:function () {
        this._super("#bluebird-midflap.png");

        var frame0 = cc.spriteFrameCache.getSpriteFrame("bluebird-upflap.png");
        var frame1 = cc.spriteFrameCache.getSpriteFrame("bluebird-downflap.png");

        var animFrames = [];
        //animFrames.push(frame2);
        animFrames.push(frame0);
        animFrames.push(frame1);

        // ship animate
        var animation = new cc.Animation(animFrames, 0.3);
        var animate = cc.animate(animation);
        this.runAction(animate.repeatForever());
    },

    update:function(dt) {
       cc.log('Super hot hot dog');
    },

    jump:function () {
        cc.log(this.x);
        cc.log(this.y);


    },


    drop: function () {
        this.y -= 12;
    },

    collideRect:function (x, y){
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    }



})