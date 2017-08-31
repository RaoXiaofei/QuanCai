/**
 * 获取公司福利标签
 */
var tagg = '';
var taggID = [];
$.ajax({
	type:"get",
	url:urlf+"api/Sys/GetWelfareTagList",
	async:true,
	success:function(data){	
		console.log(data.Result);
		if(data.Status == 1){
			for(var i = 0; i < data.Result.length; i++){
				var welName = data.Result[i].Name; 
				var welID = data.Result[i].ID;
				tagg +=	'<span class="recWelfare-text" id='+welID+'>'+welName+'</span>';
			}
			$("#recuit-wel").html(tagg);
		}
		else{
			alert(data.Result);
		}
		
		$(".recWelfare-text").each(function(){
			$(this).click(function(){
				
				$(this).toggleClass("recWelfare-text");
				console.log(11);
				
				if($(this).attr("class") == "recWelfare-text"){
					var id = $(this).attr("id")
					taggID.push(id);
					console.log(taggID)
				}
			})
		})
	}
});