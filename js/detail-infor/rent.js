var ListID = window.document.location.href;
//console.log(ListID);
var liID = ListID.split("id=")[1];
//console.log(liID)

var work = '';
var intro = '';
var tImg = '';
var img = '';
var ss = "";
$.ajax({
	type:"get",
	url:urlf+"api/Company/HouseDetail?id="+liID,
	async:true,
	success:function(data){
		if(data.Status == 1){
//			console.log(data.Result);
			var re = data.Result;
			/*
			 * 公司介绍图片详情
			 */
			if(re.ImageList.length == 0){
				tImg += '<div>'
				tImg += 	'<img src="" alt="该公司没有介绍图片"/>'
				tImg += '</div>'
			}
			else if(re.ImageList.length == 1){
				tImg += '<div>'
				tImg += 	'<img src="'+re.ImageList[0].Image+'" alt="该公司没有介绍图片" style = "width:400px;height:280px;"/>'
				tImg += '</div>'
			}
			else if(re.ImageList.length == 5){
				for(var i in re.ImageList){
					tImg += '<div>'
					tImg += 	'<img src="'+re.ImageList[1].Image+'" alt="图片加载出错"/>'
					tImg += '</div>'
					tImg += '<div>'
					tImg += 	'<img src="'+re.ImageList[2].Image+'" alt="图片加载出错"/>'
					tImg += '</div>'
					tImg += '<div>'
					tImg += 	'<img src="'+re.ImageList[3].Image+'" alt="图片加载出错"/>'
					tImg += '</div>'
					tImg += '<div class="img1">'
					tImg += 	'<img src="'+re.ImageList[4].Image+'" alt="图片加载出错"/>'
					tImg += '</div>'
					tImg += '<div class="img2">'
					tImg += 	'<img src="'+re.ImageList[5].Image+'" alt="图片加载出错"/>'
					tImg += '</div>'
				}
			}
			else{
				for(var i in re.ImageList){
					tImg += '<div>'
					tImg += 	'<img src="'+re.ImageList[i].Image+'"/>'
					tImg += '</div>'
				}
			}
			work+= '<div class="work-line01">'
			work+= 		'<span class="work-text09">'+re.Name+'</span>'
			work+= '</div>'
			work+= '<div class="work-line01">'
			work+= 		'<img src="assets/坐标.png" />'
			work+= 		'<span class="work-text05">&nbsp;&nbsp;'+re.Address+'</span>'
			work+= '</div>'
			work+= '<div class="work-line02">'
			work += '<div class="btn-group" role="group">'
			work +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
			work +=	  '<ul class="dropdown-menu">'
			work +=		 '<li>'+re.Phone+'</li>'
			work +=	  '</ul>'
			work +=	'</div>'
			work+= '</div>'
			
			intro += '<p class="work-section01">'+re.Introduce+'</p>'
			
			img += '<img src="'+urlf+re.PriceImage+'" class="work-section03" style="width: 600px;height: 400px;"/>'
			
			$("#Work").html(work);
			$("#wr").html(intro);
			$("#wrimg").html(img);
			$("#workImg").html(tImg);
		}
		else{
			alert(data.Result);
		}
	}
});