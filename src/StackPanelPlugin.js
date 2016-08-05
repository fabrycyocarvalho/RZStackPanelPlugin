/**
 * Created by anderson.santos on 05/08/2016.
 */
rz.plugins.StackPanelPlugin = function(params){
    var helpers = {
        defaultitemRenderer:function(data,sender){
            var sb = new StringBuilder();
            sb.appendFormat('<div id="{0}_item_{1}" class="draggable item">{2}</div>',
                sender.params.baseID,
                generateRandomID(),
                data
            );
            return sb.toString();
        },
        defaultEventHandlers: {
            afterRender:undefined,
            beforeRender:undefined,
            buildingContent:undefined
        }
    };
    var $this = this;
    var initialize = function(){
        var defaultParams = {
            orientation:"vertical",
            verticalContainerStyle:"ui vertical menu",
            horizontalContainerStyle:"ui menu",
            target:"div .rutezangada-stack-panel-container",
            baseID:generateRandomID(),
            itemRenderer: helpers.defaultitemRenderer,
            eventHandlers: helpers.defaultEventHandlers
        };
        $this.params = $.extend(true, {}, defaultParams, params);
        render();
    };

    var resolveContainerClass = function(){
        var params = $this.params;
        return params.orientation=="vertical"?
            params.verticalContainerStyle:
            params.horizontalContainerStyle;
    };
    var raiseEvent = function(event,args){
        if($this.params.eventHandlers[event]) $this.params.eventHandlers[event]($this,args);
    };
    
    var render = function(){
        var params = $this.params;
        var sb = new StringBuilder();
        raiseEvent("beforeRender");
        sb.appendFormat('<div id="{0}" class="{1}">',params.baseID,resolveContainerClass());
        raiseEvent("buildingContent");
        sb.appendFormat('</div>');
        $(params.target).html(sb.toString());
        raiseEvent("afterRender");
    };

    this.addItem = function(itemData,afterRenderAction){
        var html = $this.params.itemRenderer(itemData,$this);
        var el = $(html);
        el.appendTo("#" + $this.params.baseID);
        if(afterRenderAction) afterRenderAction($this,{newElement: el});
    };

    initialize();
};