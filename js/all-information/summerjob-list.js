var summerID = '';
var winnerID = '';
var abroadID = '';
var shortID = '';

var Token = getCookie("token");
/*
 * 获取暑假工列表
 */
function getSummerList(){
	var sum = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=0",
		async:true,
		data:{
			"Token": Token
		},
		success:function(data){
//			console.log(data.Result);
			if(data.Status = 1){
				var re = data.Result;
				for(var i in re){
					sum+= '<p class="index-guesstext"id="'+re[i].ID+'" onclick="ShowSummerInfor(this)">'
					sum+= 	 '<span class="index-text40">'+re[i].Name+'</span>'
					sum+= 	 '<span class="index-text41">'+re[i].Company+'</span>'
					sum+= 	 '<span class="index-text43">'+re[i].Address+'</span>'
					sum+= '</p>'
				}				
				$("#Sum").html(sum);
			}
			else{
				alert(data.Result);
			}
		}
		
		
	});
}

/*
 * 显示暑假工详细信息
 */
function ShowSummerInfor(inforID){
	summerID = inforID.id;
	
	$("#modify-summer-button").show();
	$("#SaveSummer").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#summer-information').show();
		
	var summNa = '';
	var summAddr = '';
	var summIntro = '';
	var img = "";
	var summImg = [];
	var priImg = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetSummerJobDetail?id="+summerID,
		async:true,
		data:{
			"Token":Token
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				
				pro += '<input type="text" class="input-text02" id="summerProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro +=	'<input type="text" class="input-text02" id="summerCity" value="'+re.City+'" readonly="readonly"/>'
				pro +=	'<input type="text" class="input-text02" id="summerArea" value="'+re.Region+'" readonly="readonly"/>'
				
				
				summNa += '<input type="text" class="input-text01" id="summer-name" value="'+re.Name+'"readonly="readonly"/>'
				summAddr += '<input type="text" class="input-text01" id="summer-address"value="'+re.Address+'"readonly="readonly"/>'
				summIntro += '<textarea class="input-textarea01" id="summer-intro"readonly="readonly">'+re.Introduce+'</textarea>'
				
				priImg += '<input type="file" id="updateSummerImge"/>';
				priImg += '<img src="'+urlf+re.PriceImage+'" id="updateSummerImga"/>';
				
				img += '<input type="file" id="updateSummInforImge" multiple="multiple"/>';
			
				for (var i = 0; i < re.ImageList.length; i++) {
					summImg[i] = urlf+re.ImageList[i].Image;	
					img +=	'<img src="'+summImg[i]+'" id="summ_imgList0"/>'					
				}
				
				$("#summName").html(summNa);
				$("#summAddress").html(summAddr);
				$("#summIntro").html(summIntro);
				$("#updateSummInforImage").html(img);
				$("#showPCR4").html(pro)
				$("#updateSummerImage").html(priImg);
			}
			else{
				alert(data.Result);
			}
			/*
			 * 点击修改按钮
			 */
			$("#modify-summer-button").click(function(){
				$("#modify-summer-button").hide();
				$("#SaveSummer").show();
				//修改上传暑假工价目表和工作介绍图片			
				UploadPriceImg("updateSummerImage", "updateSummerImge", "updateSummerImga");
				UploadWorkImg("updateSummInforImage", "updateSummInforImge", "summ_imgList0");
				
				$('input').attr("readonly",false);
				$('textarea').attr("readonly",false);
				$("#showPCR4").replaceWith('<li id="showPCR4"><select id="summercmbProvince" name="cmbProvince" class="select-frame02"><select><select id="summercmbCity" name="cmbCity" class="select-frame02"><select>  <select id="summercmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('summercmbProvince', 'summercmbCity', 'summercmbArea');
				ShowPAR("summercmbProvince", "summercmbCity", "summercmbArea", re.Province, re.City, re.Region);				
			})
		}
	});
}
/*
 * 修改暑假工信息
 */
$("#SaveSummer").click(function(){
	var ID = summerID;
	var Name = $("#summer-name").val();
	var Province = $("#summercmbProvince").val();
	var City = $("#summercmbCity").val();
	var Region = $("#summercmbArea").val();
	var Address = $("#summer-address").val()
	var Introduce = $("#summer-intro").val();
	var Type = 0;
	var PriceImage = image_value;
	
	var img=[];	
	var ImageList = bimg.join(",")
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateSummerJob",
		async:true,
		data:{
			"JobID": ID,
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Introduce": Introduce,
			"Type": Type,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("修改成功");
				$("#SaveSummer").hide();
				$('input').attr("readonly",true);
				$('textarea').attr("readonly",true);
				$("#summercmbProvince").attr("disabled",true);
				$("#summercmbCity").attr("disabled",true);
				$("#summercmbArea").attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})	

/*
 * 删除暑假工信息
 */
$("#delete-summer-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelSummerJob?id="+summerID+"&Token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$('#menu-summer-infor').click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})





/*
 * 获取寒假工列表信息
 */
function getWinnerList(){
	var Token = getCookie("token");
	var winn = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=3",
		async:true,
		data:{
			"Token":Token
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				for(var i in re){
					winn += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowWinnerInfor(this)">'
					winn += 		'<span class="index-text40">'+re[i].Name+'</span>'
					winn += 		'<span class="index-text41">'+re[i].Company+'</span>'
					winn += 		'<span class="index-text43">'+re[i].Address+'</span>'
					winn +=  '</p>'	
				}
				
				$("#winnInfor").html(winn);
			}
		}
	});
}

/*
 * 显示寒假工详细信息
 */
function ShowWinnerInfor(inforID){
	winnerID = inforID.id;
	
	$("#modify-winner-button").show();
	$("#SaveWinner").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#winner-information').show();
	var Token = getCookie("token");
	
	var winnNa='';
	var winnAdd='';
	var winnIntro='';
	var winnImg = [];
	var img = ''
	var pro = '';
	var priImg = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetSummerJobDetail?id="+winnerID+"&token="+Token,
		async:true,
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				re = data.Result;
				
				pro += '<input type="text" class="input-text02" id="winnerProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro +=	'<input type="text" class="input-text02" id="winnerCity" value="'+re.City+'" readonly="readonly"/>'
				pro +=	'<input type="text" class="input-text02" id="winnerArea" value="'+re.Region+'" readonly="readonly"/>'

				winnNa += '<input type="text" class="input-text01" id="winner-name" value="'+re.Name+'"readonly="readonly"/>'
				winnAdd += '<input type="text" class="input-text01" id="winner-address" value="'+re.Address+'"readonly="readonly"/>'
				winnIntro += '<textarea class="input-textarea01" id="winner-intro"readonly="readonly">'+re.Introduce+'</textarea>'
				
				priImg += '<input type="file" id="updateWinnImge"/>';
				priImg += '<img src="'+urlf+re.PriceImage+'" id="updateWinnImga"/>';
				
//				$("#updateWinnImga").attr("src",urlf+re.PriceImage);
				img += '<input type="file" id="updateWinnInforImge" multiple="multiple"/>'
				for (var i = 0; i < re.ImageList.length; i++) {					
					winnImg[i] = urlf+re.ImageList[i].Image;				
					img +=	'<img src="'+winnImg[i]+'" id="winn_imgList0"/>'					
				}
				
				$("#winnName").html(winnNa);
				$("#winnAddr").html(winnAdd);
				$("#winnIntro").html(winnIntro);
				$("#updateWinnInforImage").html(img);
				$("#showPCR5").html(pro);
				$("#updateWinnImage").html(priImg);
			}
			
			/*
			 * 修改寒假工信息
			 */
			$("#modify-winner-button").click(function(){
				$("#modify-winner-button").hide();
				$("#SaveWinner").show();
				//修改上传寒假工价目表和工作介绍图片
				UploadPriceImg("updateWinnImage", "updateWinnImge", "updateWinnImga");
				UploadWorkImg("updateWinnInforImage", "updateWinnInforImge", "winn_imgList0");
				
				$('input').attr("readonly",false);
				$('textarea').attr("readonly",false);
				$("#showPCR5").replaceWith('<li id="showPCR5"><select id="winnercmbProvince" name="cmbProvince" class="select-frame02"><select><select id="winnercmbCity" name="cmbCity" class="select-frame02"><select>  <select id="winnercmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('winnercmbProvince', 'winnercmbCity', 'winnercmbArea');
				ShowPAR("winnercmbProvince", "winnercmbCity", "winnercmbArea", re.Province, re.City, re.Region);
			})
		}
	});
}

$("#SaveWinner").click(function(){
	var ID = winnerID;
	var Name = $("#winner-name").val();
	var Province = $("#winnercmbProvince").val();
	var City = $("#winnercmbCity").val();
	var Region = $("#winnercmbArea").val();
	var Address = $("#winner-address").val()
	var Introduce = $("#winner-intro").val();
	var Type = 3;
	
	var PriceImage = image_value;
	
	var img=[];	
	var ImageList = bimg.join(",")
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateSummerJob",
		async:true,
		data:{
			"JobID":ID,
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Introduce": Introduce,
			"Type": Type,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("修改成功");
				$("#SaveWinner").hide();
				$('input').attr("readonly",true);
				$('textarea').attr("readonly",true);
				$("#winnercmbProvince").attr("disabled",true);
				$("#winnercmbCity").attr("disabled",true);
				$("#winnercmbArea").attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})

/*
 * 删除寒假工信息
 */
$("#delete-winner-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelSummerJob?id="+winnerID+"&Token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$('#menu-winner-infor').click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})






/*
 * 获取短期工列表
 */
function getShortList(){
	var sho = '';
	var Token = getCookie("token");
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=1",
		async:true,
		data:{
			"Token":Token
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				
				for(var i in re){
					sho += '<p class="index-guesstext" id='+re[i].ID+' onclick="ShowShortInfor(this)">'
					sho += 		'<span class="index-text40">'+re[i].Name+'</span>'
					sho += 		'<span class="index-text41">'+re[i].Company+'</span>'
					sho += 		'<span class="index-text43">'+re[i].Address+'</span>'
					sho += 	'</p>'
				}
				$("#Shor").html(sho);
			}
		}
	});
}

/*
 * 显示短期工详细信息
 */
function ShowShortInfor(inforID){
	shortID = inforID.id;
	
	$("#modify-short-button").show();
	$("#SaveShort").hide();
	$("#modify-short-button").show();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#short-information').show();
	
	var Token = getCookie("token");
	var Nam = "";
	var Addr = "";
	var Intro = "";
	var shortImg=[];
	var img = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetSummerJobDetail?id="+shortID+"&token="+Token,
		async:true,
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				pro += '<input type="text" class="input-text02" id="shortProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="shortCity" value="'+re.City+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="shortArea" value="'+re.Region+'" readonly="readonly"/>'
				
				Nam += '<input type="text" class="input-text01" id="short-name" value="'+re.Name+'"  readonly="readonly"/>'
				Addr += '<input type="text" class="input-text01" id="short-address" value="'+re.Address+'"  readonly="readonly"/>'
				Intro += '<textarea class="input-textarea01" id="short-intro"  readonly="readonly">'+re.Introduce+'</textarea>'
				
				$("#updateShortImga").attr("src",urlf+re.PriceImage);
				img += '<input type="file" id="updateShortInforImge" multiple="multiple"/>'
				for (var i = 0; i < re.ImageList.length; i++) {
					shortImg[i] = urlf+re.ImageList[i].Image;				
					img +=	'<img src="'+shortImg[i]+'"/>'				
				}
				
				$("#shoName").html(Nam);
				$("#shoAddress").html(Addr);
				$("#shoIntro").html(Intro);
				$("#updateShortInforImage").html(img);
				$("#showPCR6").html(pro);
			}
			
			/*
			 * 修改短期工信息
			 */
			$("#modify-short-button").click(function(){	
				$("#SaveShort").show();
				$("#modify-short-button").hide();
				//修改上传短期工价目表和工作介绍图片
				UploadPriceImg("updateShortImage", "updateShortImge", "updateShortImga");
				UploadWorkImg("updateShortInforImage", "updateShortInforImge", "short_imgList0");
				
				$('input').attr("readonly",false);
				$('textarea').attr("readonly",false);
				$("#showPCR6").replaceWith('<li id="showPCR6"><select id="shortcmbProvince" name="cmbProvince" class="select-frame02"><select><select id="shortcmbCity" name="cmbCity" class="select-frame02"><select>  <select id="shortcmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('shortcmbProvince', 'shortcmbCity', 'shortcmbArea');
				ShowPAR("shortcmbProvince", "shortcmbCity", "shortcmbArea", re.Province, re.City, re.Region);
			})
		}
	});
}
/*
 * 修改短期工信息
 */
$("#SaveShort").click(function(){
	var ID = shortID;
	var Name = $("#short-name").val();
	var Province = $("#shortcmbProvince").val();
	var City = $("#shortcmbCity").val();
	var Region = $("#shortcmbArea").val();
	console.log(Region)
	var Address = $("#short-address").val();
	var Introduce = $("#short-intro").val();
	var Type = 1;
	var PriceImage = image_value;
	
	var img=[];	
	var ImageList = bimg.join(",")
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateSummerJob",
		async:true,
		data:{
			"JobID": ID,
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Introduce": Introduce,
			"Type": Type,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("修改成功");
				$("#SaveShort").hide();
				$('input').attr("readonly",true);
				$('textarea').attr("readonly",true);
				$("#shortcmbProvince").attr("disabled",true);
				$("#shortcmbCity").attr("disabled",true);
				$("#shortcmbArea").attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})	
	
/*
 * 删除短期工信息
 */
$("#delete-short-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelSummerJob?id="+shortID+"&Token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$('#menu-short-infor').click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})





/*
 * 获取出国打工列表
 */
function getAbroadList(){
	var ab = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=2",
		async:true,
		data:{
			"Token":Token
		},
		success:function(data){
			if(data.Status == 1){
				var re = data.Result;
//				console.log(data.Result);
				
				for(var i in re){
					ab += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowAbroadInfor(this)">'
					ab += 		'<span class="index-text40">'+re[i].Name+'</span>'
					ab += 		'<span class="index-text41">'+re[i].Company+'</span>'
					ab += 		'<span class="index-text43">'+re[i].Address+'</span>'
					ab += '</p>'
				}
				$("#Abro").html(ab);
			}
		}
	});
}

/*
 * 显示  修改  删除出国打工详细信息
 */
function ShowAbroadInfor(inforID){
	abroadID = inforID.id;
	
	$("#modify-abroad-button").show();
	$("#SaveAbroad").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#abroad-information').show();
	var Token = getCookie("token");
	var abrNa = '';
	var abrAdd = '';
	var abrInt = '';
	var abImg = [];
	var img = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetSummerJobDetail?id="+abroadID+"&token="+Token,
		async:true,
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				
				pro += '<input type="text" class="input-text02" id="abroadProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="abroadCity" value="'+re.City+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="abroadArea" value="'+re.Region+'" readonly="readonly"/>'
				abrNa += '<input type="text" class="input-text01" id="abroad-name" value="'+re.Name+'"readonly="readonly"/>';
				abrAdd += '<input type="text" class="input-text01" id="abroad-address" value="'+re.Address+'"readonly="readonly"/>';
				abrInt += '<textarea class="input-textarea01" id="abroad-intro"readonly="readonly">'+re.Introduce+'</textarea>'
				
				$("#updateAbroadImga").attr("src",urlf+re.PriceImage);
				img += '<input type="file" id="updateAbroadInforImge" multiple="multiple"/>'
				for (var i = 0; i < re.ImageList.length; i++) {
					abImg[i] = urlf+re.ImageList[i].Image;
					
					img +=	'<img src="'+abImg[i]+'"/>'
				}
				$("#abrName").html(abrNa);
				$("#abrAddress").html(abrAdd);
				$("#abrIntro").html(abrInt);
				$("#updateAbroadInforImage").html(img);
				$("#showPCR7").html(pro);
			}					
			/*
			 * 修改出国打工信息
			 */
			$("#modify-abroad-button").click(function(){
				$(this).css("background-color","#FF6146");
				$("#SaveAbroad").show();
				$("#modify-abroad-button").hide();
				$('input').attr("readonly",false);
				$('textarea').attr("readonly",false);
				
				//修改上传短期工价目表和工作介绍图片
				UploadPriceImg("updateAbroadImage", "updateAbroadImge", "updateAbroadImga");
				UploadWorkImg("updateAbroadInforImage", "updateAbroadInforImge", "abroad_imgList0");
				
				$("#showPCR7").replaceWith('<li id="showPCR7"><select id="abroadcmbProvince" name="cmbProvince" class="select-frame02"><select><select id="abroadcmbCity" name="cmbCity" class="select-frame02"><select>  <select id="abroadcmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('abroadcmbProvince', 'abroadcmbCity', 'abroadcmbArea');
				ShowPAR("abroadcmbProvince", "abroadcmbCity", "abroadcmbArea", re.Province, re.City, re.Region);	
			})
		}
	});
	
}
/*
 * 修改出国打工信息
 */
$("#SaveAbroad").click(function(){
	$("#SaveAbroad").css("background-color","#FF6146");				
	var ID = abroadID;
	var Name = $("#abroad-name").val();
	var Province = $("#abroadcmbProvince").val();
	var City = $("#abroadcmbCity").val();
	var Region = $("#abroadcmbArea").val();
	var Address = $("#abroad-address").val()
	var Introduce = $("#abroad-intro").val();
	var Type = 2;
	
	var PriceImage = image_value;
	var img=[];	
	var ImageList = bimg.join(",")
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateSummerJob",
		async:true,
		data:{
			"JobID": ID,
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Introduce": Introduce,
			"Type": Type,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("修改成功");
				$("#SaveAbroad").hide();
				$('#abroadcmbProvince').attr("disabled","disabled");
				$('#abroadresumecmbCity').attr("disabled","disabled");
				$('#abroadresumecmbArea').attr("disabled","disabled");	
				$('input').attr("readonly",true);
				$('textarea').attr("readonly",true);							
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
/*
 * 删除出国打工信息
 */
$("#delete-abroad-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelSummerJob?id="+abroadID+"&Token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$("#menu-abroad-infor").click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})