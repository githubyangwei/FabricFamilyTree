$.__proto__.tool={
    isEmpty:function(fData){
        return ((fData==null) || (/^\s*$/.test(fData)));
    },
    /* 名称：getQueryString
         * 功能：获取网址参数
         * 参数：name 	参数的KEY值
         * 返回：对应的value
         */
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /*
     * 名  称：    setObjCookies
     * 功  能：    设置Cookies
     * 参  数：    key		缓存里对应的名称
     *			obj	对应的obj
     */
    setObjCookies: function(key, obj) {
        var jsonStr = JSON.stringify(obj);
        LS.set(key, jsonStr);
    },
    /*
     * 名  称：    removeObjCookies
     * 功  能：    删除Cookies
     * 参  数：    key		缓存里对应的名称
     */
    removeObjCookies: function(key) {
        LS.remove(key)
    },
    /*
     * 名  称：    getObjCookies
     * 功  能：    读取Cookies
     * 参  数：    key		缓存里对应名称
     */
    getObjCookies: function(key) {
        var getCookies=LS.get(key);
        if(toolFn.isEmpty(getCookies)){
            getCookies=null;
        }else{
            getCookies=JSON.parse(getCookies);
        }
        return getCookies;
    },
    /*
     * 名  称：    showDT
     * 功  能：    显示当前计算机的时间
     * 参  数：    idStr		要显示时间的标签的ID
     */
    showDT:function (idStr) {
        var currentDT = new Date();
        var y, m, date, day, hs, ms, ss, theDateStr;
        y = currentDT.getFullYear(); //四位整数表示的年份
        m = currentDT.getMonth() + 1; //月
        date = currentDT.getDate(); //日
        day = currentDT.getDay(); //星期
        hs = currentDT.getHours(); //时
        ms = currentDT.getMinutes(); //分
        ss = currentDT.getSeconds(); //秒
        if (ss < 10) {
            ss = '0' + ss;
        }
        if (ms < 10) {
            ms = '0' + ms;
        }
        if (hs < 10) {
            hs = '0' + hs;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (day === 1) {
            day = "一"
        }
        if (day === 2) {
            day = "二"
        }
        if (day === 3) {
            day = "三"
        }
        if (day === 4) {
            day = "四"
        }
        if (day === 5) {
            day = "五"
        }
        if (day === 6) {
            day = "六"
        }
        if (day === 0) {
            day = "日"
        }
        theDateStr = y + "-" + m + "-" + date + "  " + hs + ":" + ms + ":" + ss + " 星期" + day;
        document.getElementById(idStr).innerHTML = theDateStr;
        // setTimeout 在执行时,是在载入后延迟指定时间后,去执行一次表达式,仅执行一次
        window.setTimeout(function(){toolFn.showDT(idStr)}, 1000);
    },
    /*
     * 名  称：    JsonTool
     * 功  能：    处理json的函数
     * 函  数：	toTree    将Json转化为树状Json
     * 			prseTree  解析树结构
     */
    JsonTool: {
        /* 名称：toTree
         * 功能：将Json转化为树状Json
         * 参数：as > 传入的Json
         * 		 idStr > json对象的唯一标记key
         * 		 pidStr > json对象中存储的父级标记key
         * 		 chindrenStr > 子节点保存的key名
         * 返回：是树状json
         */
        toTree: function(as, idStr, pidStr, chindrenStr) {
            //格式化数据
            var r = [],
                hash = {},
                id = idStr,
                pid = pidStr,
                children = chindrenStr,
                i = 0,
                j = 0,
                a = JSON.parse(JSON.stringify(as));
            len = a.length;
            for (; i < len; i++) {
                hash[a[i][id]] = a[i];
            }
            for (; j < len; j++) {
                var aVal = a[j],
                    hashVP = hash[aVal[pid]];
                if (hashVP) {
                    !hashVP[children] && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                } else {
                    r.push(aVal);
                }
            }
            return r;
        },
        /* 名称：prseTree
         * 功能：解析树结构
         * 参数：argument > 传入的Json
         * 		 chindrenStr >  子节点的key
         * 返回：同级的json
         */
        prseTree: function(argument, chindrenStr) {
            var key = chindrenStr;
            var sp = [];
            for (var a = 0; a < argument.length; a++) {

                if (argument[a][key].length > 0) {
                    var sc = toolFn.JsonTool.prseTree(argument[a][key], key);
                    for (var i = 0; i < sc.length; i++) {
                        sp.push(sc[i]);
                    }
                }
                argument[a][key] = '';
                sp.push(argument[a]);

            };
            return sp;
        }
    }
}