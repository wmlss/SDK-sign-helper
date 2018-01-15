// require("../common/lib/jquery-1.9.1.min");
var service = require("../components/service/service.js");
var common = require("../common/js/common.js");
var device = service.device();
var domain = 'http://m.api.m.37.com';

// var pid = parseInt(common.parseUri().params["pid"]) || '';
// var gid = parseInt(common.parseUri().params["gid"]) || '';
// var sversion = common.parseUri().params["sversion"] || '';
// var dev = common.parseUri().params["dev"] || '';
// var token = common.parseUri().params["token"] || '';
window.count = 0; //记录签到天数

//2.执行
$(function(){
	// Page.rePosition(500);
	$(window).load(function() {
		// Page.rePosition(500);
		// Page.addPop();
		// Page.init();
	});
	// $(window).resize(function() {
	// 	Page.rePosition(500);
	// });
});

var Page ={
	init: function(){
		//获取已签的天数
		Page.getSignDays();
		//添加dom事件
		Page.dom();
	},
	//dom事件
	dom: function(){
		//添加弹窗关闭事件
		$('.popSuccess .popCloseBtn').bind('click', function() {
			$('.popWrap').css('visibility', 'hidden');
			$('.popSuccess').css('visibility', 'hidden');
			device.close();
		});

		$('.popDetail .popCloseBtn').bind('click', function() {
			$('.popWrap').css('visibility', 'hidden');
			$('.popDetail').css('visibility', 'hidden');
		});

		//添加签到事件
		$('.signBtn').bind('click', function() {
			Page.sign();
		});

		//添加打开活动详情页事件
		$('.detialBtn').click(function() {
			$('.popWrap').css('visibility', 'visible');
			$('.popDetail').css('visibility', 'visible');
		});

		//添加关闭整个弹窗事件
		$('.closeBtn').bind('click', function() {
			device.close();
		});
	},
	//获取已签的天数
	getSignDays: function() {
		var data = getRequstData();

		$.ajax({
			url: domain + '/lottery/signed_count',
			data: data,
			type: 'GET',
			dataType: 'jsonp',
			// timeout: 2000,
			success: function(response) {
				var state = response.state;
				if (state == 1) {
					window.count = response.data.count;
					if (window.count != 0) {
						creatSignedDay(window.count);
					}
				} else {
					Page.popMsg(response.msg);
				}
			},
		});
	},
	//调用签到接口
	sign: function() {
		var data = getRequstData();

		$.ajax({
			url: domain + '/lottery/dosigned',
			data: data,
			type: 'GET',
			dataType: 'jsonp',
			success: function(response) {
				var state = response.state;

				if (state == 1) {
					Page.popSuc();
					//签到天数加1
					creatSignedDay(++window.count);
				} else {
					Page.popMsg(response.msg);
				}
			},
		});
	},
	// 成功提示
	popSuc: function() {
		$('.popWrap').css('visibility', 'visible');
		$('.popSuccess').css('visibility', 'visible');
	},
	//添加消息弹窗
	addPop: function() {
		var body = $('body');
		var popNode = $('<div class="popBox"><div class="contentBox"><span id="popMsg"></span></div></div>');
		body.append(popNode);
		$('.popBox').hide();
	},
	//消息弹窗调用，3.5秒后消失
	popMsg: function(msg) {
		$('#popMsg').text(msg);
		$('.popBox').show();
		setTimeout(function() {
			$('.popBox').hide();
		}, 3500);
	},
	//计算rem
	rePosition: function(imgPX) {
		var width = $('body').width();
		var ratio = width / imgPX;

		$('html').css('font-size', 100*ratio + 'px');
	},
};
//同步页面签到天数
function creatSignedDay(num) {
	var items = $('.dayBoxs div');
	for (var i = 0; i<num && i<4; i++) {
		var day = i+1;
		var className = 'img ' + 'img' + day + 'ed';
		$(items[i]).attr('class', className);
	}
}
//获得取得签到天数接口和签到接口的参数
function getRequstData() {
	var key=";CPaRKFSmZgG9MA_rDVubdloiByj0tUW";
	var date = new Date();
	var time =  Math.floor(Date.parse(date)/1000);
	// var time = Date.parse(new Date());
	var param = {
		time: time,
		pid: pid,
		gid: gid,
		dev: dev,
		token: token,
		sversion: sversion,
	};

	param.sign = $.md5($.md5(param.pid.toString()+ param.gid.toString()  + param.dev.toString() +key)+time.toString());
	return param;

}
