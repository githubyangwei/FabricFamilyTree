//creatPedigreeCanvas  创建谱系树图，缩写为CPC
var CPC={
    //生产图形
    creat:function(option){
        this.drawNode(option);

    },
    //分步：画节点
    drawNode:function(option){
        $.each(option.data,function(na,nb){
            var text = graph.createText((nb.NODE_SURNAME+nb.NODE_NAME),nb.setX,nb.setY*option.nodeHeight+100);
            text.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "#ffffff");
            text.setStyle(Q.Styles.LABEL_COLOR, "#333");
            text.setStyle(Q.Styles.LABEL_PADDING, 0);
            text.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
            text.setStyle(Q.Styles.LABEL_RADIUS, 0);
            text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(option.nodeWidth, option.nodeHeight));
            text.setStyle(Q.Styles.SELECTION_COLOR, "none");
            text.nameS="noMOVE";
            var label2 = new Q.LabelUI();
            label2.position = Q.Position.CENTER_TOP;
            label2.anchorPosition = Q.Position.CENTER_BOTTOM;
            label2.border = 1;
            label2.padding = new Q.Insets(2, 5);
            label2.showPointer = true;
            label2.offsetY = -10;
            label2.backgroundColor = "blue";
            label2.fontSize = 16;
            label2.fontStyle = "italic 100";
            text.addUI(label2, [{
                property : "label2",
                propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
                bindingProperty : "data"
            }, {
                property : "label2.color",
                propertyType : Q.Consts.PROPERTY_TYPE_CLIENT,
                bindingProperty : "color"
            }]);
            text.set("label2", "another label");
            text.set("label2.color", "red");

        })
        var getData=$.tool.JsonTool.toTree(option.data, 'NODE_ID', 'RELATION_RELATED_ID', 'children');

        this.drawFnPoint(option,getData[0],getData[0].setX+55,getData[0].setY*100+100);
    },
    //分步：画功能点
    drawFnPoint:function(option,data,x,y){
        if(!$.tool.isEmpty(data.children)){
            $.each(data.children,function(la,lb){
                CPC.twoPointToline(x,y,lb.setX-55,lb.setY*100+100);
                CPC.drawFnPoint(option,lb,lb.setX+55,lb.setY*100+100);
            })
        }
    },
    twoPointToline:function(x1,y1,x2,y2){
        console.log(x1,y1,x2,y2);
        var shape = graph.createShapeNode(Q.Consts.LINE_JOIN_TYPE_BEVEL, 0, 0);
        shape.moveTo(x1, y1);
        if(x1!=x2){
            shape.lineTo(parseInt(x2/80)*80-1,y1);
            shape.lineTo(parseInt(x2/80)*80-1,y2);
        }
        shape.lineTo(x2, y2);
        shape.setStyle(Q.Styles.SHAPE_STROKE, 2);
        shape.setStyle(Q.Styles.SHAPE_STROKE_STYLE, "#fd7833");
        shape.setStyle(Q.Styles.LAYOUT_BY_PATH, true);
        shape.setStyle(Q.Styles.SHAPE_FILL_COLOR, null);
        shape.setStyle(Q.Styles.LINE_CAP, Q.Consts.LINE_CAP_TYPE_BUTT);
        shape.setStyle(Q.Styles.SELECTION_COLOR, "none");
        shape.name="";
        shape.nameS="noClick";
    },
    //分步：画线
    drawLine:function(graph,option){

    },
    //绑定点击事件
    bindClickFn:function(){

    }
}