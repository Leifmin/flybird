window.onload=function(){
	// 工具
	//查找元素
	function $(a,b){
				if(arguments.length==2){
			return	document.querySelector(a).querySelectorAll(b);
			}
				if(arguments.length==1){
			return	document.querySelector(a);
			}		
	}
	//创建元素
	function cj(name){
			return document.createElement(name);
		}
//开始界面
var number=0; //计算分数
var time3=0;
var Arr=["img/bird0.png","img/bird1.png","img/down_bird0.png","img/down_bird1.png","img/up_bird0.png","img/up_bird1.png"];
		var index=0;
		time1=setInterval(move,30);
		var i=1; 
		function move(){
		//背景滚动
		$("#banner").style.left=$("#banner").offsetLeft-1+"px";
		if($("#banner").offsetLeft<=-343){
			$("#banner").style.left="0px";
		}
		//小鸟
		$(".bird").style.background=" url("+Arr[index++]+")"+" no-repeat";
				if(index==Arr.length){
					index=0;
				}
		//LOGO
		$("#log").style.top=$("#log").offsetTop+i+"px";
		if($("#log").offsetTop<=80|| $("#log").offsetTop>=120){
			i*=-1;
		}
		}
//创建小鸟
	function Abrid(){
		Brid=cj("div");
		Brid.setAttribute("class","Brid");
		$("#BG").appendChild(Brid);
		return Brid;
	}
//小鸟运动
var speedY=0.1;
var imgindex=0;
function Abridmove(Brid){
		time2=setInterval(fly,30);
		function fly(){
			speedY=speedY+0.5;		
			Brid.style.top=Brid.offsetTop+speedY+"px";
//煽动翅膀
	Brid.style.background=" url("+Arr[imgindex++]+")"+" no-repeat";
		if(imgindex==2){
			imgindex=0;
				};	
	//判断碰撞
	if (Brid.offsetTop+Brid.offsetHeight>=422||Brid.offsetTop<0){
		Gameover();
	};	
		}
	//点击鼠标向上飞	
		document.onclick=function(){
				speedY=-8;
			}
	//点击空格向上飞
		document.onkeydown = function(ev) {
			var eventObj = ev || event;
			if(eventObj.keyCode==32){
				speedY=-8;
			}
		}
		document.documentElement.addEventListener("touchstart",function(){
			speedY=-8;
		},false)
		};
// 创建水管
 	
function WaterPipe(conduit,Height1,Height2,top,bottom,img1,img2){
	conduit.setAttribute("class","conduit");
	conduit.style.top=top;
	conduit.style.bottom=bottom;
	var top=cj("div");
	top.style.height=Height1;
	top.style.backgroundImage="url("+img1+")";
	var down=cj("div");
	down.style.height=Height2;
	down.style.background="url("+img2+")";
	conduit.appendChild(top);
	conduit.appendChild(down);
	$("#BG").appendChild(conduit);
	//水管运动
	this.MoveWater=function(){
		time3=setInterval(function(){
				//水管滚动
		conduit.style.left=conduit.offsetLeft-1+"px";
			if(conduit.offsetLeft+conduit.offsetWidth<=0){
				//水管移动出去清除
				conduit.remove();					
			};
			//判断碰撞
			if($(".Brid").offsetTop+$(".Brid").offsetHeight>=conduit.offsetTop && $(".Brid").offsetTop<=conduit.offsetTop+conduit.offsetHeight && $(".Brid").offsetLeft+$(".Brid").offsetWidth>=conduit.offsetLeft && $(".Brid").offsetLeft<=conduit.offsetLeft+conduit.offsetWidth){
					Gameover();//调用停止函数
			}
			//判断分数
			if(conduit.offsetLeft+conduit.offsetWidth==70){
				 number++;	//每次有两个水管满足条件，所以计算积分的时候需要除2;
			}
			jiFen();
		 },15);
	};
}
//游戏初始化水管移动
function StartGame(){
		time4=setInterval(CreateWater,2400)
			function CreateWater(){
				var a=parseInt(Math.random()*180);
				//创建上水管
				var Top=cj("div");
				//创建下水管
				var Down=cj("div");
				var Watertop= new WaterPipe(Top,a+"px","60px","0px","none","img/up_mod.png","img/up_pipe.png");		
				var Waterdown= new WaterPipe(Down,"60px",(180-a)+"px","none","57px","img/down_pipe.png","img/down_mod.png");
				//调用水管移动方法
				Watertop.MoveWater();
				Waterdown.MoveWater();
			}			
};
//计算积分
function jiFen() {
	$("#bigScore").innerHTML = "";
	var scoreStr =Math.floor((number/2)).toString();
	for (var i = 0; i < scoreStr.length; i++) {
		$("#bigScore").innerHTML += "<img src='img/" + scoreStr[i] + ".jpg'/>";
	};
}
//点击开始		
	$(".btnstart").onclick=function(){
		$("#bigScore").style.display="block";
		$("#start").style.display="none";
		clearInterval(time1);
		Abridmove(Abrid());
		StartGame();
	}
//重新开始
$(".ok").onclick=function(){
		number=0;
		$("#gameover").style.display="none";
		$("#start").style.display="none";
		$("#BG").innerHTML="";
		clearInterval(time1);
		Abridmove(Abrid());
		StartGame();
	}
//点击暂停$()
	function Gameover(){
		$(".number").innerHTML=Math.floor(number/2);
		//利用H5新属性，可以在内存储存一个数据，来作为历史成绩记录
		if(window.localStorage.getItem("history")>Math.floor(number/2)){
			$(".HistoryNumber").innerHTML=window.localStorage.getItem("history");
		}else{
			window.localStorage.setItem("history",Math.floor(number/2));
			$(".HistoryNumber").innerHTML=Math.floor(number/2);
		}
		$("#gameover").style.display="block";
		//清除所有定时器
		for(var i=0;i<1000;i++){
			clearInterval(i);
		}	
	}
}