var pageIndex1 = 1;
var pageIndex5 = 1;
var pageIndex6 = 1;
var pageIndex7 = 1;

var allAb = '';
var allS = '';
var allSh = '';
var allWi = '';
var allWi = '';

GetWinnerInfor();
GetSummerJob();
GetShortList();
GetAbroadList();

/*
 * 暑假工点击加载
 */
$("#nav03").attr("href","#summer-infor").click(function(){		
	this.pageIndex1 = 1;
	this.pageSize = 20;
	this.allS='';
	GetSummerJob()
}.bind(this))
/*
 * 获取暑假工信息函数
 */
function GetSummerJob(){
//	console.log(this.pageIndex1)
//	this.pageSize = 10;
	$.ajax({
		type:"post",
		url:urlf+"api/Company/SummerJob",
		async:true,
		data:{
			"PageIndex": this.pageIndex1,
  			"PageSize": this.pageSize,
  			"Lng": 0,
  			"Lat": 0,
  			"Type": 0
		},
		success:function(data){
//			console.log(data.Result.List);
			var re = data.Result.List;
			if(data.Status == 1){
				for(var i in re){
					allS += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
					allS +=		'<span class="index-text04">'+re[i].Name+'</span>'
					allS +=		'<span class="index-text05">'+re[i].Address+'</span>'
					allS += '</p>'				
				}
				$("#allSum").html(allS);
				this.isNext = data.Result.IsNext
				this.pageIndex1++;
//				console.log(this.pageIndex1)
			}
		}.bind(this)
	});
}
function GetMore4(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/SummerJob",
				async:true,
				data:{
					"PageIndex": this.pageIndex1,
		  			"PageSize": this.pageSize,
		  			"Lng": 0,
		  			"Lat": 0,
		  			"Type": 0
				},
				success:function(data){
//							console.log(data.Result.List);
					var re = data.Result.List;
					if(data.Status == 1){
						for(var i in re){
							allS += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
							allS +=		'<span class="index-text04">'+re[i].Name+'</span>'
							allS +=		'<span class="index-text05">'+re[i].Address+'</span>'
							allS += '</p>'				
						}
						$("#allSum").html(allS);
						this.isNext = data.Result.IsNext;
                        this.pageIndex1++;   
//	                            console.log(this.pageIndex)
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
 * 短期工点击加载
 */
$("#nav05").attr("href","#short-infor").click(function(){
	this.pageIndex5 = 1;
	this.pageSize = 20;
	this.allSh = '';
	GetShortList();

}.bind(this))
/*
 * 获取短期工列表函数
 */
function GetShortList(){	
	$.ajax({
		type:"post",
		url:urlf+"api/Company/SummerJob",
		async:true,
		data:{
			"PageIndex": this.pageIndex5,
  			"PageSize": this.pageSize,
  			"Lng": 0,
  			"Lat": 0,
  			"Type":1
		},
		success:function(data){
			var re = data.Result.List;
//			console.log(re);
			
			for(var i in re){
				allSh += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
				allSh +=	  '<span class="index-text04">'+re[i].Name+'</span>'
				allSh +=	  '<span class="index-text05">'+re[i].Address+'</span>'
				allSh += '</p>'			
			}
			
			$("#allSho").html(allSh);
			
			this.isNext = data.Result.IsNext
			this.pageIndex5++;
			
		}.bind(this)
	});
}
function GetMore6(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/SummerJob",
				async:true,
				data:{
					"PageIndex": this.pageIndex5,
		  			"PageSize": this.pageSize,
		  			"Lng": 0,
		  			"Lat": 0,
		  			"Type":1
				},
				success:function(data){
					var re = data.Result.List;
					
					for(var i in re){
						allSh += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
						allSh +=	  '<span class="index-text04">'+re[i].Name+'</span>'
						allSh +=	  '<span class="index-text05">'+re[i].Address+'</span>'
						allSh += '</p>'			
					}
					
					$("#allSho").html(allSh);
					
					this.isNext = data.Result.IsNext
					this.pageIndex5++;
					
					this.isLoading = false;
				}.bind(this)
			});
		}
    	else{
    		alert("没有更多了")
    	}
    }
}


/*
 * 出国打工点击加载
 */
$("#nav06").attr("href","#abroad-infor").click(function(){
	this.pageSize = 20;
	this.pageIndex6 = 1;
	this.allAb = '';
	GetAbroadList();
}.bind(this))
/*
 * 获取出国打工信息列表
 */
function GetAbroadList(){
	$.ajax({
		type:"post",
		url:urlf+"api/Company/SummerJob",
		async:true,
		data:{
			"PageIndex": this.pageIndex6,
  			"PageSize": this.pageSize,
  			"Lng": 0,
 		 	"Lat": 0,
  			"Type":2
		},
		success:function(data){
//			console.log(data.Result);
			re = data.Result.List;
			for(var i in re){
				allAb += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
				allAb +=	 '<span class="index-text04">'+re[i].Name+'</span>'
				allAb +=	 '<span class="index-text05">'+re[i].Address+'</span>'
				allAb += '</p>'
			}
			
			$("#allAbl").html(allAb);
			
			this.isNext = data.Result.IsNext
			this.pageIndex6++;
		}.bind(this)
	});
}
/*
 * 点击加载更多出国打工信息
 */
function GetMore7(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		      			
    		$.ajax({
				type:"post",
				url:urlf+"api/Company/SummerJob",
				async:true,
				data:{
					"PageIndex": this.pageIndex6,
		  			"PageSize": this.pageSize,
		  			"Lng": 0,
		 		 	"Lat": 0,
		  			"Type":2
				},
				success:function(data){
//					console.log(data.Result);
					re = data.Result.List;
					for(var i in re){
						allAb += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
						allAb +=	 '<span class="index-text04">'+re[i].Name+'</span>'
						allAb +=	 '<span class="index-text05">'+re[i].Address+'</span>'
						allAb += '</p>'
					}
					
					$("#allAbl").html(allAb);
					
					this.isNext = data.Result.IsNext
					this.pageIndex6++;
					
					this.isLoading = false;
				}.bind(this)
			});
		}
		else{
			alert("没有更多了")
		}
		
    }
}


/*
 * 点击加载寒假工信息
 */
$("#nav08").attr("href","#winner-infor").click(function(){
	this.pageIndex7 = 1;
	this.pageSize = 20;
	this.allWi = '';
	GetWinnerInfor();
}.bind(this))
/*
 * 获取寒假工信息列表函数 
 */
function GetWinnerInfor(){
	
	$.ajax({
		type:"post",
		url:urlf+"api/Company/SummerJob",
		async:true,
		data:{
			"PageIndex": this.pageIndex7,
  			"PageSize": this.pageSize,
  			"Lng": 0,
  			"Lat": 0,
 			"Type":3
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);			
				var re = data.Result.List;		
				for(var i in re){
					allWi += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
					allWi += 	'<span class="index-text04">'+re[i].Name+'</span>'
					allWi += 	'<span class="index-text05">'+re[i].Address+'</span>'
					allWi += '</p>'
				}
				
				$("#allWinn").html(allWi);
				this.isNext = data.Result.IsNext
				this.pageIndex7++;
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}
function GetMore9(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		      			
    		$.ajax({
				type:"post",
				url:urlf+"api/Company/SummerJob",
				async:true,
				data:{
					"PageIndex": this.pageIndex7,
		  			"PageSize": this.pageSize,
		  			"Lng": 0,
		  			"Lat": 0,
		 			"Type":3
				},
				success:function(data){
					if(data.Status == 1){
//						console.log(data.Result);			
						var re = data.Result.List;		
						for(var i in re){
							allWi += '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowWorkDe(this)">'
							allWi += 	'<span class="index-text04">'+re[i].Name+'</span>'
							allWi += 	'<span class="index-text05">'+re[i].Address+'</span>'
							allWi += '</p>'
						}
						
						$("#allWinn").html(allWi);
						this.isNext = data.Result.IsNext;
                        this.pageIndex7++;   
//	                            console.log(this.pageIndex)
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