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
 * 下拉菜单手风琴效果
 */
//function initMenu() {
//$('#infor-menu ul').hide();
//$('#infor-menu ul:first').show();
//$('#infor-menu li a').click(
//  function() {
//    var checkElement = $(this).next();
//    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
//      return false;
//      }
//    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
//      $('#infor-menu ul:visible').slideUp('normal');
//      checkElement.slideDown('normal');
//      return false;
//      }
//    }
//  );
//}
//$(document).ready(function() {initMenu();});
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
//				console.log(taggID);
			})
		})
	}
});
/*
 * 获取职位名称和职位类名
 */
var position = '';
var deposition = '';
$(document).ready(function(){
	$.ajax({
		url:urlf+"api/Sys/GetPositionListToRe",
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){
				for(var i = 0; i < data.Result.length; i++){
					var re = data.Result;
					//职位类名
					position += '<option><span class="issuetop-text03">'+re[i].ClassName+'</span></option>';	
////					//职位名称
//					for(var j = 0; j < data.Result[i].PositionList.length; j++){
//						deposition += '<option value="'+ data.Result[i].PositionList[j].ID+'">'+data.Result[i].PositionList[j].Name+'</option>';
//					}
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
		url:urlf+"api/Sys/GetPositionListToRe",
		success:function(data){
			if(data.Status ==1){
//				console.log(data.Result);
				var abc = data.Result;
				for(var i = 0; i < abc.length; i++){
					if(abc[i].ClassName == e){
//						console.log(abc[i].PositionList);
						for(var j = 0; j < abc[i].PositionList.length; j++){
							deposition1 += '<option value="'+abc[i].PositionList[j].ID+'">'+abc[i].PositionList[j].Name+'</option>';
						}
					}					
				}
//				console.log(deposition1)
				$(".recruit-select02").html(deposition1);
			}
			else{
				alert(data.Result)
			}
		}
	}); 
}
Jobs('销售')
/*
 * 实名认证
 */
$("#cerfication-button").click(function(){
	$(this).css("background-color","#FF6146");
	var Name = $("#self-name").val();
	var Number = $("#self-number").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/User/PCAuthentication",
		async:true,
		data:{
			"Name": Name,
			"IDCard": Number,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
})

/*
 * 企业认证
 */
$("#company-comfirm").click(function(){
	$(this).css("background-color","#FF6146");
	var CompanyName = $("#company-name").val();
	var Province = $("#companycmbProvince").val();
	var City = $("#companycmbCity").val();
	var Area = $("#companycmbArea").val();
	var Address = $("#company-address").val();
	var CompanySize = $("#company-size").val();
	var CompanyNature = $("#company-nature").val();
	var CompanyTrade = $("#company-trade").val();
	var CompanyIntro = $("#company-intro").val();
	var CompanyQQ = $("#companyQQ").val();
	var Longitude = 0;
    var Latitude = 0;
    var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/User/PCEnterpriseCertification",
		async:true,
		data:{
			  "CompanyName": CompanyName,
			  "Province": Province,
			  "City": City,
			  "Region": Area,
			  "CompanyAddress": Address,
			  "CompanyScale": CompanySize,
			  "CompanyNature": CompanyNature,
			  "CompanyIndustry": CompanyTrade,
			  "CompanyIntroduce": CompanyIntro,
			  "Longitude": 0,
			  "Latitude": 0,
			  "QQNumber": CompanyQQ,
			  "Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
	
})

/*
 * 中介认证
 */
$("#middle-comfirm").click(function(){
	$(this).css("background-color","#FF6146");
	var Name = $("#middle-name").val();
	var Number = $("#middle-number").val();
	var QQnumber = $("#middleQQ").val();
	var Province = $("#middlecmbProvince").val();
	var City = $("#middlecmbCity").val();
	var Area = $("#middlecmbArea").val();
	var Address = $("#middle-address").val();
	var Intro = $("#middle-intro").val();
	var Longitude = 0;
  	var Latitude = 0;
  	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/User/PCIntermediaryCertification",
		async:true,
		data:{
			"CompanyName": Name,
	  		"Province": Province,
	  		"City": City,
	  		"Region": Area,
	  		"CompanyAddress": Address,
	  		"CompanyRegistration": Number,
	  		"CompanyIntroduce": Intro,
	  		"Longitude": 0,
	  		"Latitude": 0,
	  		"QQNumber": QQnumber,
	  		"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
})

/*
 * 获取实名认证信息
 */
function getMyAuthentication(){
	var name = '';
	var selfID = '';
	var token = getCookie("token");
	$.ajax({
		type:"get",
		url:urlf+"api/User/PCGetMyAuthentication",
		data: {
			"Token":token
		},
		error:function(){
			layer.open({
				content: "请先登录！",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){
				name += '<input type="text" class="input-text01" id="self-name" value="'+data.Result.Name+'"/>'
				selfID += '<input type="text" class="input-text01" id="self-number" value="'+data.Result.IDCard+'"/>'
				
				$("#IdentName").html(name);
				$("#selfID").html(selfID);
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
}


var thisPro = '';
var thisCity = '';
var thisRegi = '';

$('#resume-quali').attr("disabled","disabled");
$(".radio").attr("disabled",true);//这里
$('#resume-expe').attr("disabled","disabled");
/*
 * 获取简历信息
 */
var token = getCookie("token");
var name = '';
var address = '';
var qq = '';
var phone = '';
var salary = '';
var intro = '';
var pro = '';
var pos = '';

$.ajax({
type:"get",
url:urlf+"api/User/PCGetResume",
async:true,
data:{
	"Token": token
},
success:function(data){
//	console.log(data.Result);
	re = data.Result;
	
	if(data.Status == 1){				
		//显示性别
		var se = re.Sex;
//				 console.log(se);
		if(se == 1){
			$("input[value = 1]").attr("checked",true);
		}		
		
		//显示工作经验
		ShowSelectedInfor("resume-expe", re.WorkExperience);
		
		//显示学历
		ShowSelectedInfor("resume-quali", re.Qualifications);
		
		//显示期望职位
//			console.log(re.PositionName)
//			ShowSelectPosi("resume-job1", "resume-job2", re.PositionClassName, re.PositionName)
		
		name += '<input type="text" class="input-text01" id="resume-name" value="'+re.Name+'" readonly="readonly"/>';
		address += '<input type="text" class="input-text01" id="resume-address"value="'+re.Address+'"readonly="readonly"/>';
		qq += '<input type="text" class="input-text01" id="res-QQ" value="'+re.QQNumber+'"readonly="readonly"/>';
		phone += '<input type="text" class="input-text01" id="resume-phone"value="'+re.phone+'"readonly="readonly"/>';
		salary += '<input type="text" class="input-text01" id="salary-expire"value="'+re.SalaryExpectation+'" readonly="readonly"/>';
		intro += '<textarea class="input-textarea01" id="resume-selfIntro" readonly="readonly">'+re.Introduction+'</textarea>';
		pro += '<input type="text" class="input-text02" id="resumeProvince" value="'+re.Province+'"readonly="readonly"/>'
		pro +=	'<input type="text" class="input-text02" id="resumeCity" value="'+re.City+'"readonly="readonly"/>'
		pro +=	'<input type="text" class="input-text02" id="resumeArea" value="'+re.Region+'"readonly="readonly"/>'
		pos += '<input type="text" class="input-text02" id="resPosCName" value="'+re.PositionClassName+'"readonly="readonly"/>'						
		pos += '<input type="text" class="input-text02" id="resPosName" value="'+re.PositionName+'"readonly="readonly"/>'
		
		
		$("#resName").html(name);
		$("#resAddress").html(address);
		$("#resQQ").html(qq);
		$("#resPhone").html(phone);
		$("#resSalary").html(salary);
		$("#resIntro").html(intro);
		$("#showPCR").html(pro);
		$("#resPostion").html(pos);
	}
	else{
		layer.open({
			content: data.Result,
			title: '温馨提示',
			area: ['320px', '180px'],
			success: function(layer) {
				layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
			},
		});
	}
}
});

/*
 * 点击修改按钮进入修改简历界面
 */
$("#resume-button").click(function(){
	$(this).css("background-color","#FF6146");
	$(this).hide();
	$("#SaveResume").show();
	
	$('#resume-expe').attr("disabled",false);
	$('input').attr("readonly",false)//去除input元素的readonly属性
	$('textarea').attr("readonly",false);
	$('#resume-quali').attr("disabled",false);
 	$(".radio").attr("disabled",false);//这里
	$('#resumecmbProvince').attr("disabled",false);
	$('#resumecmbCity').attr("disabled",false);
	$('#resumecmbArea').attr("disabled",false);
	$('#resume-job1').attr("disabled",false);
	$('#resume-job2').attr("disabled",false);
	$('#resume-expe').attr("disabled",false);
 	
	$("#showPCR").replaceWith('<li id="showPCR"><select id="resumecmbProvince" name="cmbProvince" class="select-frame02"><select><select id="resumecmbCity" name="cmbCity" class="select-frame02"><select>  <select id="resumecmbArea" name="cmbArea" class="select-frame02"><select></li>');
	addressInit('resumecmbProvince', 'resumecmbCity', 'resumecmbArea');
	ShowPAR('resumecmbProvince', 'resumecmbCity', 'resumecmbArea', re.Province, re.City, re.Region);
		
	$("#resPostion").replaceWith('');
	$("#resPostion0").show();
	$("#resPostion1").show();
	Jobs('销售');
	ShowSelectPosi("resume-job1", "resume-job2", re.PositionClassName, re.PositionName);
})
/*
 * 修改简历信息
 */
$("#SaveResume").click(function(){
	$("#SaveResume").css("background-color","#FF6146");
	$(this).hide();
	$("#resume-button").show();
	
	var Name = $("#resume-name").val();
	var Sex = $('input:radio:checked').val();
	var ResumeQQ = $("#res-QQ").val();
	var Province = $("#resumecmbProvince").val();
	var City = $("#resumecmbCity").val();
	var Region = $("#resumecmbArea").val();
	var Address = $("#resume-address").val();
	var WorkExperience = $("#resume-expe").find("option:selected").text();
	var Phone = $("#resume-phone").val();
	var Qualifications = $("#resume-quali").find("option:selected").text();
	var PositionID = $("#resume-job2").find("option:selected").val();
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
//			console.log(data.Result);
			if(data.Status == 1){
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
				$('input').attr("readonly",true);
				$('#resumecmbProvince').attr("disabled","disabled");
				$('#resumecmbCity').attr("disabled","disabled");
				$('#resumecmbArea').attr("disabled","disabled");
				$('textarea').attr("readonly",true);
				$('#resume-quali').attr("disabled","disabled");
				$(".radio").attr("disabled",true);//这里
				$('#resume-job1').attr("disabled","disabled");
				$('#resume-job2').attr("disabled","disabled");
				$('#resume-expe').attr("disabled","disabled");
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
})



/*
 * 获取企业认证信息
 */
function getCompanyInfor(){
	var name = '';
	var size = '';
	var nature = '';
	var trade = '';
	var qq = '';
	var address = '';
	var intro = '';
	var token = getCookie("token");
	
	$.ajax({
		type:"get",
		url:urlf+"api/User/PCGetEnterprise",
		async:true,
		data:{
			"Token": token
		},
		success:function(data){
//			console.log(data.Result);
			var re = data.Result;
			if(data.Status == 1){
				//显示省市区
				ShowPAR('companycmbProvince', 'companycmbCity', 'companycmbArea', re.Province, re.City, re.Region);	
				
				name += '<input type="text" class="input-text01" id="company-name" value="'+re.CompanyName+'"/>'
				size += '<input type="text" class="input-text01" id="company-size" value="'+re.CompanyScale+'"/>'
				nature += '<input type="text" class="input-text01" id="company-nature" value="'+re.CompanyNature+'"/>'
				trade += '<input type="text" class="input-text01" id="company-trade" value="'+re.CompanyIndustry+'"/>'
				qq += '<input type="text" class="input-text01" id="companyQQ" value="'+re.QQNumber+'"/>'
				address += '<input type="text" class="input-text01" id="company-address" value="'+re.CompanyAddress+'"/>'
				intro += '<textarea class="input-textarea01" id="company-intro">'+re.CompanyIntroduce+'</textarea>'
				
				
				$("#enterprise-name").html(name);
				$("#enterprise-size").html(size);
				$("#enterprise-nature").html(nature);
				$("#enterprise-trade").html(trade);
				$("#enterprise-QQ").html(qq);
				$("#enterprise-address").html(address);
				$("#enterprise-intro").html(intro);
				
			}
			else{
				alert(data.Result);
			}
		}
	});
}


/*
 * 获取中介认证信息
 */
function getMiddleInfor(){
	var name = '';
	var num = ''; 
	var qq = '';
	var addr = '';
	var intro = '';
	var token = getCookie("token");
	
	$.ajax({
		type:"get",
		url:urlf+"api/User/PCGetIntermediary",
		async:true,
		data:{
			"Token": token
		},
		success:function(data){
			var re = data.Result;
//			console.log(data.Result);
			
			if(data.Status == 1){
				//显示省市区
				ShowPAR('middlecmbProvince', 'middlecmbCity', 'middlecmbArea', re.Province, re.City, re.Region);	
			
				name += '<input type="text" class="input-text01" id="middle-name" value="'+re.CompanyName+'"/>';
				num += '<input type="text" class="input-text01" id="middle-number" value="'+re.CompanyRegistration+'"/>';
				qq += '<input type="text" class="input-text01" id="middleQQ" value="'+re.QQNumber+'"/>';
				addr += '<input type="text" class="input-text01" id="middle-address" value="'+re.CompanyAddress+'"/>';
				intro += '<textarea class="input-textarea01" id="middle-intro">'+re.CompanyIntroduce+'</textarea>'
				
				$("#mi-name").html(name);
				$("#mi-number").html(num);
				$("#mi-QQ").html(qq);
				$("#mi-address").html(addr);
				$("#mi-intro").html(intro);
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
}






$('.information-right1').hide();
$(".information-right2").hide();
/*
 * 菜单栏的点击事件
 */
$(document).ready(function(){	
	var inforID = window.document.location.href;
	var inID = inforID.split("#")[1];
	$('#menu-identify-information').click();
	$("#menu-"+inID).click();
})

$('#menu-identify-information').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu1").css("color","#FFFFFF");
	$("#menu-identify-information").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#identify-information').show();
	getMyAuthentication();
})
$('#menu-resume-information').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu2").css("color","#FFFFFF");
	$("#menu-resume-information").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#resume-information').show();
})
$('#menu-company-information').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu3").css("color","#FFFFFF");
	$("#menu-company-information").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#company-information').show();
	addressInit('companycmbProvince', 'companycmbCity', 'companycmbArea');
	getCompanyInfor();
})
$('#menu-middle-information').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu4").css("color","#FFFFFF");
	$("#menu-middle-information").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#middle-information').show();
	addressInit('middlecmbProvince', 'middlecmbCity', 'middlecmbArea');
	getMiddleInfor();
})
$('#menu-recruit-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu5").css("color","#FFFFFF");
	$("#menu-recruit-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#recruit-infor').show();
	getRecruitList();
})
$('#menu-resume-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu6").css("color","#FFFFFF");
	$("#menu-resume-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#resume-information').show();
})
$('#menu-provide-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu7").css("color","#FFFFFF");
	$("#menu-provide-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#provide-infor').show();
	getProvideList();
//	addressInit('providecmbProvince', 'providecmbCity', 'providecmbArea');
})
$('#menu-summer-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu8").css("color","#FFFFFF");
	$("#menu-summer-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#summer-infor').show();
//	addressInit('summercmbProvince', 'summercmbCity', 'summercmbArea');
	getSummerList();
})
$('#menu-winner-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu9").css("color","#FFFFFF");
	$("#menu-winner-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#winner-infor').show();
	getWinnerList();
})
$('#menu-short-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu10").css("color","#FFFFFF");
	$("#menu-short-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#short-infor').show();
	getShortList();
})
$('#menu-abroad-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu11").css("color","#FFFFFF");
	$("#menu-abroad-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#abroad-infor').show();
	getAbroadList();
})
$('#menu-bus-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu12").css("color","#FFFFFF");
	$("#menu-bus-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#bus-infor').show();
	getBusInfor();
})
$('#menu-rent-infor').click(function(){
	$(".h4").css("color","#4A4A4A");
	$(".m1").css("background-color","#FFFFFF")
	$("#Menu13").css("color","#FFFFFF");
	$("#menu-rent-infor").css("background-color","#D9534F");
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#rent-infor').show();
//	addressInit('rentcmbProvince', 'rentcmbCity', 'rentcmbArea');
	getRentList();
})
