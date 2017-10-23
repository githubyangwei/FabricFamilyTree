//creatPedigreeCanvas  创建谱系树图，缩写为CPC
var CPC = {
    //生产图形
    creat: function (option) {
        this.drawNode(option);
        this.bindClickFn();
    },
    //分步：画节点
    drawNode: function (option) {
        $.each(option.data, function (na, nb) {
            var text = graph.createText((nb.NODE_SURNAME + nb.NODE_NAME), nb.setX, nb.setY * option.nodeHeight + 100);
            text.setStyle(Q.Styles.LABEL_BACKGROUND_COLOR, "rgba(255,255,255,0)");
            text.setStyle(Q.Styles.LABEL_COLOR, "#333");
            text.setStyle(Q.Styles.LABEL_PADDING, 0);
            text.setStyle(Q.Styles.LABEL_FONT_SIZE, 16);
            text.setStyle(Q.Styles.LABEL_RADIUS, 0);
            text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(option.nodeWidth, option.nodeHeight));
            text.setStyle(Q.Styles.SELECTION_COLOR, "none");
            text.nameS = "noMOVE";
            text.set('data', nb);
            CPC.drawFnPoint(text);
        })
        var getData = $.tool.JsonTool.toTree(option.data, 'NODE_ID', 'RELATION_RELATED_ID', 'children');

        this.drawLine(option, getData[0], getData[0].setX + 55, getData[0].setY * 100 + 100);
    },
    //分步：画线
    drawLine: function (option, data, x, y) {
        if (!$.tool.isEmpty(data.children)) {
            $.each(data.children, function (la, lb) {
                CPC.twoPointToline(x, y, lb.setX - 55, lb.setY * 100 + 100);
                CPC.drawLine(option, lb, lb.setX + 55, lb.setY * 100 + 100);
            })
        }
    },
    //分步：亮点画线
    twoPointToline: function (x1, y1, x2, y2) {
        console.log(x1, y1, x2, y2);
        var shape = graph.createShapeNode(Q.Consts.LINE_JOIN_TYPE_BEVEL, 0, 0);
        shape.moveTo(x1, y1);
        if (x1 != x2) {
            shape.lineTo(parseInt(x2 / 80) * 80 - 1, y1);
            shape.lineTo(parseInt(x2 / 80) * 80 - 1, y2);
        }
        shape.lineTo(x2-6, y2);
        shape.setStyle(Q.Styles.SHAPE_STROKE, 2);
        shape.setStyle(Q.Styles.SHAPE_STROKE_STYLE, "#fd7833");
        shape.setStyle(Q.Styles.LAYOUT_BY_PATH, true);
        shape.setStyle(Q.Styles.SHAPE_FILL_COLOR, null);
        shape.setStyle(Q.Styles.LINE_CAP, Q.Consts.LINE_CAP_TYPE_BUTT);
        shape.setStyle(Q.Styles.SELECTION_COLOR, "none");
        shape.name = "";
        shape.nameS = "noClick";

        var lineEndRole = graph.createNode("", x2-3, y2);
        lineEndRole.image = "lineEnd.svg";
        lineEndRole.setStyle(Q.Styles.SELECTION_COLOR, "none");
        lineEndRole.nameS = "noMOVE";
        lineEndRole.parent = shape;
    },
    //分步：画点击点
    drawFnPoint: function (obj) {
        var objData = obj.get('data');

        //人物按钮
        var rolePoint=graph.createNode("", objData.setX - 38, objData.setY * 100 + 100);
        rolePoint.image = (obj.NODE_SEX)?"women.svg":'men.svg';
        /*menuPoint.setStyle(Q.Styles.SELECTION_COLOR, "none");*/
        rolePoint.nameS = "noMOVE";
        rolePoint.Fn = (obj.NODE_SEX)?'women':"men";
        rolePoint.parent = obj;

        //添加按钮
        var addPoint = graph.createNode("", objData.setX - 38, objData.setY * 100 + 125);
        addPoint.image = "add.svg";
        /*addPoint.setStyle(Q.Styles.SELECTION_COLOR, "none");*/
        addPoint.nameS = "noMOVE";
        addPoint.Fn = 'add';
        addPoint.parent = obj;

        //修改按钮
        var editPoint=graph.createNode("", objData.setX, objData.setY * 100 + 125);
        editPoint.image = "edit.svg";
        /*editPoint.setStyle(Q.Styles.SELECTION_COLOR, "none");*/
        editPoint.nameS = "noMOVE";
        editPoint.Fn = 'edit';
        editPoint.parent = obj;

        //菜单按钮
        var menuPoint=graph.createNode("", objData.setX + 38, objData.setY * 100 + 125);
        menuPoint.image = "menu.svg";
        /*menuPoint.setStyle(Q.Styles.SELECTION_COLOR, "none");*/
        menuPoint.nameS = "noMOVE";
        menuPoint.Fn = 'menu';
        menuPoint.parent = obj;

        //加减按钮
        var BlockPoint=graph.createNode("", objData.setX + 38, objData.setY * 100 + 100);
        BlockPoint.image = "less.svg";
        /*BlockPoint.setStyle(Q.Styles.SELECTION_COLOR, "none");*/
        BlockPoint.nameS = "noMOVE";
        BlockPoint.Fn = 'less';
        BlockPoint.parent = obj;



    },
    //绑定点击事件
    bindClickFn: function () {
        graph.onclick = function (evt) {
            var clickObj = evt.getData();
            if(!$.tool.isEmpty(clickObj)){
                if (!!clickObj.Fn ) {
                    var ClickType = clickObj.Fn;
                    console.log(ClickType)
                    if (ClickType == 'add') {
                        alert('点击了添加了！！！')
                    }else if(ClickType=="edit"){

                    }else if(ClickType=="load"){

                    }else if(ClickType=="menu"){

                    }else if(ClickType=="hide"){

                    }
                }
            }
        };


    },
}