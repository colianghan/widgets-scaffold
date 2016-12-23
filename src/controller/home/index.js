/**
 * Created by hanguoliang on 2016/12/23.
 *
 *
 */
var loadJs = function(w,cb){
    var i = w.length;
    w.forEach(function(v){
        var script = document.createElement('script');
        script.src = '../template/'+w+'/view.js';
        script.onload = function(){
            if(--i == 0){
                // 执行cb方法
                cb && cb();
            }
        };
        document.body.appendChild(script);
    });
};

document.addEventListener('DOMContentLoaded',function(){
    var widgets = ['select'];
    loadJs(widgets,function(){
        var Select = TPL.widgets.Select;
        new Select({
            el:document.querySelector('.container')
        });
    })
});