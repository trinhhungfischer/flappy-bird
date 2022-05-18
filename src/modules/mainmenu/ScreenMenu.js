/**
 * Created by GSN on 7/6/2015.
 */

var ScreenMenu = cc.Layer.extend({
    _itemMenu:null,
    _beginPos:0,
    isMouseDown:false,

    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();

        var yBtn = 3*size.height/5;

        var btnNetwork = gv.commonButton(200, 64, cc.winSize.width/4, yBtn,"Network 112");
        this.addChild(btnNetwork);
        btnNetwork.addClickEventListener(this.onSelectNetwork.bind(this));

        var btnLocalization = gv.commonButton(200, 64, cc.winSize.width/2, yBtn,"Localize");
        this.addChild(btnLocalization);
        btnLocalization.addClickEventListener(this.onSelectLocalization.bind(this));

        var btnDragonbones = gv.commonButton(200, 64, 3*cc.winSize.width/4, yBtn,"Dragonbone");
        this.addChild(btnDragonbones);
        btnDragonbones.addClickEventListener(this.onSelectDragonbones.bind(this));

        var sprite = new cc.Sprite(res.base.img_btn_disable);
        sprite.setAnchorPoint(cc.p(0, 1));
        sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        sprite.setRotation(40)
        // sprite.setAnchorPoint(cc.Vec3(0, 0));
        sprite.setScale(2.0);
        this.addChild(sprite);
        return true;
    },
    onEnter:function(){
        this._super();
    },
    onSelectNetwork:function(sender)
    {
        fr.view(ScreenNetwork);
    },
    onSelectLocalization:function(sender)
    {
        fr.view(ScreenLocalization);
    },
    onSelectDragonbones:function(sender)
    {
        fr.view(ScreenDragonbones);
    },
    onClickImage:function (sender) {
        cc.log('Super hot hot dog')
    }

});