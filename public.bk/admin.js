$(function(){

	const socketio = io();
	var roomName = 'miki';
	var user = 'miki002';
	var type = 'client';
	var data = {'roomName':roomName, 'user':user, 'type':type};
	var str = JSON.stringify(data);

	socketio.emit('enter', str);


	socketio.on('enter_res',function(str1,str2){

		socketio.emit('req_init');

		var mt1 = JSON.parse(str1);
		mt1['miki'].forEach(function(val){
//			console.log("miki Member: " + val);
		});
		var mt2 = JSON.parse(str2);
		mt2['miki'].forEach(function(val){
//			console.log("miki Member Orgn: " + val);
		});

	});
	socketio.on('res_init',function(str){
		var obj = JSON.parse(str);
//		console.log("res_init======================", obj);
		initial(obj);
	});

	socketio.on('member_leave',function(data){

		var obj = JSON.parse(data);
		obj['miki'].forEach(function(val){
//			console.log("miki Member: " + val);
		});
	});


	var reloadID = null;
	socketio.on('info_add',function(str){

		var obj = JSON.parse(str);
		console.log("info_add======================受信", obj);


		if(!isEmpty(obj)){
			console.log("reloadID======================", reloadID);
			if(reloadID == null){
				reloadID = setTimeout(RL, 60000); //1分後にリロード
				function RL(){
					location.reload();
					console.log("リロードしました");
				};
			}else{
				clearTimeout(reloadID);
				reloadID = setTimeout(RL, 60000); //1分後にリロード
				function RL(){
					location.reload();
					console.log("リロードしました");
				};
			}

			kkk(obj); // 点滅処理
			ccc(obj); // 表示処理
			www(obj); // ログ表示

			// body点滅処理（一元的）
			$('.bd').css('animation-play-state','running');
			var timerBodyID = setTimeout(dispMsg, 10000); //10秒
			function dispMsg(){
				$('.bd').css('animation-play-state','paused');
				clearTimeout(timerBodyID);
				console.log("timerBodyクリア");
			};
		}else{
			console.log("non data");
		}
	});
	socketio.on('info_del',function(str){

		var obj = JSON.parse(str);
		console.log("info_del======================受信", obj);

		if(!isEmpty(obj)){

			ccc(obj); // 表示処理
			www(obj); // ログ表示

		}else{
			console.log("non data");
		}
	});
	socketio.on('info_recive',function(data){

//		console.log("info_recive ---------", data);
//		var obj = JSON.parse(data);

//		var n = obj['msg'].length;
//		console.log("文字数", n)
//		if(n<=12){
//			//12文字以下なら停止
//			$('.marquee-span').css({'padding-left':'0%','animation':'marquee 0s linear infinite'});
//		}else{
//			$('.marquee-span').css({'padding-left':'100%','animation':'marquee 30s linear infinite'});
//		}
//		$('#info_recive').text(obj['msg']);
	});




	const $input_usRate = $('#info_usRate');
	const $us_num = $('#us_num');
	var us_len = 0;

	$input_usRate.on('input', ()=>{
		us_len = $input_usRate.val().length;
		var n = String(us_len) +"文字";
		$us_num.text(n);
	});
	$(document).on('click', '#btn_us', function(event){

		var str = $('#info_usRate').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(us_len > 7){
			window.alert('文字数制限（７文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "米ドル";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
			socketio.emit('new_info', data);

			//入力リセット
			$('#info_usRate').val("");

			return true;
		}
	});


	const $input_audRate = $('#info_audRate');
	const $aud_num = $('#aud_num');
	var aud_len = 0;

	$input_audRate.on('input', ()=>{
		aud_len = $input_audRate.val().length;
		var n = String(aud_len) +"文字";
		$aud_num.text(n);
	});
	$(document).on('click', '#btn_aud', function(event){

		var str = $('#info_audRate').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(aud_len > 7){
			window.alert('文字数制限（７文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "豪ドル";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
			socketio.emit('new_info', data);

			//入力リセット
			$('#info_audRate').val("");

			return true;
		}
	});


	const $input_c5 = $('#c5_txt');
	const $c5_num = $('#c5_num');
	var c5_len = 0;

	$input_c5.on('input', ()=>{
		c5_len = $input_c5.val().length;
		var n = c5_len +"文字";
		$c5_num.text(n);
	});
	$(document).on('click', '#btn_c5_info', function(event){

		var str = $('#c5_txt').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(c5_len > 30){
			window.alert('文字数制限（30文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "外国株お知らせ";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
//			console.log("外国株お知らせ", data);
			socketio.emit('new_info', data);

			//入力リセット
			$("#c5_txt").val("");

			return true;
		}
	});


	const $input_c6 = $('#c6_txt');
	const $c6_num = $('#c6_num');
	var c6_len = 0;

	$input_c6.on('input', ()=>{
		c6_len = $input_c6.val().length;
		var n = c6_len +"文字";
		$c6_num.text(n);
	});
	$(document).on('click', '#btn_c6_info', function(event){

		var date = new Date($('#date-input').val());
		var day = date.getDate();
		var month = date.getMonth() + 1;
//		var year = date.getFullYear();
		var c6_schedule = month+"月"+day+"日";
		console.log(c6_schedule);

		var c6_txt = $('#c6_txt').val();

		if(c6_txt == "" || c6_schedule == ""){
			window.alert('未入力があります');
			return false;
		}else if(c6_len > 30){
			window.alert('文字数制限（30文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "今週の主な予定";
			tmp['msg'] = c6_schedule+'*:*'+c6_txt;

			var data = JSON.stringify(tmp);
			socketio.emit('new_info', data);

			$("#c6_txt").val("");
			$("#date-input").val("");

			return true;
		}
	});


	const $input_c7 = $('#c7_txt');
	const $c7_num = $('#c7_num');
	var c7_len = 0;

	$input_c7.on('input', ()=>{
		c7_len = $input_c7.val().length;
		var n = c7_len +"文字";
		$c7_num.text(n);
	});
	$(document).on('click', '#btn_c7_info', function(event){

		var str = $('#c7_txt').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(c7_len > 30){
			window.alert('文字数制限（30文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "売買停止のお知らせ";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
//			console.log("売買停止のお知らせ", data);
			socketio.emit('new_info', data);

			//入力リセット
			$("#c7_txt").val("");

			return true;
		}
	});


	const $input_c8 = $('#c8_txt');
	const $c8_num = $('#c8_num');
	var c8_len = 0;

	$input_c8.on('input', ()=>{
		c8_len = $input_c8.val().length;
		var n = c8_len +"文字";
		$c8_num.text(n);
	});
	$(document).on('click', '#btn_c8_info', function(event){

		var str = $('#c8_txt').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(c8_len > 30){
			window.alert('文字数制限（30文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "枠増加のお知らせ";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
//			console.log("枠増加のお知らせ", data);
			socketio.emit('new_info', data);

			//入力リセット
			$("#c8_txt").val("");

			return true;
		}
	});


	const $input_c9 = $('#c9_txt');
	const $c9_num = $('#c9_num');
	var c9_len = 0;

	$input_c9.on('input', ()=>{
		c9_len = $input_c9.val().length;
		var n = c9_len +"文字";
		$c9_num.text(n);
	});
	$(document).on('click', '#btn_c9_info', function(event){

		var str = $('#c9_txt').val();
		if(str == ""){
			window.alert('未入力です');
			return false;
		}else if(c9_len > 30){
			window.alert('文字数制限（30文字以下）を超えてます');
			return false;
		}else{
			var tmp = {}; //EX. data: {"category":"xxx", "msg":"TEST"}
			tmp['category'] = "商品部からのお知らせ";
			tmp['msg'] = str;

			var data = JSON.stringify(tmp);
//			console.log("商品部からのお知らせ", data);
			socketio.emit('new_info', data);

			//入力リセット
			$("#c9_txt").val("");

			return true;
		}
	});

	function isEmpty(obj){
		return !Object.keys(obj).length;
	}

	function initial(obj){

		www(obj);
		ccc(obj);
	}

	function c6sort(c6_txt){
		var c6_arr = Object.entries(c6_txt); //配列に変換
		c6_arr.sort(function(p1, p2){
			var p1Key = p1[0], p2Key = p2[0];
			if(p1Key < p2Key){ return -1; }
			if(p1Key > p2Key){ return 1; }
			return 0;
		});
		c6_txt = Object.fromEntries(c6_arr); //連想配列に戻す変換
//		console.log("ソート関数 c6sort", c6_txt);
		return c6_txt;
	}

	function updateTimeLV(unixtime){
		var timestamp = Number(unixtime);
		var dt = new Date(timestamp);
		var update_time = getNowDateWithString(dt);
		return update_time;
	}
	function updateTimeSV(unixtime){
		var timestamp = Number(unixtime);
		var dt = new Date(timestamp);
		var update_time = getNowDateWithStringSV(dt);
		return update_time;
	}

	// 点滅
	function kkk(obj){

		console.log("KKK点滅");

		var arr = Object.entries(obj); //オブジェクトを配列に変換
		var fast_data = arr.shift(); //最初のログが最新なので最初のデータを取得

		console.log("fast_data 点滅", fast_data);

		var new_data =  fast_data[1];

		if(new_data['category'] == "米ドル"){
			//US点滅
			$('#brink01').css('animation-play-state','running');
			var timer01 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink01').css('animation-play-state','paused');
				clearTimeout(timer01);
				console.log("timer01クリア");
			};
		}else if(new_data['category'] == "豪ドル"){
			//AUD点滅
			$('#brink02').css('animation-play-state','running');
			var timer02 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink02').css('animation-play-state','paused');
				clearTimeout(timer02);
				console.log("timer02クリア");
			};
		}else if(new_data['category'] == '外国株お知らせ'){
			//c5_info点滅
			$('#brink05').css('animation-play-state','running');
			var timer05 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink05').css('animation-play-state','paused');
				clearTimeout(timer05);
				console.log("timer05クリア");
			};
		}else if(new_data['category'] == '今週の主な予定'){
			//c6_info点滅
			$('#brink06').css('animation-play-state','running');
			var timer06 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink06').css('animation-play-state','paused');
				clearTimeout(timer06);
				console.log("timer06クリア");
			};
		}else if(new_data['category'] == '売買停止のお知らせ'){
			//c7_info点滅
			$('#brink07').css('animation-play-state','running');
			var timer07 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink07').css('animation-play-state','paused');
				clearTimeout(timer07);
				console.log("timer07クリア");
			};
		}else if(new_data['category'] == '枠増加のお知らせ'){
			//c8_info点滅
			$('#brink08').css('animation-play-state','running');
			var timer08 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink08').css('animation-play-state','paused');
				clearTimeout(timer08);
				console.log("timer08クリア");
			};
		}else if(new_data['category'] == '商品部からのお知らせ'){
			//c9_info点滅
			$('#brink09').css('animation-play-state','running');
			var timer09 = window.setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink09').css('animation-play-state','paused');
				clearTimeout(timer09);
				console.log("timer09クリア");
			};
		}
	}
	function www(obj){

//		console.log("www", obj);

		$('#logs').find('.log').remove();

		for (let key in obj) {
//			console.log(obj[key]['data01']);
			
			var val = obj[key]['data01'];
			var category = obj[key]['category']+" ";
			var timestamp = Number(obj[key]['unixtime']);
			var dt = new Date(timestamp);
			var date = getNowDateWithString(dt);

			var elm = "<li class='log'>"+ date +"："+ category + val + "</li>"
			$("#logs").append(elm);
		}
	}


	$("#c5_del").click(function() {
		var selectedID = $('input[name="c5"]:checked').val();
		console.log("c5 selectedID", selectedID);
		socketio.emit('req_del', selectedID);
	});
	$("#c6_del").click(function() {
		var selectedID = $('input[name="c6"]:checked').val();
		console.log("c6 selectedID", selectedID);
		socketio.emit('req_del', selectedID);
	});
	$("#c7_del").click(function() {
		var selectedID = $('input[name="c7"]:checked').val();
		socketio.emit('req_del', selectedID);
	});
	$("#c9_del").click(function() {
		var selectedID = $('input[name="c9"]:checked').val();
		socketio.emit('req_del', selectedID);
	});
	$("#c8_del").click(function() {
		var selectedID = $('input[name="c8"]:checked').val();
		socketio.emit('req_del', selectedID);
	});


	function ccc(obj){

		// 改めて全データ表示

		$('#c5_info').find('.c5elm').remove();
		$('#c6_info').find('.c6elm').remove();
		$('#c7_info').find('.c7elm').remove();
		$('#c8_info').find('.c8elm').remove();
		$('#c9_info').find('.c9elm').remove();

		var us = {};
		var aud = {};
		var c6_dt = {};
		var c6_txt = {}
		var update_timeSV = "";
		var update_timeLV = "";

		var arr = Object.entries(obj);

		arr.forEach(function(element){

			var category = element[1]['category'];

//			console.log("category", element[1]['category']);
//			console.log("id", element[1]['id']);
//			console.log("data01", element[1]['data01']);

			if(category == "米ドル"){
				// 米ドル情報の蓄積
				us[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category == "豪ドル"){
				// 豪ドル情報の蓄積
				aud[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category =="外国株お知らせ"){
				// 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']) + " 更新";
				var c5str = '<li class="c5elm"><input type="radio" name="c5" value="'+ element[1]["id"] +'">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c5_info').append(c5str);

			}else if(category =="今週の主な予定"){
				// c6_info 更新日の蓄積
				c6_dt[ element[1]['unixtime'] ] = element[1]['data01']; // key = unixtime
				// c6_info 予定日の蓄積
				var sp = element[1]['data01'].split('*:*');
				///////////////////////////////////////////////////
				 // sp[0]で[ID,予定内容]を蓄積
				c6_txt[sp[0]] = [ element[1]['id'], sp[1] ];
				///////////////////////////////////////////////////

			}else if(category =="売買停止のお知らせ"){
				// c7_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c7str = '<li class="c7elm"><input type="radio" name="c7" value="'+ element[1]["id"] +'">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c7_info').append(c7str);

			}else if(category =="枠増加のお知らせ"){
				// c8_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c8str = '<li class="c8elm"><input type="radio" name="c8" value="'+ element[1]["id"] +'">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c8_info').append(c8str);

			}else if(category =="商品部からのお知らせ"){
				// c9_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c9str = '<li class="c9elm"><input type="radio" name="c9" value="'+ element[1]["id"] +'">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c9_info').append(c9str);
			}
		});

		// US
		if(!isEmpty(us)){
			var us_last = Object.entries(us)[0];
//			console.log("us_last", us_last);

			var us_update_time = updateTimeLV(us_last[0]) + " 更新";
			$('#usRate_update').text(us_update_time);
			$('#usRate2_update').text(us_update_time);

			$('#usRate_txt').text(us_last[1]); //ドル表示

			var usBuyNum = Number(us_last[1]) +1;
			var usBuyStr = String(usBuyNum);
			$('#usBUY').text(usBuyStr);

			var usSellNum = Number(us_last[1]) -1;
			var usSellStr = String(usSellNum);
			$('#usSELL').text(usSellStr);
		}

		// AUD
		if(!isEmpty(aud)){
			var aud_last = Object.entries(aud)[0];
//			console.log("aud_last", aud_last);

			var aud_update_time = updateTimeLV(aud_last[0]) + " 更新";
			$('#audRate_update').text(aud_update_time);
			$('#audRate2_update').text(aud_update_time);

			$('#audRate_txt').text(aud_last[1]); //ドル表示

			var audBuyNum = Number(aud_last[1]) +1;
			var audBuyStr = String(audBuyNum);
			$('#audBUY').text(audBuyStr);

			var audSellNum = Number(aud_last[1]) -1;
			var audSellStr = String(audSellNum);
			$('#audSELL').text(audSellStr);
		}

		// c6_info 表示
		if(!isEmpty(c6_txt)){
			// ソート
			var sort_c6 = c6sort(c6_txt);
			// 表示
			for (let key in sort_c6) {
				var c6str = '<li class="c6elm"><input type="radio" name="c6" value="'+ sort_c6[key][0] +'"><span class="date">'+ key +"</span> "+ sort_c6[key][1] + '</li>';
				$('#c6_info').append(c6str);
			}
		}

		//c6_info 最終更新日
		if(!isEmpty(c6_dt)){
			var c6_last = Object.entries(c6_dt)[0];
//			console.log("c6_last", c6_last);

			var c6_last_update = updateTimeLV(c6_last[0]) + " 最終更新";
			$('#c6_last_update').text(c6_last_update);
		}
	}



	function getNowDateWithString(date){
		var year_str = date.getFullYear();
		 //月だけ+1すること
		var month_str = 1 + date.getMonth();
		var day_str = date.getDate();
		var hour_str = date.getHours();
		var minute_str = date.getMinutes();
		var second_str = date.getSeconds();
		
		month_str = ('0' + month_str).slice(-2);
		day_str = ('0' + day_str).slice(-2);
		hour_str = ('0' + hour_str).slice(-2);
		minute_str = ('0' + minute_str).slice(-2);
		second_str = ('0' + second_str).slice(-2);
		 
//		format_str = 'YYYY年MM月DD日 hh:mm:ss';
		format_str = 'YYYY年MM月DD日 hh:mm';
		format_str = format_str.replace(/YYYY/g, year_str);
		format_str = format_str.replace(/MM/g, month_str);
		format_str = format_str.replace(/DD/g, day_str);
		format_str = format_str.replace(/hh/g, hour_str);
		format_str = format_str.replace(/mm/g, minute_str);
//		format_str = format_str.replace(/ss/g, second_str);
		
		return format_str;
	}
	function getNowDateWithStringSV(date){
		var year_str = date.getFullYear();
		 //月だけ+1すること
		var month_str = 1 + date.getMonth();
		var day_str = date.getDate();
		var hour_str = date.getHours();
		var minute_str = date.getMinutes();
		var second_str = date.getSeconds();
		
		month_str = ('0' + month_str).slice(-2);
		day_str = ('0' + day_str).slice(-2);
		hour_str = ('0' + hour_str).slice(-2);
		minute_str = ('0' + minute_str).slice(-2);
		second_str = ('0' + second_str).slice(-2);
		 
		format_str = 'MM月DD日 hh:mm';
		format_str = 'MM/DD hh:mm';
//		format_str = format_str.replace(/YYYY/g, year_str);
		format_str = format_str.replace(/MM/g, month_str);
		format_str = format_str.replace(/DD/g, day_str);
		format_str = format_str.replace(/hh/g, hour_str);
		format_str = format_str.replace(/mm/g, minute_str);
//		format_str = format_str.replace(/ss/g, second_str);
		
		return format_str;
	}


});
