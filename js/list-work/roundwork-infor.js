var pageIndexR = 1;
var AllRoun = '';

getRoundRegion();
getAllPositionRound();
GetRoundWork();

$("#nav10").attr("href","#roundwork-infor").click(function(){
	getRoundRegion();
	this.pageIndexR = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.pos = "全部";
	this.salaryType = 0;
	this.AllRoun = "";
	GetRoundWork();
}.bind(this))
/*
 * 获取获取周边工作函数
 */
function GetRoundWork(){
//	console.log(this.pageIndexR)
	this.keyWord = ""
	$.ajax({
		type:"post",
		url:urlf+"api/Company/NearbyPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndexR,
		  	"PageSize": this.PageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": this.city
		},
		success:function(data){			
			if(data.Status == 1){	
//				console.log(data.Result)
				for(var i in data.Result.List){
					AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
					AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
					AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
					AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
					AllRoun += '</p>'
				}
						
				$("#allArou").html(AllRoun);
				this.isNext = data.Result.IsNext
				this.pageIndexR ++

//				console.log(this.pageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}
/*
 * 点击加载更多
 */
function GetMore2(){	
    this.isLoading = true;
    if(this.isLoading = true){
		if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/NearbyPosition",
				async:true,
				data:{
					"Keyword": this.keyWord,
				    "Place": this.place,
				    "Occupation": this.pos,
				  	"SalaryType": this.salaryType,
				  	"PageIndex": this.pageIndexR,
				  	"PageSize": this.pageSize,
				  	"Lng": 0,
				  	"Lat": 0,
				  	"City": this.city
				},
				success:function(data){
//					console.log(data.Result);
					if(data.Status == 1){			
						for(var i in data.Result.List){
							AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
							AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
							AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
							AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
							AllRoun += '</p>'
						}											
						$("#allArou").html(AllRoun);
						this.isNext = data.Result.IsNext;
	                    this.pageIndexR++;   
//	                    console.log(this.pageIndex)
	                    this.isLoading = false;
					}
					else{
						alert(data.Result);
					}
				}.bind(this)
			});
		}
		else{
			alert("没有更多了")
		}
    }
}
/*
 * 获取周边工作全部职位
 */
function getAllPositionRound(){
	var allWork = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Sys/GetPositionList",
		async:true,
		success:function(data){
	//		console.log(data.Result);
			re = data.Result;
			if(data.Status == 1){
				for(var i in data.Result){
					for(var j in data.Result[i].PositionList){
						allWork +=	'<li class="list-work01" id="'+data.Result[i].PositionList[j].ID+'"onclick="ChoosePosiA(this)"><span class="list-text03">'+data.Result[i].PositionList[j].Name+'</span></li>'
					}
				}
				$("#list-job02").html(allWork);
			}
		}
	});
}
/*
 * 周边工作根据市获取区
 */
function getRoundRegion(){
	var cityty = '';
	var cityty1 = ''
	$.ajax({
		type:"get",
		//宁波市
		url:urlf+"api/Sys/GetReginByCity?city="+this.city,
		async:true,
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){		
				for(var i in data.Result){
					cityty += '<li class="list-work01" onclick="ChooseRegionA(this)"><span class="list-text03">'+data.Result[i].RegionName+'</span></li>' 				
				}		
				$("#list-city02").html(cityty);
			}
		}
	});
}

function GetRoundWork1(){
	var all = "";
	$.ajax({
		type:"post",
		url:urlf+"api/Company/NearbyPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndexR,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": this.city
		},
		success:function(data){			
			if(data.Status == 1){	
//				console.log(data.Result)
				for(var i in data.Result.List){
					all += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
					all += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
					all += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
					all += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
					all += '</p>'
				}
						
				$("#allArou").html(all);
				this.isNext = data.Result.IsNext
				this.pageIndexR ++

//				console.log(this.pageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}
/*
 * 根据条件筛选周边工作
 */
function ChoosePosiA(e){
	pos1 = e.innerText;
	this.pos = pos1
//	console.log(this.pos)
	this.pageIndexR = 1;
	this.pageSize = 1000;
	GetRoundWork1()
}
function ChooseRegionA(e){
	place1 = e.innerText;
	this.place = place1;
//	console.log(this.region);
	this.pageIndexR = 1;
	this.pageSize = 1000;
	GetRoundWork1()
}
function ChooseSalaryA(e){
	type1 = e.id;
	this.salaryType = type1;
//	console.log(this.salaryType);
	this.pageIndexR = 1;
	this.pageSize = 1000;
	GetRoundWork1()
}
function KeySearch(){
	var keyw = $("#keywords").val();
	this.keyWord = keyw;
	this.pageIndexR = 1;
	this.pageIndex = 1;
	this.pageSize = 1000;
	GetRoundWork1();
	GetAllPosition1();
}