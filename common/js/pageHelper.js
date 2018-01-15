//注意该帮助工具基于jq, 数值请带上单位，默认是rem
;(function() {
  var PageHelper = {
    //初始化需要的element
    initDom: function() {

    },
    /**
     * 计算页面的rem值，默认为计算宽度
     *
     * @param {string} length UI图的宽或高的px值
     * @param {string} type 计算的类型，默认为计算宽度
     */
    rePosition: function(length, type) {
      var screenLength = (type == 'height') ? $('body').height() : $('body').width();
      var ratio = screenLength / length;
      $('html').css('font-size', 100*ratio + 'px');
    },
    /**
     * 设置包裹层的背景
     *
     * @param {string} url 图片的地址
     */
    setWrapImage: function(url) {
      var bg = $('.bg');
      bg.css('background-image', 'url('+url+')');
      bg.show();
    },
    /**
     * 设置包裹层的背景色
     *
     * @param {string} color 颜色值
     * @param {float} number 透明度数值，应为小数
     */
    setWrapColor: function(color, number) {
      var bg = $('.bg');
      if (!!number) {
        bg.css('background-color', color);
        bg.css('-moz-opacity', number);
        bg.css('-khtml-opacity', number);
        bg.css('opacity', number);
        bg.css('filter', number);
      }

      bg.show();
    },
    /**
     * 设置包裹层内主体图片
     *
     * @param {object} data 传入的数据
        data: {
          {string} url 图片地址
          {string} width 图片宽度，带有单位的字符串(必传)
          {string} heigt 图片高度，带有单位的字符串(必传)
          {string} top 图片定位的top带有单位的字符串
          {string} left 图片定位的left带有单位的字符串
          {string} marginLeft 图片定位的margin-left带有单位的字符串,用于更准确的定位
        }
     */
    setContentImg: function(url, width, heigt, top, left, marginLeft) {
      var content = $('.content');
      content.css('background-image', 'url('+url+')');

      content.show();
    },
    /**
     * 设置页面关闭按钮
     *
     *url, width, heigt, top, left, marginLeft
     */
    setPageDelBtn: function(data) {

    },
    /**
     * 设置页面成功弹窗,默认居中
     *
     *url, width, heigt, top, left, marginLeft
     */
    setPopSuc: function(data) {

    },
    /**
     * 设置详情弹窗,默认居中
     *
     *url, width, heigt, top, left, marginLeft
     */
    setPopDetail: function(data) {

    },
    /**
     * 详情弹窗开或关
     */
    popDetailToggle: function() {

    },
    /**
     * 详情弹窗开或关
     *
     */
    popSucToggle: function(data) {

    },
    /**
     * 请求的签名生成
     *
      @param {string} key 签名的关键字字符串
      @param {string} params 请求参数（除签名外）
      @param {string} time 时间戳
     */
     getSigin: function(key, params, time) {
      var str = '';
      time = time + '';
      for (var k in params) {
        if (k != 'time') {
          str += params[k]+'';
        }
      }

      str += key;
      return $.md5($.md5(str) + time);
     },
    /**
     * 消息弹窗,默认居中,默认3s自动关闭
     *
     * @param {string} msg 弹窗信息
     */
    popMsg: function(msg) {

    },
    /**
     * 添加消息弹窗
     */
     addPop: function() {

     },
     /**
      * 元素定位 absolute
      *
      * @param {object} el jq元素，应先通过jq的转换
      * @param {object} data
      * top, left, marginLeft
      */
     position: function(el, data) {
       if (!!data.top) {
         el.css('top', data.top);
       } else {

       }

     },
     /**
     * 元素位置设置
     *
     * @param {object} el jq元素，应先通过jq的转换
     * @param {object} data
     * top, left, marginLeft
     */
    setLocation: function(el, data) {
      if (!!data.top) {
        el.css('top', data.height);
      } else {
        PageHelper.heightCenter(el, data);
      }
    },
     /**
     * 元素高度设置 利用absolute定位和已知高度,无top则垂直居中
     *
     * @param {object} el jq元素，应先通过jq的转换
     * @param {object} data
     * top, left, marginLeft
     */
    setHeight: function(el, data) {
      if (!!data.top) {
        el.css('top', data.height);
      } else {
        PageHelper.heightCenter(el, data);
      }
    },
    /**
    * 元素垂直居中 利用absolute定位和已知高度
    *
    * @param {object} el jq元素，应先通过jq的转换
    * @param {object} data
    * top, left, marginLeft
    */
    heightCenter: function(el, data) {

    },
     /**
     * 元素水平居中 利用absolute定位和已知宽度
     *
     * @param {object} el jq元素，应先通过jq的转换
     * @param {object} data
     * top, left, marginLeft
     */
     widthCenter: function(el, data) {

     },
      /**
      * 元素大小设定
      *
      * @param {object} el jq元素
      * @param {object} msg 弹窗信息
      * width, heigt带单位
      */
     setSize: function(el, data) {
       el.width(data.width);
       el.height(data.height);
     },
     getNum: function(str) {
       var reg = /^\d+[\.]?\d+/;
       str = (str+'').trim();

       return str.match(reg);
     },
     getStr: function(str) {
       var reg = /\D+$/;
       str = (str+'').trim();

       str.match(reg);
     }
  };
})();
