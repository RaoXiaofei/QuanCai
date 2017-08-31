var AllPo = '';

/*
 * 全部工作全局变量
 */
var keyWord = "-1";
var place = "全部"; 
var pos = "全部"; 
var salaryType = 0; 
var pageIndex = 1;  
var region = "";
var city = "";
/*
 * 加载页面全局
 */
var isNext = false;
var isLoading = false;
var city1 = unescape(getCookie("city"))
var cityxity = city1.split("市")[0];


var changeC = getCookie("change");
if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = cityxity;
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}

GetAllPosition();
$('#all-pos').attr("href","#allwork-infor").click(function(){
	this.keyWord = '-1';
	this.pageIndex = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.pos = "全部";
	this.salaryType = 0;
	this.AllPo = "";
	GetAllPosition();
}.bind(this))

/*
 * 全部工作职位
 */
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
					allWork +=	'<li class="list-work01" id="'+data.Result[i].PositionList[j].ID+'"onclick="ChoosePosi(this)"><span class="list-text03">'+data.Result[i].PositionList[j].Name+'</span></li>'
				}
			}
			$("#list-job01").html(allWork);
		}
	}
});

/*
 * 全部工作根据市获取区
 */
var cityty = '';
var cityty1 = ''
$.ajax({
	type:"get",
	//宁波市
	url:urlf+"api/Sys/GetReginByCity?city="+this.city,
	async:true,
	success:function(data){
//		console.log(data.Result);
		if(data.Status == 1){		
			for(var i in data.Result){
				cityty += '<li class="list-work01" onclick="ChooseRegion(this)"><span class="list-text03">'+data.Result[i].RegionName+'</span></li>' 				
			}		
			$("#list-city01").html(cityty);
		}
	}
});

/*
 * 获取全部工作函数
 */
function GetAllPosition(){
//	console.log(this.pageIndex)
	$.ajax({
		type:"post",
		url:urlf+"api/Company/AllPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": ""
		},
		success:function(data){
//			console.log(data.Result)
			if(data.Status == 1){					
				for(var i in data.Result.List){
					AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
					AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
					AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
					AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
					AllPo += '</p>'
				}
						
				$("#allP").html(AllPo);
				this.isNext = data.Result.IsNext
				this.pageIndex ++;

//				console.log(this.PageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});	
}
//点击加载
function GetMore1(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		
//  		console.log(this.pageIndex)
			$.ajax({
				type:"post",
				url:urlf+"api/Company/AllPosition",
				async:true,
				data:{
					"Keyword": this.keyWord,
				    "Place": this.place,
				    "Occupation": this.pos,
				  	"SalaryType": this.salaryType,
				  	"PageIndex": this.pageIndex,
				  	"PageSize": this.pageSize,
				  	"Lng": 0,
				  	"Lat": 0,
				  	"City": ""
				},
				success:function(data){
					if(data.Status == 1){			
						for(var i in data.Result.List){
							AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
							AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
							AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
							AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
							AllPo += '</p>'
						}											
						$("#allP").html(AllPo);
						this.isNext = data.Result.IsNext;
                        this.pageIndex++;  
                        
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

function GetAllPosition1(){
	var Allo = ''
	$.ajax({
		type:"post",
		url:urlf+"api/Company/AllPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": ""
		},
		success:function(data){
//			console.log(data.Result)
			if(data.Status == 1){					
				for(var i in data.Result.List){
					Allo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
					Allo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
					Allo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
					Allo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
					Allo += '</p>'
				}
						
				$("#allP").html(Allo);
				this.isNext = data.Result.IsNext
				this.pageIndex ++;

//				console.log(this.PageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});	
}
/*
 * 根据条件筛选全部工作
 */
function ChoosePosi(e){
	pos1 = e.innerText;
	this.pos = pos1
//	console.log(this.pos)
	this.pageIndex = 1;
	this.pageSize = 1000;
	this.keyWord = '-1';
	GetAllPosition1()
}
function ChooseRegion(e){
	place1 = e.innerText;
	this.place = place1;
//	console.log(this.region);
	this.pageIndex = 1;
	this.pageSize = 1000;
	this.keyWord = '-1';
	GetAllPosition1()
}
function ChooseSalary(e){
	type1 = e.id;
	this.salaryType = type1;
//	console.log(this.salaryType);
	this.pageIndex = 1;
	this.pageSize = 1000;
	this.keyWord = '-1';
	GetAllPosition1()
}

/*
 * 显示工作详情
 */
function ShowWorkDe(workID){
	window.open("detail-parttimejob.html?id="+workID.id);
}
