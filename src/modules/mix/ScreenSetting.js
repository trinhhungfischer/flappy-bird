
var SettingsLayer = cc.Layer.extend({
    item2:null,
    _mode:null,

    ctor:function(){
        this._super();
        this.init();
    },
    init:function () {
        // var sp = new cc.Sprite(res.loading_png);
        // sp.anchorX = 0;
        // sp.anchorY = 0;
        // sp.scale = MW.SCALE;
        // this.addChild(sp, 0, 1);
        //
        // var cacheImage = cc.textureCache.addImage(res.imageBackgroundMain);
        // var title = new cc.Sprite(cacheImage, cc.rect(0, 0, 134, 39));
        // title.x = winSize.width / 2;
        // title.y = winSize.height - 120;
        // this.addChild(title);


        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title1 = new cc.MenuItemFont("Sound");
        title1.setEnabled(false);
        title1.setColor(cc.color(MW.FONTCOLOR));

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item1 = new cc.MenuItemToggle(
            new cc.MenuItemFont("On"),new cc.MenuItemFont("Off"));
        item1.setCallback(this.onSoundControl );
        item1.setColor(cc.color(MW.FONTCOLOR));
        var state = MW.SOUND ? 0 : 1;
        item1.setSelectedIndex(state);

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title2 = new cc.MenuItemFont("Mode");
        title2.setEnabled(false);
        title2.setColor(cc.color(MW.FONTCOLOR));

        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);

        this.item2 = new cc.MenuItemToggle(
            new cc.MenuItemFont("Easy"),
            new cc.MenuItemFont("Normal"),
            new cc.MenuItemFont("Hard"));
        this.item2.setColor(cc.color(MW.FONTCOLOR));
        this.item2.setCallback( this.onModeControl );


        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var label = new cc.LabelTTF("Go back", "Arial", 20);
        label.setColor(cc.color(MW.FONTCOLOR));
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        back.scale = 0.8;

        var menu = new cc.Menu(title1, title2, item1, this.item2, back);
        menu.alignItemsInColumns(2, 2, 1);
        this.addChild(menu);


        back.y -= 50;

        return true;
    },
    onBackCallback:function (pSender) {
        var scene = new cc.Scene();
        scene.addChild(new ScreenMenu());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onSoundControl:function(){
        MW.SOUND = !MW.SOUND;
    },

    onModeControl:function(){

        var mode = this.item2.getSelectedItem();

        cc.log(mode);
    }
});
