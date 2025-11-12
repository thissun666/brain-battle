/* 常量区 */
const scoreBox=document.getElementById('score');
const manyBox=document.getElementById('many');
const bestBox=document.getElementById('best');
const timeBox=document.getElementById('time');
/* const pauseBtn=document.getElementById('pauseBtn'); */
const againBtn=document.getElementById('againBtn');

const itemBoxr=document.getElementById('item-r');
const itemBoxl=document.getElementById('item-l');

const btn0=document.getElementById('i0');
const btn1=document.getElementById('i1');
const btn2=document.getElementById('i2');
const btn3=document.getElementById('i3');
const btn4=document.getElementById('i4');
const btn5=document.getElementById('i5');


/* 变量区 */
let nowTime=5;
let barrier=1;/* 关卡 */
let score=0;
let answer_l=0;/* 答案左 */
let answer_r=0;/* 答案右 */
let exist=null; /*三个按钮是否存在答案 */ 
let exist2=null;

let paused=false;
let countTimer=null;
let maintimer=null;

let reply1=0;
let reply2=0;
/* 辅助函数 */
/* 返回加数 */
bestBox.textContent=localStorage.getItem('best')||0;
function getNum(){
	return Math.floor(Math.random()*10);
}

/* 返回答案按钮下标 */
function getId(mid){
	if(mid===0){
		return Math.floor(Math.random()*3);
	}else{
		return Math.floor(Math.random()*3+3);
	}
	
}
/* 返回随机错误答案 */
function getRes(){
	return Math.floor(Math.random()*100);
}
function jianche(){
	
		if(reply1===1&&reply2===1){
			if(countTimer){
				clearInterval(countTimer);
				countTimer=null;
			} 
			barrier++;
			score++;		
			nowTime=5;
			timeBox.textContent=nowTime;
			scoreBox.textContent=score;
			manyBox.textContent=barrier;
			mainGame();	
			countTimer=startCount();
		 }
	
}
/* 倒计时函数 timeCount*/
function startCount(){
	return setInterval(function(){
		nowTime--;
		timeBox.textContent=nowTime;
		if(nowTime===0){
			clearInterval(countTimer);
			best=Number(localStorage.getItem('best')||0);
			if(score>best){
				localStorage.setItem('best',score);
				bestBox.textContent=score;
			}
			btn0.style.backgroundColor=btn1.style.backgroundColor=btn2.style.backgroundColor='#fff';
			btn3.style.backgroundColor=btn4.style.backgroundColor=btn5.style.backgroundColor='#000';
			alert("您的成绩：第"+barrier+"关，共"+score+"分");
		}
		jianche();				
	},1000);
}


function mainGame(){
	reply1=0;
	reply2=0;
	
	btn0.style.backgroundColor=btn1.style.backgroundColor=btn2.style.backgroundColor='#FFFFFF';/* CSS里的颜色值在JavaScript里是字符串，必须加引号 */
	btn3.style.backgroundColor=btn4.style.backgroundColor=btn5.style.backgroundColor='#000000';
	/* 获取0-10的数字生成对应的题目 */
	const num1=getNum();
	const num2=getNum();
	const num3=getNum();
	const num4=getNum();
	answer_l=num1+num2;
	answer_r=num3+num4;
	document.getElementById('item-whatl').textContent=num1+"+"+num2+"=?";
	document.getElementById('item-whatr').textContent=num3+"+"+num4+"=?";
	console.log("1.num1="+num1+",num2="+num2+",num3="+num3+",num4="+num4);

	/* 生成按钮答案 */
	const a=getId();
	let countrest=0;
	/* 获取0-100随机数并放到按钮上 */
	for(var i=0;i<6;i++){
		const b=getRes();
		document.getElementById('i'+i).textContent=b;
	}	
	/* 获取按钮上的数字 */
	let rawNum0=Number(document.getElementById('i0').textContent);
	let rawNum1=Number(document.getElementById('i1').textContent);
	let rawNum2=Number(document.getElementById('i2').textContent);	
	let rawNum3=Number(document.getElementById('i3').textContent);
	let rawNum4=Number(document.getElementById('i4').textContent);
	let rawNum5=Number(document.getElementById('i5').textContent);
	
	
	
	let h=getId(0);
	let h2=getId(1);
	/* 检测按钮上是否有答案,如果没有,获取随机位置h,h2并设置正确答案;如果有, */
	if(answer_l!==rawNum0&&answer_l!==rawNum1&&answer_l!==rawNum2){	
		document.getElementById('i'+h).textContent=answer_l;	
	}else{
		if(rawNum0-answer_l===0) h=0;
		if(rawNum1-answer_l===0) h=1;
		if(rawNum1-answer_l===0) h=2;
	}
	if(answer_r!==rawNum3&&answer_r!==rawNum4&&answer_r!==rawNum5){
		document.getElementById('i'+h2).textContent=answer_r;		
	}else{
		if(rawNum3-answer_r===0) h2=3;
		if(rawNum4-answer_r===0) h2=4;
		if(rawNum5-answer_r===0) h2=5;
	}

	chooseLeft(answer_l,h);
	chooseRight(answer_r,h2);
	
	
	
}
/* 点击事件 */
function chooseLeft(res,gh1){
	for(let i=0;i<3;i++){
		let b=document.getElementById('i'+i);
		b.disabled=false;
		// b.style.backgroundColor='';
	}
	const btn=document.getElementById('item-btnl');
	btn.removeEventListener('click',handleBtnl);
	
	function handleBtnl(e){		
		const btn=e.target;
		if(btn.tagName==='BUTTON'){	
			
			if(btn.id==='i'+gh1){
				btn.style.backgroundColor='#4caf50';			
				const www=document.getElementById('i'+gh1).textContent;			
				reply1=1;
				
			}else{
				btn.style.backgroundColor='#e74c3c';	
				reply1=0;
			}
			for(let i=0;i<3;i++){
				let b=document.getElementById('i'+i);
				b.disabled=true;
				// b.style.backgroundColor="#ccc";
			}
			}
	}

	btn.addEventListener('click',handleBtnl);
}

function chooseRight(res2,gh2){
	for(let i=3;i<6;i++){
		let b=document.getElementById('i'+i);
		b.disabled=false;
	}
	const btn=document.getElementById('item-btnr');
	btn.removeEventListener('click',handleBtnr);
	
	function handleBtnr(e){
		const btn=e.target;
		if(btn.tagName==='BUTTON'){	
			
			if(btn.id==='i'+gh2){
				btn.style.backgroundColor='#4caf50';
				const www=document.getElementById('i'+gh2).textContent;
				reply2=1;
				
			}else{
				btn.style.backgroundColor='#e74c3c';
				reply2=0;
			}
			for(let i=3;i<6;i++){
				let b=document.getElementById('i'+i);
				b.disabled=true;
			}
	}
	}
	btn.addEventListener('click',handleBtnr);
	/* document.getElementById('item-btnr').addEventListener('click',function(e){	
		const btn=e.target;
		if(btn.tagName==='BUTTON'){	
			
			if(btn.id==='i'+gh2){
				btn.style.backgroundColor='#4caf50';
				const www=document.getElementById('i'+gh2).textContent;
				reply2=1;
				
			}else{
				btn.style.backgroundColor='#e74c3c';
				
				reply2=0;
			return;
			}
			}
			
	}); */
}

mainGame();

countTimer=startCount();

/* 重新开始:again.onclick */
againBtn.onclick=function(){
	score=0;
	nowTime=5;
	barrier=1;
	
	scoreBox.textContent=score;
	timeBox.textContent=nowTime;
	manyBox.textContent=barrier;
	
	if(countTimer){
		clearInterval(countTimer);
		countTimer=null;
	} 
	
	mainGame();
	countTimer=startCount();
};