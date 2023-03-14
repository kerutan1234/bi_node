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

//		console.log("fast_data", fast_data);

		var new_data =  fast_data[1];

		if(new_data['category'] == "米ドル"){
			//US点滅
			$('#brink01').css('animation-play-state','running');
			var timer01 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink01').css('animation-play-state','paused');
				clearTimeout(timer01);
//				console.log("timer01クリア");
			};
		}else if(new_data['category'] == "豪ドル"){
			//AUD点滅
			$('#brink02').css('animation-play-state','running');
			var timer02 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink02').css('animation-play-state','paused');
				clearTimeout(timer02);
//				console.log("timer02クリア");
			};
		}else if(new_data['category'] == '外国株お知らせ'){
			//c5_info点滅
			$('#brink05').css('animation-play-state','running');
			var timer05 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink05').css('animation-play-state','paused');
				clearTimeout(timer05);
//				console.log("timer05クリア");
			};
		}else if(new_data['category'] == '今週の主な予定'){
			//c6_info点滅
			$('#brink06').css('animation-play-state','running');
			var timer06 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink06').css('animation-play-state','paused');
				clearTimeout(timer06);
//				console.log("timer06クリア");
			};
		}else if(new_data['category'] == '売買停止のお知らせ'){
			//c7_info点滅
			$('#brink07').css('animation-play-state','running');
			var timer07 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink07').css('animation-play-state','paused');
				clearTimeout(timer07);
//				console.log("timer07クリア");
			};
		}else if(new_data['category'] == '枠増加のお知らせ'){
			//c8_info点滅
			$('#brink08').css('animation-play-state','running');
			var timer08 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink08').css('animation-play-state','paused');
				clearTimeout(timer08);
//				console.log("timer08クリア");
			};
		}else if(new_data['category'] == '商品部からのお知らせ'){
			//c9_info点滅
			$('#brink09').css('animation-play-state','running');
			var timer09 = setTimeout(dispMsg, 60000); //1分
			function dispMsg(){
				$('#brink09').css('animation-play-state','paused');
				clearTimeout(timer09);
//				console.log("timer09クリア");
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

	function ccc(data){

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

		var arr = Object.entries(data);

		arr.forEach(function(element){

			var category = element[1]['category'];
//			console.log("ccc element[1]", element[1]['category']);

			if(category == "米ドル"){
				// 米ドル情報の蓄積
				us[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category == "豪ドル"){
				// 豪ドル情報の蓄積
				aud[ element[1]['unixtime'] ] = element[1]['data01'];
			}else if(category =="外国株お知らせ"){
				// 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']) + " 更新";
				var c5str = '<li class="c5elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
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
				var c7str = '<li class="c7elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c7_info').append(c7str);

			}else if(category =="枠増加のお知らせ"){
				// c8_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c8str = '<li class="c8elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
				$('#c8_info').append(c8str);
			}else if(category =="商品部からのお知らせ"){
				// c9_info 表示
				update_timeSV = updateTimeSV(element[1]['unixtime']);
				var c9str = '<li class="c9elm">'+ element[1]['data01'] + '<small>（' + update_timeSV + '）</small></li>';
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

		// c6_info 表示（***** 今週の情報のみ ****）
		if(!isEmpty(c6_txt)){

			////////////////////////////////////////////
			var week = StartAndEndOfThisWeek();
//			console.log("今週", week);

			var ut1 = Date.parse (week[1]);
			var ut2 = Date.parse (week[2]);
//			console.log("ut1", ut1, "ut2", ut2);
			////////////////////////////////////////////
			// ソート
			var sort_c6 = c6sort(c6_txt);
			
//			console.log("sort_c6", sort_c6);

			// 表示
			var counter = 0;
			for (let key in sort_c6) {
				////////////////////////////////////////////
				var str = week[0] + '-' + key;
				var rp1 = str.replace('月', '-');
				var rp2 = rp1.replace('日', '');
//				console.log("rp2", rp2);

				var dt = Number(Date.parse (rp2));
//				console.log("dt", dt);
				if(ut1<=dt && dt<=ut2){
					var c6str = '<li class="c6elm"><span class="date">'+ key +"</span> "+ sort_c6[key][1] + '</li>';
					$('#c6_info').append(c6str);
					counter++
				}
				////////////////////////////////////////////
			}
			if(counter==0){
				var c6str = '<li class="c6elm"><span class="date">今週の予定はありません</span></li>';
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

	function StartAndEndOfThisWeek(){
		let today = new Date(); //Dateをインスタンス化
		let thisYear = today.getFullYear(); //今年の年を取得
		let thisMonth = today.getMonth();　//今月を取得
		let date = today.getDate(); //今日の日にちを取得
		let dayNum = today.getDay(); //今日の曜日を取得（0～6までの数字でとれる）
//		console.log("月",thisMonth, "日",date, "曜日", dayNum);

		let thisSunday = date - dayNum; //今日の日にちから曜日の数だけ引く
		let thisSaturday = thisSunday + 6  //thisSundayに6を足す（はじめの日から6日後）
		let startTime = new Date(thisYear, thisMonth, thisSunday); // 日曜の0:00
		let endTime = new Date(thisYear, thisMonth, thisSaturday,23,59,59,999); //土曜の23:59
//		console.log("startTime", startTime);
//		console.log("endTime", endTime);

		//ここからは表示したい形に整形
		let startDate =  (startTime.getFullYear()) + "/" + (startTime.getMonth() + 1) + "/" + startTime.getDate() //日曜日の月日で文字列を作成
		let endDate = (endTime.getFullYear())  + "/" + (endTime.getMonth() + 1) + "/" + endTime.getDate() //土曜日の月日で文字列を作成
//		console.log("startDate", startDate);
//		console.log("endDate", endDate);
//		console.log("thisYear", typeof(thisYear));
		return [String(thisYear), startDate, endDate] //配列に入れて返す
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
