var isNext = false;
var isLoading = false;
var pageIndex0 = 1;
var pageSize = 20;
var li = '';
var infor='';

var city3 = unescape(getCookie("city"));
var citycici = city3.split("市")[0];

var changeC = getCookie("change");

if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = citycici;
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}

$.ajax({
	type:"POST",
	url:urlf+"api/Home/Info",
	data:{
		"pageIndex": this.pageIndex0,
  		"pageSize": this.pageSize,
  		"lat": 0,
  		"lng": 0,
  		"city": this.city
	}, 
	success:function(data){
		if(data.Status ==1){			
			//轮播图
//			console.log(data.Result.Banner);			
			for(var i = 0; i < data.Result.Banner.length;i++){
				var a = data.Result.Banner[i];
//				if(a.IsJump == false){
//					li +='<div class="swiper-slide" ><img src="'+a.Image+'" style="width: 100%;height:100%"/></div>';
//				}else{
					li +='<div class="swiper-slide" ><a herf="'+a.Url+'"><img src="'+a.Image+'" style="width: 100%;height:100%"/></a></div>';
//				}
			}
			$('#banner1').html(li);
			
//			console.log(data.Result);
			//猜你喜欢
			for(var i = 0; i < data.Result.List.length;i++){
				var b = data.Result.List[i];
					infor +='<p class="index-guesstext" id="'+b.ID+'" onclick="ShowIndexDe(this)">'
					infor +=	'<span class="index-text04">'+b.Name+'</span>'
					infor +=	'<span class="index-text05">'+b.CompanyName+'</span>'
					infor +=	'<span class="index-text07">'+b.Salary+'</span>'
					infor +='</p>';
			}
			$('#Guess-Infor').html(infor);
			this.isNext = data.Result.IsNext
			this.pageIndex0 ++
		}
	}.bind(this)			
});

var im = ""
function GetMore(){
    this.isLoading = true;
    if(this.isLoading = true){ 
        //计算
    	if(this.isNext){		      			
			$.ajax({
				type:"POST",
				url:urlf+"api/Home/Info",
				async:true,
				data:{
					"pageIndex": this.pageIndex0,
			  		"pageSize": this.pageSize,
			  		"lat": 0,
			  		"lng": 0,
			  		"city": this.city
				}, 
				success:function(data){
					if(data.Status ==1){								
//							console.log(data.Result);
						//猜你喜欢
						for(var i = 0; i < data.Result.List.length;i++){
							var b = data.Result.List[i];
								infor +='<p class="index-guesstext" id="'+b.ID+'" onclick="ShowIndexDe(this)">'
								infor +=	'<span class="index-text04">'+b.Name+'</span>'
								infor +=	'<span class="index-text05">'+b.CompanyName+'</span>'
								infor +=	'<span class="index-text07">'+b.Salary+'</span>'
								infor +='</p>';
						}
						$('#Guess-Infor').html(infor);
						
						this.isNext = data.Result.IsNext;
                        this.pageIndex0++;     
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
 * 首页信息详情显示
 */
function ShowIndexDe(listID){
	window.open('index-detail.html?id='+listID.id);
	
}

$('.top').click(function(){
	window.open('issue.html');
})