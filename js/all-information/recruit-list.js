var recruitID = ''
var Token = getCookie("token");
/*
 * 获取招聘信息列表
 */
function getRecruitList(){
	var token = getCookie("token");
	var Pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=6",
		async:true,
		data: {
			"Token":token			
		},
		success:function(data){
//			console.log(data.Result);
			var re = data.Result;
			if(data.Status == 1){
				for(var i = 0; i < re.length; i++){
					Pro += '<p class="index-guesstext index-infor01" id='+re[i].ID+' onclick = "ShowRecruitInfor(this)">'
					Pro +=		'<span class="allInforText01">'+re[i].Name+'</span>'
					Pro +=		'<span class="allInforText02">'+re[i].Company+'</span>'
					Pro +=		'<span class="allInforText03">'+re[i].Address+'</span>'
					Pro +=		'<span class="allInforText04">'+re[i].Salary+'</span>'
					Pro +=	'</p>'
				}
				$("#pro").html(Pro);
				
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}

/*
 * 显示  修改  删除招聘信息详细信息
 */
var taggID = '';

function ShowRecruitInfor(infor){	
	recruitID = infor.id;
	
	$("#modify-recruit-button").show();
	$("#SaveRecruit").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#recruit-information').show();

	var sal = '';
	var addr = '';
	var desc = '';
	var requ = '';
	var welf = '';
	var pos1 = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetPositionDetail?id="+recruitID+"&token="+Token,
		async:true,
		success:function(data){
			console.log(data.Result);
			if(data.Status == 1){
				var re = data.Result;
				pos1 += '<input type="text" class="input-text02" id="recPosCName" value="'+re.PositionClassName+'" readonly="readonly"/>'						
				pos1 +=	'<input type="text" class="input-text02" id="recPosName" value="'+re.PositionName+'"readonly="readonly"/>'
		
				sal += '<input type="text" class="input-text01" id="recruit-salary" value ="'+re.Salary+'" readonly="readonly"/>'
				addr += '<input type="text" class="input-text01" id="recruit-address" value = "'+re.Address+'"readonly="readonly"/>'
				desc += '<textarea class="input-textarea01" id="recruit-describe" readonly="readonly">'+re.JobDescription+'</textarea>'
				requ += '<textarea class="input-textarea01" id="recruit-require" readonly="readonly">'+re.Requirement+'</textarea>'
				for(var i in re.Welfare){
					welf += '<span class="recWelfare-text"　id = "'+re.Welfare[i].ID+'">'+re.Welfare[i].Name+'</span>'
				}
				pro += '<input type="text" class="input-text02" id="recruitProvince" value="'+ re.Province+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="recruitCity" value="'+re.City+'" readonly="readonly"/>'
				pro += '<input type="text" class="input-text02" id="recruitArea" value="'+re.Region+'" readonly="readonly"/>'
				$("#pro-sal").html(sal);
				$("#pro-add").html(addr);
				$("#pro-dec").html(desc);
				$("#pro-req").html(requ);
				$("#recuit-wel").html(welf);
				$("#recPostion").html(pos1);
				$("#showPCR1").html(pro);
			}
			else{
				alert(data.Result);
			}
			
			/*
			 * 修改招聘信息（全部工作）
			 */
			$("#modify-recruit-button").click(function(){
				$(this).hide();
				$("#SaveRecruit").show();
				$('input').attr("readonly",false)//去除input元素的readonly属性
				$('textarea').attr("readonly",false);
				$('#recruit01').attr("disabled",false);
				$('#recruit02').attr("disabled",false);
				$("#showPCR1").replaceWith('<li id="showPCR1"><select id="recruitcmbProvince" name="cmbProvince" class="select-frame02"><select>   <select id="recruitcmbCity" name="cmbCity" class="select-frame02"><select>  <select id="recruitcmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('recruitcmbProvince', 'recruitcmbCity', 'recruitcmbArea');
				ShowPAR('recruitcmbProvince', 'recruitcmbCity', 'recruitcmbArea', re.Province, re.City, re.Region);	
				$("#recPostion").hide();
				$("#recPosition0").show();
				$("#recPosition1").show();
				ShowSelectPosi("recruit01", "recruit02", re.PositionClassName, re.PositionName);
				/*
				 * 获取公司福利标签
				 */			
				 var tagg = ''
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
							})
						})
					}
				});
			})			
		}
	});
}
/*
 * 修改招聘信息
 */
$("#SaveRecruit").click(function(){
	var id = recruitID;
	var PositionID = $("#recruit02").val();
	var Salary = parseInt($("#recruit-salary").val());
	var Province = $("#recruitcmbProvince").val();
	var City = $("#recruitcmbCity").val();
	var Region = $("#recruitcmbArea").val();
	var Address = $("#recruit-address").val();
	var JobDescription = $("#recruit-describe").val();
	var Requirement = $("#recruit-require").val();
	var WelfareTag = taggID.substring(0,taggID.length-1);
	var token = getCookie("token");	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCUpdatePosition",
		async:true,
		data:{
			"ID": id,
			"PositionID": PositionID,
		    "Salary": Salary,
		    "Province": Province,
		    "City": City,
		    "Region": Region,
		    "Address": Address,
		    "JobDescription": JobDescription,
		    "Requirement": Requirement,
		    "WelfareTag": WelfareTag,
		    "Token": token
		},
		success:function(data) {	
			if(data.Status == 1) {			
				alert("修改成功!");
				
				$("#SaveRecruit").hide();
				$('input').attr("readonly",true)//去除input元素的readonly属性
				$('textarea').attr("readonly",true);
				$('#recruitcmbProvince').attr("disabled","disabled");
				$('#recruitcmbCity').attr("disabled","disabled");
				$('#recruitcmbArea').attr("disabled","disabled");
				$('#recruit01').attr("disabled",true);
				$('#recruit02').attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
	});
})

/*
 * 删除招聘信息
 */
$("#delete-recruit-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelPosition?id="+recruitID+"&token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除该招聘信息成功");
					$('#menu-recruit-infor').click();
				}
				else{
					alert("删除招聘信息失败")
				}
			}
		});
	}
})