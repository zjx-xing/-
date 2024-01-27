//0代表不可抵达区域，1代表金币
//2代表路径，3代表墙，4代表箱子
//地图数组，buildMap[1]=[........]
var buildMap = [
    [
        0,0,3,3,3,3,3,0,0,0,0,0,
        0,0,3,2,2,2,3,0,0,0,0,0,
        0,0,3,2,4,4,3,0,3,3,3,0,
        0,0,3,2,4,2,3,0,3,1,3,0,
        0,0,3,3,3,2,3,3,3,1,3,0,
        0,0,0,3,3,2,2,2,2,1,3,0,
        0,0,0,3,2,2,2,3,2,2,3,0,
        0,0,0,3,2,2,2,3,3,3,3,0,
        0,0,0,3,3,3,3,3,0,0,0,0
    ],
    [
        0,0,3,3,3,3,3,3,3,0,0,0,
        0,0,3,2,2,2,2,2,3,3,3,0,
        0,3,3,4,3,3,3,2,2,2,3,0,
        0,3,2,2,2,4,2,2,4,2,3,0,
        0,3,2,1,1,3,2,4,2,3,3,0,
        0,3,3,1,1,3,2,2,2,3,0,0,
        0,0,3,3,3,3,3,3,3,3,0,0
    ],
    [
        0,0,0,0,3,3,3,3,3,3,3,0,
        0,0,0,3,3,2,2,3,2,2,3,0,
        0,0,0,3,2,2,2,3,2,2,3,0,
        0,0,0,3,4,2,4,2,4,2,3,0,
        0,0,0,3,2,4,3,3,2,2,3,0,
        0,3,3,3,2,4,2,3,2,3,3,0,
        0,3,1,1,1,1,1,2,2,3,0,0,
        0,3,3,3,3,3,3,3,3,3,0,0
    ], 
    [
        0,0,3,3,3,3,3,3,3,3,3,0,
        0,0,3,2,2,3,3,2,2,2,3,0,
        0,0,3,2,2,2,4,2,2,2,3,0,
        0,0,3,4,2,3,3,3,2,4,3,0,
        0,0,3,2,3,1,1,1,3,2,3,0,
        0,3,3,2,3,1,1,1,3,2,3,3,
        0,3,2,4,2,2,4,2,2,4,2,3,
        0,3,2,2,2,2,2,3,2,2,2,3,
        0,3,3,3,3,3,3,3,3,3,3,3
    ],   
]

var customs = 0;//初始化关卡
var needList = [3,4,5,6];//过关所需推完箱子个数
var position = [15,39,21,94];//人物没关初始化位置
var winCondition = needList[customs];//刷新过关条件，增加箱子数。
var initPosition = position[customs];//刷新初始位置
var map = $("#box div");//取得新的地图
var divNum=12;//下移动需要增减12.

//一开始点击选择关卡后切换场景
$("#choicePass").click(function(){
	$("#init").addClass("hide");//初始界面隐藏
	$("#box").removeClass("hide");//地图取消隐藏,打开地图
	customs = $('input:radio:checked').val();//等于选的关卡
	winCondition = needList[customs];//获得所通关箱子个数
	initPosition = position[customs];//获得关卡的初始通关位置.
	map = $("#box div");//获得地图
	init();//执行
});

//下一关
function nextCustoms(){
	$(".next").click(function(){//跳转下一关
		$("#pass").addClass("hide");//隐藏
		$("#box").removeClass("hide");
	});
}

//创造箱子
function createBox(){
    var nums = 108;
	for(var i = 0 ;i<nums;i++){
		var odiv = $("<div></div>");
		$("#box").append(odiv);
	}
}

//初始化地图
function init(){
	map.each(function(index){
		map.eq(index).removeClass();//遍历移除所有样式.
	});
	map.each(function(index){
		if(buildMap[customs][index] != 0){//如果当前位置坐标的值不是0，加上样式
			map.eq(index).addClass("img"+buildMap[customs][index])//获得坐标值，img+坐标值赋予坐标样式
		}
	})
	//初始化每关人物坐标；
	map.eq(position[customs]).addClass("position")
}
//按下键盘人物移动以及推箱子
$(document).keydown(function(e){
	var key = e.keyCode;
	console.log(key)
	switch(key){
		case 38: //向上移动按；
            move(-divNum);
        break;
        case 40: //下
            move(divNum);
        break;
        case 37: //左
            move(-1);
        break;
        case 39: //右
            move(1);
        break;
	}
    setTimeout(pass,2000);
})

//移动判断
function move(distance){
	//position代表人物位置,img1代表金币
	//img2代表路劲,img3代表墙,img4代表箱子
	var nowPosition = map.eq(initPosition);//人物当前位置
	var nextPosition = map.eq(initPosition+distance);//按下键盘之后的位置
	var nextBoxPosition = map.eq(initPosition + 2*distance )//移动箱子时,箱子下一步的位置,用于人物推动,相对于人物本身,移动两格
	//人物下一个位置不在墙上,且在路上或者在金币上,人物可以移动
	if(!nextPosition.hasClass('img4') && (nextPosition.hasClass('img2') ||nextPosition.hasClass('img1'))){
		//移动人物
		nowPosition.removeClass('position');//人物取消当前位置
		nextPosition.addClass('position');//人物下一位置获得位置
		initPosition += distance;
    //人物在一个位置是箱子, 箱子下一个位置不在墙上且箱子下一个位置在路径上或者在金币上,人物和箱子才可以移动
	}else if(nextPosition.hasClass('img4') && (!nextBoxPosition.hasClass('img4')) && (nextBoxPosition.hasClass('img1') || nextBoxPosition.hasClass('img2'))){
		//移动人物
		nowPosition.removeClass('position');//人物取消当前位置
		nextPosition.removeClass('img4');//人物下一位置箱子取消样式
		nextBoxPosition.addClass('img4');//箱子出现在下一位置
		nextPosition.addClass('position').addClass('img2');//人物出现在下一位置，当前位置变成路径
		initPosition += distance;		
	}
}

//通关条件
function pass(){
	//箱子和金币样式重叠长度大于通关所需箱子数
	if($(".img1.img4").length == winCondition){
		if(customs<buildMap.length-1){//如果关数小于地图总关数
			$("#box").addClass("hide");//隐藏地图
			$("#pass").removeClass("hide");//打开通关样式
			nextCustoms();
			customs++;//增加关卡,下一关
			winCondition = needList[customs];//过关条件改变
			initPosition = position[customs];//初始位置改变
			//改变地图
			init();
		}else{//通关所有关卡,按确定重置关卡
			$("#box").addClass("hide");
			$("#pass").removeClass("hide");
			$("#pass p").text('所有关卡已通过，按确定重置关卡')
			$(".next").click(function(){//跳到下一关
				$("#pass").addClass("hide");
				$("#box").removeClass("hide");
			});
			//关卡和通关条件,初始位置重置
			customs = 0;
			winCondition = needList[customs];
			initPosition = position[customs];
			//改变初始
			init();
		}
	}
}
//调用创造地图和初始
createBox();
init();
