var pageIndex2 = 1;
var allB = '';
GetBusList();

/*
 * 点击显示全国大巴信息
 */
$("#nav04").attr("href","#bus-infor").click(function(){
	this.pageIndex2 = 1;
	this.pageSize = 20;
	this.allB = ''
	GetBusList();
}.bind(this))
/*
 * 获取全国大巴列表函数
 */
function GetBusList(){
	
	$.ajax({
		type:"get",
		url:urlf+"api/Company/Bus?pageIndex="+this.pageIndex2+"&pageSize="+this.pageSize,
		async:true,
		success:function(data){
			if(data.Status == 1){
				var re = data.Result.List;
//				console.log(data.Result);
				for(var i in re){
					allB += '<p class="index-guesstext">'
					allB +=		'<span class="index-text20">'+re[i].DriverName+'</span>'
					allB +=		'<span class="index-text21">'+re[i].Address+'</span>'
					allB +=		'<span class="index-text22">'+re[i].LicensePlate+'</span>'
					allB +=		'<span class="index-text23">'+re[i].Phone+'</span>'	
					allB +=	'</p>'			
				}
				$("#allBu").html(allB);
				
				this.isNext = data.Result.IsNext;
				this.pageIndex2++;
			}
			else{
				alert(data.Status);
			}
		}.bind(this)
	});
}
function GetMore5(){
	this.isLoading = true;
	if(this.isLoading = true){       	
		if(this.isNext){		      			
			$.ajax({
				type:"get",
				url:urlf+"api/Company/Bus?pageIndex="+this.pageIndex2+"&pageSize="+this.pageSize,
				async:true,
				success:function(data){
					if(data.Status == 1){
						var re = data.Result.List;
//						console.log(data.Result);
						for(var i in re){
							allB += '<p class="index-guesstext">'
							allB +=		'<span class="index-text04">'+re[i].DriverName+'</span>'
							allB +=		'<span class="index-text05">'+re[i].Address+'</span>'
							allB +=		'<span class="index-text05">'+re[i].LicensePlate+'</span>'
							allB +=		'<span class="index-text07">'+re[i].Phone+'</span>'	
							allB +=	'</p>'			
						}
						$("#allBu").html(allB);
	
							this.isNext = data.Result.IsNext;
	                        this.pageIndex2++;   
	//	                            console.log(this.pageIndex)
	                        this.isLoading = false;
					}
					else{
						alert(data.Status)
					}
				}.bind(this)
			});
		}
		else{
			alert("没有更多了")
		}
	}
}
