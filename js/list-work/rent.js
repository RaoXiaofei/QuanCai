var pageIndex9 = 1;

var allRe = '';
GetRoundRentInfor();

/*
 * 点击获取全部周边出租房信息列表
 */
$("#nav09").attr("href","#rent-infor").click(function(){
	this.pageIndex9 = 1;
	this.pageSize = 20;
	this.allRe = '';
	GetRoundRentInfor();
}.bind(this))
/*
 * 获取全部周边出租房信息列表
 */
function GetRoundRentInfor(){
	
	$.ajax({
		type:"post",
		url:urlf+"api/Company/House",
		async:true,
		data:{
			"PageIndex": this.pageIndex9,
  			"PageSize": this.pageSize,
  			"Lng": 0,
  			"Lat": 0,
  			"City": this.city
		},
		success:function(data){
			if(data.Status == 1){
				var re = data.Result.List;
				for(var i in re){
					allRe += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowRentDe(this)">'
					allRe +=	 '<span class="index-text04">'+re[i].Name+'</span>'
					allRe +=	 '<span class="index-text05">'+re[i].Address+'</span>'
					allRe += '</p>'
				}
				
				$("#allRen").html(allRe);
				
				this.isNext = data.Result.IsNext;
				this.pageIndex9++;
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}

function GetMore10(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){			      		
    		$.ajax({
				type:"post",
				url:urlf+"api/Company/House",
				async:true,
				data:{
					"PageIndex": this.pageIndex9,
		  			"PageSize": this.pageSize,
		  			"Lng": 0,
		  			"Lat": 0,
		  			"City": this.city
				},
				success:function(data){
					if(data.Status == 1){
						console.log(this.pageIndex9);								
						var re = data.Result.List;
						for(var i in re){
							allRe += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowRentDe(this)">'
							allRe +=	 '<span class="index-text04">'+re[i].Name+'</span>'
							allRe +=	 '<span class="index-text05">'+re[i].Address+'</span>'
							allRe += '</p>'
						}
						
						$("#allRen").html(allRe);
						this.isNext = data.Result.IsNext;
                        this.pageIndex9++;   
                        this.isLoading = false;
					}
					else{
						alert(data.Result);
					}
				}.bind(this)
			});
		}
		else{
			alert("没有更多了");
		}
    }
}
/*
 * 显示周边租房详情
 */
function ShowRentDe(rentID){
	window.open("rent-information.html?id="+rentID.id);
}