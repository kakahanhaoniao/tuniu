/*
 * 移动端焦点图组件封装
 */
function Slide(){
}
Slide.prototype={
    constructor:Slide,
    init:function(prop){
        this.px=this.mx=this.disx=0,this.timer=null;
        this.index=0;
        this.obj=this.box=this.imgList=this.tabList=null;
        this.opt={
            container:'.banner',
            containBox:'ul',
            imgList:'li',
            tabBox:'#tabSlide',
            tabList:'a',
            direction:'left'
        };
        $.extend(this.opt,prop);
        this.obj=$(this.opt.container);
        this.box=this.obj.find(this.opt.containBox);
        this.imgList=this.obj.find(this.opt.imgList);
        this.tabList=$(this.opt.tabBox).find(this.opt.tabList);
        this.len=this.imgList.length;
        var _this=this;
        this.obj.on('touchstart',function(ev){
            _this.moveStart.call(_this,ev);
        });
        this.obj.on('touchmove',function(ev){
            _this.moveDown.call(_this,ev);
        });
        this.obj.on('touchend',function(ev){
            _this.moveUp.call(_this,ev);
        });
        this.auto.call(this);
    },
    moveStart:function(ev){
        ev=(ev||window.event).changedTouches[0];
        this.px=ev.clientX;
        this.left=parseFloat(this.box.css('left'));
        clearInterval(this.timer);
        clearInterval(this.box.stop());
    },
    moveDown:function(ev){
        ev=(ev||window.event).changedTouches[0];
        this.disx=ev.clientX-this.px;
        this.box.css('left',this.left+this.disx+'px');
    },
    moveUp:function(ev){
        ev=(ev||window.event).changedTouches[0];
        this.disx=ev.clientX-this.px;
        this.index=Math.round(-(this.left+this.disx)/parseFloat(this.obj.css('width')));
        if(this.index<0){
            this.index=0;
        }else if(this.index>=this.len){
            this.index=this.len-1;
        }    
        this.play();
        this.auto();
    },
    play:function(){
        this.tabList.removeClass('on');
        this.tabList.eq(this.index).addClass('on');
        this.box.animate({'left':-parseFloat(this.obj.css('width'))*this.index},300);
    },
    auto:function(ev){    
        var _this=this;
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.index++;
            _this.index%=_this.len;
            _this.play();
        },2000);
        
    }
};

window.onload=function(){
    load();
    // 焦点图
    window.a=new Slide();
    a.init();
};
window.onresize=load;

function load(){
    // 设置html的fontsize
    var w=document.documentElement.clientWidth>800?800:document.documentElement.clientWidth;
    var fontS=w/10;
    document.getElementsByTagName('html')[0].style.fontSize=fontS+'px';
}




