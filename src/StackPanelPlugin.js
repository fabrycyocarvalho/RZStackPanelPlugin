/**
 * Created by anderson.santos on 05/08/2016.
 */
rz.plugins.StackPanelPlugin = function(params){
    var helpers = {
        defaultitemRenderer:{
            render: function(data,sender){
                var sb = new StringBuilder();
                sb.appendFormat('<div id="{0}_item_{1}" class="{3}">{2}</div>',
                    sender.params.baseID,
                    generateRandomID(),
                    data,
                    sender.params.stackItemClass
                );
                return sb.toString();
            },
            initialize:undefined
        }
        ,
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
            verticalContainerStyle:"ui vertical fluid menu",
            horizontalContainerStyle:"ui menu",
            target:"div .rutezangada-stack-panel-container",
            baseID:generateRandomID(),
            itemRenderer: helpers.defaultitemRenderer,
            eventHandlers: helpers.defaultEventHandlers,
            stackItemClass: "draggable item",
            sortParams:{
                group: params.target.replace("#",""),
                containerSelector: "div.tab-container",
                itemSelector: "div.item",
                placeholder: '<div class="placeholder"></div>',
                delay: 300,
                vertical: true,


                //testando
                isValidTarget: function ($item,container) {
                    //console.log(container.target);
                    return !($this.movingContainer && container.target.hasClass("subgroup"));
                },

                onDragStart: function ($item, container) {
                    $item.css({height: $item.outerHeight(),width: $item.outerWidth()});
                    $item.addClass(container.group.options.draggedClass);
                    $("body").addClass(container.group.options.bodyClass);
                    $this.movingContainer = $item.hasClass("sub-container");
                }
            }
        };
        $this.params = $.extend(true, {}, defaultParams, params);
        render();
    };

    var resolveContainerClass = function(){
        var params = $this.params;
        return params.orientation=="vertical"?
            params.verticalContainerStyle + " rz-vertical-stackpanel":
            params.horizontalContainerStyle + " rz-horizontal-stackpanel";
    };
    var raiseEvent = function(event,args){
        if($this.params.eventHandlers[event]) $this.params.eventHandlers[event]($this,args);
    };
    
    var render = function(){
        var params = $this.params;
        var sb = new StringBuilder();
        raiseEvent("beforeRender");
        sb.appendFormat('<div id="{0}" class="{1} tab-container rutezangada-stack-panel-container">',params.baseID,resolveContainerClass());
        raiseEvent("buildingContent");
        sb.appendFormat('</div>');
        $(params.target).html(sb.toString());

        var p = params.sortParams;
        p.vertical = (params.orientation=="vertical");

        $("#" + params.baseID).sortable(p);
        raiseEvent("afterRender");

    };

    var resolveItemRenderer = function(r){
        if(r===undefined){
            return  $this.params.itemRenderer;
        }
        else{
            if(typeof(r)=="string"){
                //return registered-items-renderer[r]
                throw "not implemented yet"
            }
            else{
                return r;
            }
        }
    };

    var plotItem = function(el, pos){
        if(pos===undefined){
            el.appendTo("#" + $this.params.baseID);
        }
        else{
            var refItem = $("#" + $this.params.baseID).children()[pos];
            if(refItem !==undefined){
                el.insertBefore(refItem);
            }
            else{
                el.appendTo("#" + $this.params.baseID);
            }
        }
    };

    this.addItem = function(itemData,customrender){
        var itemRenderer = resolveItemRenderer(customrender);
        var html = itemRenderer.render(itemData,$this);
        var el = $(html);
        plotItem(el);
        if(itemRenderer.initialize) itemRenderer.initialize(itemData,$this,el);
    };

    this.insertItem = function(itemData,pos,customrender){
        var itemRenderer = resolveItemRenderer(customrender);
        var html = itemRenderer.render(itemData,$this);
        var el = $(html);
        plotItem(el,pos);
        if(itemRenderer.initialize) itemRenderer.initialize(itemData,$this,el);
    };

    this.removeItem = function(selector){
        $("#" + $this.params.baseID).children(selector).detach();
    };

    this.removeItemAt = function(pos){
        $($("#" + $this.params.baseID).children()[pos]).detach();
    };
    initialize();
};