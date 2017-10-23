var bp = {                      //   bp====>  baseOption 缩写
    dynasty: [0, 0],            //get           代的范围 便利分析得到
    nodeWidth: 110,             //init          节点宽度 初始定义
    nodeHeight: 100,            //init          节点高度 初始定义
    dynastyWidth: 160,          //init          每代宽度 初始定义
    canvasWidth: 800,           //Calculation   画布绘图区域宽度    计算得到
    canvasHeight: 900,          //Calculation   画布绘图区域高度    计算的到
    maxYnums: 0,                 //Calculation   最大Y值
    data:""                      //Calculation    节点数据
}
$.get('resource/dataformat/data.js', function (resultData) {
    console.log(resultData);
    var listData = resultData[0].nodeTree;
    listData.push(resultData[0].nodeFirst);
    $.each(listData, function (a, b) {
        b.children = ""
    })
    bp.data=ftt.format(listData);
    creatLineTopBlock(bp);
}, "json");

//数据处理获得option

var graph = new Q.Graph(canvas);
var p = graph.toLogical(0, 0);
graph.zoomOut(p.x, p.y);
graph.zoomIn(p.x, p.y);
graph.limitedBounds = {x: 0, y: 0, width: 100*160, height: 20000};
graph.minScale=0.5
graph.maxScale=2

graph.limitedBounds = {x: 0, y: 0, width: 2000, height: 2000}

graph.originAtCenter = false;
//重写滚轮事件  滚轮滚动 基于左上角放大缩小
graph.enableWheelZoom = false;
graph.onmousewheel = function (evt) {
    var zoominDelta = evt.delta;
    if (zoominDelta > 0) {
        return this.zoomIn(0, 0);
    }
    return this.zoomOut(0, 0);
}
//锁定移动功能
graph.isMovable = function (item) {
    return (item.nameS=="noClick"||item.nameS=="noMOVE")?false:true;
}
graph.isSelectable = function (item) {
    return (item.nameS=="noClick")?false:true;
}

var fixedJson=[];

function createShape( join,x, y,height){//画竖着的线
    var shape = graph.createShapeNode(join, x, y);
    shape.moveTo(0, 0);
    shape.lineTo(0, height);
    shape.setStyle(Q.Styles.SHAPE_STROKE, 2);
    shape.setStyle(Q.Styles.SHAPE_STROKE_STYLE, "#e6e6e6");
    shape.setStyle(Q.Styles.LAYOUT_BY_PATH, true);
    shape.setStyle(Q.Styles.SHAPE_FILL_COLOR, null);
    shape.setStyle(Q.Styles.LINE_CAP, Q.Consts.LINE_CAP_TYPE_BUTT);
    shape.setStyle(Q.Styles.SELECTION_COLOR, "none");
    shape.name="";
    shape.nameS="noClick";
    shape.set('location', {x: x, y: y});
    graph.callLater(function(){updateLocation(shape)});
    fixedJson.push(shape);
}

function creatLable(num,x,y,width,height,allHeight) {//画多少多少代
    var text = graph.createText("第"+num+"代",x,y);
    text.setStyle(Q.Styles.LABEL_OFFSET_X, 80);;//X偏移
    text.setStyle(Q.Styles.LABEL_OFFSET_Y,24);//Y偏移
    text.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, (num%2==0?'#fafafa':"#f5f5f5"));
    text.setStyle(Q.Styles.LABEL_COLOR, "#6d6d6d");
    text.setStyle(Q.Styles.LABEL_PADDING, 0);
    text.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
    text.setStyle(Q.Styles.LABEL_RADIUS, 0);
    text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(width, height));
    text.setStyle(Q.Styles.SELECTION_COLOR, "none");
    text.nameS="noClick";
    text.set('location', {x: x, y: y});
    graph.callLater(function(){updateLocation(text)});
    fixedJson.push(text);

}



function creatLineTopBlock(option){//底层分格+设置节点
    if(option.dynasty[1]-option.dynasty[0]<100)option.dynasty[1]=option.dynasty[0]+100;
    for(var i=option.dynasty[0];i<=option.dynasty[1];i++){
        creatLable(i,(i-option.dynasty[0])*160,0,160,48,20000);
        createShape(Q.Consts.LINE_JOIN_TYPE_BEVEL,(i-bp.dynasty[0]+1)*160, 0,20000);
    }
    CPC.creat(option);
}

function updateLocation(node){
    var location = node.get('location');
    if(!location){
        return;
    }
    var xy = graph.toLogical(location.x, location.y);
    node.x = node.x;
    node.y = xy.y;
}

graph.propertyChangeDispatcher.addListener(function(evt){
    if(evt.kind == 'transform'){
        for(var i in fixedJson){
            updateLocation(fixedJson[i]);
        }
    }
});


//设置右上角缩略图显示
var overview = new Q.Overview(document.getElementById('overview'));
overview.setGraph( window.graph);
graph.navigationType = Q.Consts.NAVIGATION_BUTTON;