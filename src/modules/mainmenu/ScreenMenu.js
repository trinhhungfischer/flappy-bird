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

        // var yBtn = 3*size.height/5;

        var xBtn = size.width / 2;

        var btnStart = gv.commonButton(200, 64, xBtn, 3 * cc.winSize.height / 4, "Start");
        this.addChild(btnStart);
        btnStart.addClickEventListener(this.onSelectStart.bind(this));

        var btnFeedBack = gv.commonButton(200, 64, xBtn,cc.winSize.height / 2,"Feed Back");
        this.addChild(btnFeedBack);
        btnFeedBack.addClickEventListener(this.onSelectFeedBack.bind(this));

        var btnSetting = gv.commonButton(200, 64, xBtn, cc.winSize.height / 4,"Setting");
        this.addChild(btnSetting);
        btnSetting.addClickEventListener(this.onsSelectSetting.bind(this));

        var background = new cc.Sprite(res.imageBackgroundMain);

        background.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(background, -999);


        return true;
    },
    onEnter:function(){
        this._super();
    },
    onSelectStart:function(sender)
    {
        fr.view(GameLayer);
    },
    onSelectFeedBack:function(sender)
    {
        fr.view(ScreenLocalization);
    },
    onsSelectSetting:function(sender)
    {
        fr.view(SettingsLayer);
    }

});