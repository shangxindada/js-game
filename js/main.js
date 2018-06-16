var ghosts = [];//装新建的幽灵的数组
//按下按钮
function down(type){
	var down = document.getElementById(type);
	down.style.width="230px";
	down.style.height="130px";
}

//按钮放开
function up(type){
	var up = document.getElementById(type);
	up.style.width="250px";
	up.style.height="150px";
	if(type === "aboutUs")
		window.open("http://www.baidu.com");
}

//点击开始游戏后隐藏welcomePage显示starPage
function starGame(){
//	隐藏welcomePage
	var welcome = document.getElementById("welcomePage");
	welcome.style.display = "none";
	
//	显示starPage
	var star = document.getElementById("starPage");
	star.style.display = "block";
	
//	显示倒计时图片
	var secpoto = document.getElementById("second");
	secpoto.style.display = "block";
	secpoto.src = "img/daojishi-3.png";
//	让计数器为o
	document.getElementById("numDiv").innerText = "0";
//	计时开始
	document.getElementById("areaT").innerText = "0";
	//设置倒计时
	Intsecond = 2;
//	用计时器开始倒数
	second = setInterval(starTime,1000);
}

var second;//倒数的计时器
var Intsecond ;//倒数的数
var ghostIn;//生成幽灵的计时器
var gameTime;//记录时间
var timeIn;//时间计数
var leve;//临时等级
var leve1=1;//等级
var spend1=1000;//速度1生成速度
var spend2=200;//速度2上升速度
var flag=true;//暂停标记

//开始倒计时
function starTime(){
	var secpoto = document.getElementById("second");
	if(Intsecond < 1){
		clearInterval(second);
		secpoto.style.display = "none";
//		开始时间记录
		timeIn = setInterval(time,1000);
//		开始生成幽灵
		ghostIn = setInterval(create,spend1);
//		幽灵开始飘
		flyIn = setInterval(fly,spend2);
	}else{
		secpoto.src = "img/daojishi-"+Intsecond+".png";
		console.debug(Intsecond);
		Intsecond--;
	}
}

function create(){
//	创建幽灵
	var add = document.createElement("div");
//	设置幽灵属性
	add.className = "ghost";
	add.style.bottom = "0";
//	设置幽灵的随机出现
	var left = 100;
	var right = document.documentElement.clientWidth-120-100;
	var radomLeft = parseInt(Math.random()*(right-left))+left;
	add.style.left = radomLeft+"px";
//	设置随机的英文 97-122是a-z 65-90是A-Z
//	if(parseInt(Math.random()*2+1)==1)
//		var radomNum = parseInt(Math.random()*(123-97))+97;
//	else
	var radomNum = parseInt(Math.random()*(91-65))+65;
	add.innerText = String.fromCharCode(radomNum);
	
	var welcome = document.getElementById("starPage");
	welcome.appendChild(add);
//	加进数组
	ghosts.push(add);

}

//	幽灵上升
function fly(){
	for(var index in ghosts){
		var star = document.getElementById("starPage");
		if(ghosts[index].offsetTop<=-60){
			star.removeChild(ghosts[index]);
			ghosts.splice(index,1);
		}
		ghosts[index].style.bottom = parseInt(ghosts[index].style.bottom)+2+"px";
	}
}

var i ;

//消除幽灵
document.documentElement.onkeydown=function(e){
	e = e||event;
	var keyCode = e.keyCode;
	var codeChar = String.fromCharCode(keyCode);
	var star = document.getElementById("starPage");
	
	for(var index in ghosts){
		if(ghosts[index].innerText == codeChar&&flag){
			star.removeChild(ghosts[index]);
			ghosts.splice(index,1);
			i++;
			numDiv = document.getElementById("numDiv");
			numDiv.innerText++;
			break;
		}
	}
}



//返回欢迎页
function back(){
	var star = document.getElementById("starPage");
	//	隐藏starpage
	star.style.display = "none";
	//	显示welcomePage
	var welcome = document.getElementById("welcomePage");
	welcome.style.display = "block";
	if(second>0){
		document.getElementById("second").src = "img/daojishi-3.png";
		clearInterval(second);
	}
	//	获取starPage后遍历上面的幽灵并删除掉
	var star = document.getElementById("starPage");
	for(var index in ghosts){
		star.removeChild(ghosts[index]);
	}
	ghosts.splice(0,ghosts.length);
//	停止在循环的创建幽灵计时器和幽灵飞计时器
	clearInterval(timeIn);
	clearInterval(ghostIn);
	clearInterval(flyIn);
}

//暂停与开始

function stop(){
	flag = false;//将标记设为false表示按键不会生效
//	获取一个半透明的覆盖层让它显示
	var bgArea = document.getElementById("puseBg");
	bgArea.style.display = "block";
//	获取暂停按钮让它显示
	var puseButtom = document.getElementById("puseButtom");
	puseButtom.style.display = "block";
//	让按钮居中
	puseButtom.style.top = document.documentElement.clientHeight/2-60+"px";
	puseButtom.style.left = document.documentElement.clientWidth/2-190+"px";
	 
	
//	停止计时器
	if(second>0){
		//		停止倒计时计时器
		clearInterval(second);
	}
//	停止计时
	clearInterval(timeIn);
//		停止幽灵生成计时器
	clearInterval(ghostIn);
//		停止幽灵上升计时器
	clearInterval(flyIn);
}

//继续游戏
function continueGame(){
	flag = true; //让标记为true表示已经可以按键生效
	//	获取一个半透明的覆盖层让它隐藏
	var bgArea = document.getElementById("puseBg");
	bgArea.style.display = "none";
//	获取暂停按钮让它隐藏
	var puseButtom = document.getElementById("puseButtom");
	puseButtom.style.display = "none";
	var secpoto = document.getElementById("second");
	if(Intsecond < 1){
		clearInterval(second);
		secpoto.style.display = "none";
//		开始生成幽灵
		ghostIn = setInterval(create,spend1);
//		幽灵开始飘
		flyIn = setInterval(fly,spend2);
		timeIn = setInterval(time,1000);
	}else{
		second = setInterval(starTime,1000);
	}
}

//设置页显示
function setting(){
	flag = false;//将标记设为false表示按键不会生效
	leve=leve1;//让临时等级等于等级
	//	获取一个半透明的覆盖层让它显示
	var bgArea = document.getElementById("puseBg");
	bgArea.style.display = "block";
//	设置页显示
	var settingArea = document.getElementById("settingArea");
	settingArea.style.display = "block";
//	设置页居中
	settingArea.style.left = document.documentElement.clientWidth/2-313+"px";
	settingArea.style.top = document.documentElement.clientHeight/2-269+"px";
	//	停止计时器
	if(second>0){
		//		停止倒计时计时器
		clearInterval(second);
	}
	//	停止计时
	clearInterval(timeIn);
//		停止幽灵生成计时器
	clearInterval(ghostIn);
//		停止幽灵上升计时器
	clearInterval(flyIn);
}

//关闭设置页
function closeSetting(){
//	//	获取一个半透明的覆盖层让它隐藏
//	var bgArea = document.getElementById("puseBg");
//	bgArea.style.display = "none";
	//	设置页隐藏
	var settingArea = document.getElementById("settingArea");
	settingArea.style.display = "none";
//	var secpoto = document.getElementById("second");
//	if(Intsecond < 1){
//		clearInterval(second);
//		secpoto.style.display = "none";
////		开始生成幽灵
//		ghostIn = setInterval(create,500);
////		幽灵开始飘
//		flyIn = setInterval(fly,10);	
//	}else{
//		second = setInterval(starTime,1000);
//	}
	document.getElementById("areaL").src = "img/daojishi-"+leve1+".png";
	continueGame();
}

//等级提升
function leveDown(){
	if(leve>1){
		leve--;
		document.getElementById("areaL").src = "img/daojishi-"+leve+".png";
	}else{
		document.getElementById("areaL").src = "img/daojishi-"+leve+".png";
	}
}
//等级降低
function leveUp(){
	if(leve<3){
		leve++;
		document.getElementById("areaL").src = "img/daojishi-"+leve+".png";
	}else{
		document.getElementById("areaL").src = "img/daojishi-"+leve+".png";
	}	
}

//确认设置
function setNow(){
	leve1 = leve;
	var settingArea = document.getElementById("settingArea");
	settingArea.style.display = "none";
	spend1 = 1300-leve1*300;
	spend2 = 290-leve1*90;
	console.debug(spend1);
	console.debug(spend2);
	continueGame();
	
	
}

//计时加
function time(){
	document.getElementById("areaT").innerText ++ ;
}
