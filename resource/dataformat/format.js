var bp = {                      //   bp====>  baseOption 缩写
    dynasty: [0, 0],            //get           代的范围 便利分析得到
    nodeWidth: 100,             //init          节点宽度 初始定义
    nodeHeight: 100,            //init          节点高度 初始定义
    dynastyWidth: 160,          //init          每代宽度 初始定义
    canvasWidth: 800,           //Calculation   画布绘图区域宽度    计算得到
    canvasHeight: 900,          //Calculation   画布绘图区域高度    计算的到
    maxYnums:0
}
$.get('resource/dataformat/data.js', function (resultData) {
    var listData = resultData[0].nodeTree;
    listData.push(resultData[0].nodeFirst);
    $.each(listData, function (a, b) {
        b.children = ""
    })
    ftt.init(listData);
}, "json");

var ftt = {        //   ftt====>  formatToTree 缩写
    init: function (data) {
        data=ftt.setX(data);
        console.log(data);

    },
    setX: function (data) {//设置横向位置
        data = $.tool.JsonTool.prseTree(data, 'children');
        $.each(data, function (a, b) {
            if (b.NODE_NUMBER_UNIFY > bp.dynasty[1]) bp.dynasty[1] = b.NODE_NUMBER_UNIFY;
            if ($.tool.isEmpty(b.KINSHIP)) bp.dynasty[0] = b.NODE_NUMBER_UNIFY;
        })

        $.each(data, function (a, b) {
            b.setX = bp.dynastyWidth / 2 + (b.NODE_NUMBER_UNIFY - bp.dynasty[0]) * bp.dynastyWidth;
        });

        data = $.tool.JsonTool.toTree(data, 'NODE_ID', 'RELATION_RELATED_ID', 'children');
        console.log(data);
        data[0]=ftt.getCont(data[0]);
        data[0].eachNUM=0;
        data[0]=ftt.setY(data,0);
        return data;
    },
    getCont: function (data) {//获取总数
        if(!$.tool.isEmpty(data.children)){
            data.setNumRound1=0;
            $.each(data.children,function(a,b){
                b.eachNUM=a;
                b=ftt.getCont(b);
                data.setNumRound1+=b.setNumRound1;
            })
        }else{
            data.setNumRound1=1;
        }
        return data;
    },
    setY:function(data,i){
        if(i==0){

            if($.tool.isEmpty(data[i].children)){
                data[i].setY=1;
            }else{
                if(data.eachNUM!=0){
                    data.setY=0;
                }
                $.each(data[i].children,function(a,b){
                    data[i].children=ftt.setY(data[i].children,a);
                });
                if(data.eachNUM==0){
                    data[i].setY=0;
                }else{
                    data[i].setY=data[i].children[data[i].children.length-1].setY
                }
            }

        }else{

            if($.tool.isEmpty(data[i].children)){
                data[i].setY=data[i-1].setY+1;
            }else{
                data[i].setY=data[i-1].setY+1;
                $.each(data[i].children,function(a,b){
                    data[i].children=ftt.setY(data[i].children,a);
                });
                if(data.eachNUM==0){
                    data[i].setY=0;
                }else{
                    data[i].setY=data[i].children[data[i].children.length-1].setY
                }
            }
        }
        return data;
    }

}