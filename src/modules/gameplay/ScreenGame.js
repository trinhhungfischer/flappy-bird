/**
 * Created by GSN on 7/9/2015.
 */


var ScreenGame = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        this.loadGui();

    },
    loadGui:function() {
        this.removeAllChildren();
        var size = cc.winSize;

        var sprite = new cc.Sprite(res.base.img_btn_disable);
        sprite.setAnchorPoint(cc.p(0, 1));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        var i = 0;
        this.addChild(sprite);
    }

});