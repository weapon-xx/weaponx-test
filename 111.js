page.addReadyFire(function () {
    this.require('GameNavigation',function(){
        var gameNav = new qv.zero.GameNavigation({
            appid : $('#focusHeader').data('args').appid, //gameName or appid
            afterInit : function(){
                var $focusHeader = $('#focusHeader');
                $('.fn-menu-nav-ul', $focusHeader).html( gameNav.menuCfg.html )
                var navCfg = gameNav.navCfg;
                var $navBtn = $('a.fn-focus-btn',$focusHeader).text('关注部落').unbind().click(function() {
                    zUtil.openUrl('https://buluo.qq.com/p/barindex.html?bid=363867&ADTAG=adtag.huodong', 0, 1);
                });

                if( ["gamePublicAccount","gcIndex"].indexOf( navCfg.name ) === -1 ){
                    $('img.fh-icon',$focusHeader).attr('src', navCfg.icon );
                    $('p.fh-main-title',$focusHeader).text( navCfg.mainTile );
                    $('p.fh-sub-title',$focusHeader).text( navCfg.subTitle );
                }
                gameNav.bindClick({ $focusHeader : $focusHeader, $navBtn : $navBtn });
            }
        });
    });
});
