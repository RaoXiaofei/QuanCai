var pageIndex4 = 1;
var Qualifications = "全部";
var allR = '';
/*
 * 获取所有简历
 */
GetAllWork();
GetRegion();
GetAllResume();
/*
 * 点击跳转
 */
$("#nav02").attr("href","#resume-infor").click(function(){
	this.pageIndex4 = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.pos = "全部";
	this.salaryType = 0;
	this.allR = '';
	GetAllResume();
}.bind(this))
/*
 * 获取简历函数
 */
function GetAllResume(){	
	$.ajax({
		type:"post",
		url:urlf+"api/Company/Resume",
		async:true,
		data:{
			"Qualifications": this.Qualifications,
		  	"Place": this.place,
		  	"Occupation": this.pos,
		 	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex4,
		  	"PageSize": this.pageSize,
		  	"Keyword": this.keyword
		},
		success:function(data){
//			console.log(data.Result);
			var re = data.Result.List;
			if(data.Status == 1){

				for(var i in data.Result.List){
					allR += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowResumeDe(this)">'
					allR +=		'<span class="index-text20">'+re[i].Name+'</span>'
					allR +=		'<span class="index-text21">'+re[i].PositionName+'</span>'
					allR +=		'<span class="index-text22">'+re[i].Qualifications+'</span>'
					allR +=		'<span class="index-text23">'+re[i].SalaryExpectation+'</span>'
					allR +=	'</p>'
				}
				
				$("#allRes").html(allR);
				
				this.isNext = data.Result.IsNext
				this.pageIndex4 ++
			}
		}.bind(this)
	});
}

//点击加载
function GetMore3(){
    this.isLoading = true;
    if(this.isLoading = true){    
		if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/Resume",
				async:true,
				data:{
					"Qualifications": this.Qualifications,
				  	"Place": this.place,
				  	"Occupation": this.pos,
				 	"SalaryType": this.salaryType,
				  	"PageIndex": this.pageIndex4,
				  	"PageSize": this.pageSize,
				  	"Keyword": this.keyword
				},
				success:function(data){
		//			console.log(data.Result);
					var re = data.Result.List;
					if(data.Status == 1){
		
						for(var i in data.Result.List){
							allR += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowResumeDe(this)">'
							allR +=		'<span class="index-text04">'+re[i].Name+'</span>'
							allR +=		'<span class="index-text05">'+re[i].PositionName+'</span>'
							allR +=		'<span class="index-text06">'+re[i].Qualifications+'</span>'
							allR +=		'<span class="index-text07">'+re[i].SalaryExpectation+'</span>'
							allR +=	'</p>'
						}
						
						$("#allRes").html(allR);
							
							this.isNext = data.Result.IsNext;
							this.pageIndex4++;
							this.isLoading = false;
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
 * 全部工作职位
 */
function GetAllWork(){
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
						allWork +=	'<li class="list-work01" id="'+data.Result[i].PositionList[j].ID+'"onclick="ChoosePosiR(this)"><span class="list-text03">'+data.Result[i].PositionList[j].Name+'</span></li>'
					}
				}
				$("#list-job03").html(allWork);
			}
		}
	});
}
/*
 * 全部工作根据市获取区
 */
function GetRegion(){
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
					cityty1 += '<li class="list-work01" onclick="ChooseRegionR(this)"><span class="list-text03">'+data.Result[i].RegionName+'</span></li>' 				
				}		
				$("#list-city03").html(cityty1);
			}
		}
	});
}

function GetAllResume1(){
	var all = ''
	$.ajax({
		type:"post",
		url:urlf+"api/Company/Resume",
		async:true,
		data:{
			"Qualifications": this.Qualifications,
		  	"Place": this.place,
		  	"Occupation": this.pos,
		 	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex4,
		  	"PageSize": this.pageSize,
		  	"Keyword": this.keyword
		},
		success:function(data){
//			console.log(data.Result);
			var re = data.Result.List;
			if(data.Status == 1){

				for(var i in data.Result.List){
					all += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowResumeDe(this)">'
					all +=		'<span class="index-text04">'+re[i].Name+'</span>'
					all +=		'<span class="index-text05">'+re[i].PositionName+'</span>'
					all +=		'<span class="index-text06">'+re[i].Qualifications+'</span>'
					all +=		'<span class="index-text07">'+re[i].SalaryExpectation+'</span>'
					all +=	'</p>'
				}
				
				$("#allRes").html(all);
				
				this.isNext = data.Result.IsNext
				this.pageIndex4 ++
			}
		}.bind(this)
	});
}
/*
 * 根据条件筛选全部简历
 */
function ChooseQualiR(e){
	quali = e.innerText;
	console.log(quali)
	this.Qualifications = quali;
	this.pageIndex4 = 1;
	this.pageSize = 1000;
	GetAllResume1();
}
function ChoosePosiR(e){
	pos1 = e.innerText;
	this.pos = pos1
//	console.log(this.pos)
	this.pageIndex4 = 1;
	this.pageSize = 1000;
	GetAllResume1();
}
function ChooseRegionR(e){
	place1 = e.innerText;
	this.place = place1;
//	console.log(this.region);
	this.pageIndex4 = 1;
	this.pageSize = 1000;
	GetAllResume1();
}
function ChooseSalaryR(e){
	type1 = e.id;
	this.salaryType = type1;
//	console.log(this.salaryType);
	this.pageIndex4 = 1;
	this.pageSize = 1000;
	GetAllResume1();
}

/*
 * 显示简历信息详情
 */
function ShowResumeDe(resumeID){
	window.open("detail-resume.html?id="+resumeID.id);
}