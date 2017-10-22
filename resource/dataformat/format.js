

var ftt = {        //   ftt====>  formatToTree 缩写
    format: function (data) {
        data = ftt.setX(data);
        data[0] = ftt.getCont(data[0]);
        data[0].eachNUM = 0;
        bp.maxYnums = 0;
        data = ftt.setY(data, 0);
        return $.tool.JsonTool.prseTree(data,'children');
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

        return data;
    },
    getCont: function (data) {//获取总数
        if (!$.tool.isEmpty(data.children)) {
            data.setNumRound1 = 0;
            $.each(data.children, function (a, b) {
                b.eachNUM = a;
                b = ftt.getCont(b);
                data.setNumRound1 += b.setNumRound1;
            })
        } else {
            data.setNumRound1 = 1;
        }
        return data;
    },
    setY: function (data, parentY) {
        $.each(data, function (x, y) {
            if (x == 0) {
                if (bp.maxYnums == 0) {
                    y.setY = 0;
                } else {
                    y.setY = parentY;
                }
                if (!$.tool.isEmpty(y.children)) {
                    y.children = ftt.setY(y.children, y.setY);
                }
            } else {
                if (bp.maxYnums == 0) {
                    y.setY = data[x - 1].setY + 1;
                } else {
                    y.setY = bp.maxYnums + 1;
                }

                bp.maxYnums=y.setY;
                if (!$.tool.isEmpty(y.children)) {
                    y.children = ftt.setY(y.children, y.setY);
                }
            }
        });
        return data;
    }

}