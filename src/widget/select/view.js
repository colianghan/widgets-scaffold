/**
 * Created by hanguoliang on 2016/12/23.
 *
 * @select view.js
 *
 */

(function(win,$,TPL){
    function Select (opts){
        this.opts = opts;
        this.el = opts.el;
        this.$el = $(opts.el);
        this.template = TPL.view.select;
        this.init();
        this.bindEvents();
        this.render();
    }
    $.extend(Select.prototype,{
        $:function(select){
            return this.$el.find(select);
        },
        init:function(){

        },
        bindEvents:function(){
            this.$el.on('click','h2',function(){
                alert(2);
            });
        },
        remove:function(){
            this.$el.remove();
        },
        render:function(){
            var data = this.opts.data || {};
            this.$el.html(this.template(data));
        }
    });
    TPL.widgets = TPL.widgets || {};
    TPL.widgets.Select = Select;
})(window,jQuery,window.TPL||{});

