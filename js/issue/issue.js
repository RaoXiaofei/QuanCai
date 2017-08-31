/*
 * 点击跳转各项发布信息
 */
$('.TableCon').hide();
$('#issue-recruit').show();
function SelectCon(e){
//	console.log(e.value);
	var TableCon = $('.TableCon');
//	console.log(TableCon);
	$('.TableCon').hide();
	$('#'+e.value).show();
	
	var Pro = e.value+'cmbProvince';//创建一个动态的省
	
	var City = e.value+'cmbCity';
	
	var Area = e.value+'cmbArea';
	
	addressInit(Pro, City, Area);
	Jobs('销售');
}
var city = unescape(getCookie("city"));
var changeC = getCookie("change");
if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = unescape(city);
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}
/*
 * 获取职位名称和职位类名
 */
var position = '';
var deposition = '';
$(document).ready(function(){
	$.ajax({
		url:urlf+"api/Sys/GetPositionListToRe",
		success:function(data){
			console.log(data.Result);
			if(data.Status == 1){
				for(var i = 0; i < data.Result.length; i++){
					var re = data.Result;
					position += '<option><span class="issuetop-text03">'+re[i].ClassName+'</span></option>';
					for(var j in re[i].PositionList){
						deposition += '<option value="'+ re[0].PositionList[j].ID+'"><span class="issuetop-text03">'+re[0].PositionList[j].Name+'</span></option>';
					}
				}
				
				$(".recruit-select01").html(position);
				$(".recruit-select02").html(deposition);
			}
		else{
				alert(data.Status);
			}
		}
	});
});

/*
 * 职位二级联动
 */
function Jobs(e){
var deposition1 = '';
	$.ajax({
		url:urlf+"api/Sys/GetPositionList",
		success:function(data){
			if(data.Status ==1){
//				console.log(data.Result);
				var abc = data.Result;
				for(var i = 0; i < abc.length; i++){
					if(abc[i].ClassName == e){
//						console.log(abc[i].PositionList);
						for(var j = 0; j < abc[i].PositionList.length; j++){
							deposition1 += '<option value="'+abc[i].PositionList[j].ID+'"><span class="issuetop-text03">'+abc[i].PositionList[j].Name+'</span></option>';
						}
					}					
				}
//				console.log(deposition1)
				$(".recruit-select02").html(deposition1);
			}
		}
	}); 
}
Jobs('销售')

/**
 * 获取公司福利标签
 */
var tagg = '';
var taggID = '';
$.ajax({
	type:"get",
	url:urlf+"api/Sys/GetWelfareTagList",
	async:true,
	success:function(data){	
//		console.log(data.Result);
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
				taggID += ""+$(this).attr("id")+",";
				console.log(taggID);
			})
		})
	}
});

/*
 * 点击发布招聘信息
 */
$("#issue-recruit-button").click(function(){	
	var PositionID = $("#recruit-select02").val();
	var Salary = parseInt($("#recruit-salary").val());
//	console.log(Salary)
	var Province = $("#issue-recruitcmbProvince").val();
	var City = $("#issue-recruitcmbCity").val();
	var Region = $("#issue-recruitcmbArea").val();
	var Address = $("#recruit-address").val();
	var JobDescription = $("#recruit-describe").val();
	var Requirement = $("#recruit-require").val();
	var WelfareTag = taggID.substring(0,taggID.length-1);
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCCreatePosition",
		dataType:"json",
		data:{
			"PositionID": PositionID,
		    "Salary": Salary,
		    "Province": Province,
		    "City": City,
		    "Region": Region,
		    "Address": Address,
		    "JobDescription": JobDescription,
		    "Requirement": Requirement,
		    "WelfareTag": WelfareTag,
		    "Token": Token
		},
		success:function(data) {	
			if(data.Status==1) {			
				alert("发布成功!");				
			}else{
				alert(data.Result);
			}
		}
	});
});

/*
 * 点击发布简历信息
 */
$("#issue-resume-button").click(function(){
	var Name = $("#resume-name").val();
	var Sex = $('input:radio:checked').val();
	var ResumeQQ = $("#resumeQQ").val();
	var Province = $("#issue-resumecmbProvince").val();
	var City = $("#issue-resumecmbCity").val();
	var Region = $("#issue-resumecmbArea").val();
	var Address = $("#resume-address").val();
	var WorkExperience = $("#resume-select01").find("option:selected").text();
	var Phone = $("#resume-phone").val();
	var Qualifications = $("#resume-select02").find("option:selected").text();
	var PositionID = $("#resume-select03").find("option:selected").val();
	var SalaryExpectation = parseInt($("#salary-expire").val());
	var Introduction = $("#resume-selfIntro").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCCreateResume",
		async:true,
		data:{
			"Name": Name,
		    "Sex": Sex,
		    "Province": Province,
		    "City": City,
		    "Region": Region,
		    "Address": Address,
		    "WorkExperience": WorkExperience,
		    "phone": Phone,
		    "QQNumber":ResumeQQ,
		    "Qualifications": Qualifications,
		    "PositionID": PositionID,
		    "SalaryExpectation": SalaryExpectation,
		    "Introduction": Introduction,
		    "Token": Token
		},
		success:function(data){
			console.log(data.Result);
			if(data.Status == 1){
				alert("发布简历信息成功");
			}
			else{
				alert(data.Result);
			}
		}
	});
})

/*
 * 点击发布供人信息
 */
$("#issue-provide-button").click(function(){
	var WorkType = $("#provide-worktype").val()
	var Salary = parseInt($("#provide-salary").val());
	var Count = parseInt($("#provide-count").val());
	var Name = $("#provide-name").val();
	var Phone = $("#provide-phone").val();
	var Province = $("#issue-providecmbProvince").val();
	var City = $("#issue-providecmbCity").val();
	var Region = $("#issue-providecmbArea").val();
	var Address = $("#provide-address").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCCreateProvide",
		data:{
			"WorkType": WorkType,
		  	"Salary": Salary,
		  	"Count": Count,
		  	"Name": Name,
		  	"Phone": Phone,
		  	"Province": Province,
		  	"City": City,
		  	"Region": Region,
		  	"Address": Address,
		  	"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布供人成功");
			}
			else{
				alert(data.Result);
			}
		}
	});
	
})

//出租房价目表上传
UploadPriceImg("rentImage", "rentImge", "rentImga")
//出租房详情上传
UploadListImg("rentInforImage", "rentInforImge", "rentInforImga")
/*
 * 点击发布周边租房信息
 */
$("#issue-rent-button").click(function(){
	var Name = $("#rent-name").val();
	var Province = $("#issue-rentcmbProvince").val();
	var City = $("#issue-rentcmbCity").val();
	var Region = $("#issue-rentcmbArea").val();
	var Address = $("#rent-address").val()
	var Longitude = 0;
	var Latitude = 0;
	var Introduce = $("#rent-intro").val();
	var PriceImage = image_value;
	
	
	var img=[];	
	var ImageList = aimg.join(",")
	
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateHouse",
		async:true,
		data:{
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Longitude": 0,
			"Latitude": 0,
			"Introduce": Introduce,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})


//暑假工价目表上传
UploadPriceImg("summerImage", "summerImge", "summerImga");
//暑假工工作介绍图片上传
UploadWorkImg("summInforImage", "summInforImge", "summInforImga");
/*
 * 发布暑假工信息
 */
$("#issue-summer-button").click(function(){
	var Name = $("#summer-name").val();
	var Province = $("#issue-summercmbProvince").val();
	var City = $("#issue-summercmbCity").val();
	var Region = $("#issue-summercmbArea").val();
	var Address = $("#summer-address").val()
	var Introduce = $("#summer-intro").val();
	var Type = 0;
	var PriceImage = image_value;
	
	var img=[];	
	var ImageList = bimg.join(",")
	
//	console.log(ImageList);
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateSummerJob",
		async:true,
		data:{
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
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})

//上传寒假工价目表图片和工作介绍图片
UploadPriceImg("winnImage", "winnImge", "winnImga");
UploadWorkImg("winnInforImage", "winnInforImge", "winnInforImga");
/*
 * 发布寒假工信息
 */
$("#issue-winner-button").click(function(){
	var Name = $("#winner-name").val();
	var Province = $("#issue-winnercmbProvince").val();
	var City = $("#issue-winnercmbCity").val();
	var Region = $("#issue-winnercmbArea").val();
	var Address = $("#winner-address").val()
	var Introduce = $("#winner-intro").val();
	var Type = 3;
	var PriceImage = image_value;
	var img=[];	
	var ImageList = bimg.join(",")

//	var ImageList = ""+image_value0+","+image_value1+","+image_value2+","+image_value3+","+image_value4+"";
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateSummerJob",
		async:true,
		data:{
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
				alert("发布成功");
			}
			else{
				alert(data.Status);
			}
		}
		
	});
})

//上传短期工价目表图片和工作介绍图片
UploadPriceImg("shortImage", "shortImge", "shortImga");
UploadWorkImg("shortInforImage", "shortInforImge", "shortInforImga");
/*
 * 发布短期工信息
 */
$("#issue-short-button").click(function(){
	var Name = $("#short-name").val();
	var Province = $("#issue-shortcmbProvince").val();
	var City = $("#issue-shortcmbCity").val();
	var Region = $("#issue-shortcmbArea").val();
	var Address = $("#short-address").val();
	var Introduce = $("#short-intro").val();
	var Type = 1;
	var PriceImage = image_value;
	
	console.log(image_value)
	var img=[];	
	var ImageList = bimg.join(",")
//	var ImageList = ""+image_value0+","+image_value1+","+image_value2+","+image_value3+","+image_value4+"";
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateSummerJob",
		async:true,
		data:{
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
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})

//上传出国打工价目表图片和工作介绍图片
UploadPriceImg("abroadImage", "abroadImge", "abroadImga");
UploadWorkImg("abroadInforImage", "abroadInforImge", "abroadInforImga");
/*
 * 发布出国打工信息
 */
$("#issue-abroad-button").click(function(){
	var Name = $("#abroad-name").val();
	var Province = $("#issue-abroadcmbProvince").val();
	var City = $("#issue-abroadcmbCity").val();
	var Region = $("#issue-abroadcmbArea").val();
	var Address = $("#abroad-address").val()
	var Introduce = $("#abroad-intro").val();
	var Type = 2;
	var PriceImage = image_value;
	var img=[];	
	var ImageList = bimg.join(",")
//	var ImageList = ""+image_value0+","+image_value1+","+image_value2+","+image_value3+","+image_value4+"";
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateSummerJob",
		async:true,
		data:{
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
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})

/*
 * 发布车辆信息
 */
$("#issue-bus-button").click(function(){
	var Name = $("#driver-name").val();
	var Plate = $("#car-number").val();
	var Province = $("#issue-buscmbProvince").val();
	var City = $("#issue-buscmbCity").val();
	var Region = $("#issue-buscmbArea").val();
	var Address = $("#car-address").val()
	var Introduce = $("#car-intro").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateBus",
		async:true,
		data:{
			"DriverName": Name,
  			"LicensePlate": Plate,
 		 	"Province": Province,
  			"City": City,
  			"Region": Region,
  			"Address": Address,
  			"Introduce": Introduce,
  			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
