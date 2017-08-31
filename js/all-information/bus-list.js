var busID = ''
/*
 * 获取全国大巴信息
 */
var Token = getCookie("token");
function getBusInfor(){
	var allB = '';
	
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=30&type=5",
		async:true,
		data:{
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				for(var i in re){
					allB += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowBusInfor(this)">'
					allB +=		'<span class="index-text40">'+re[i].Name+'</span>'
					allB +=		'<span class="index-text41">'+re[i].Address+'</span>'
					allB +=		'<span class="index-text43">'+re[i].Company+'</span>'
					allB +=	'</p>'
				}			
				$("#BUS").html(allB);
			}
			else{
				alert(data.Result);
			}
		}
	});
}

/*
 * 显示  修改  删除  全国大巴详细信息
 */
function ShowBusInfor(inforID){
	busID = inforID.id;
	
	$("#modify-bus-button").show();
	$("#SaveBus").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#bus-information').show();
	
	var na = '';
	var addr = '';
	var intro = '';
	var num = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetBusDetail?id="+busID+"&token="+Token,
		async:true,
	    success:function(data){
	    	if(data.Status == 1){
//	    		console.log(data.Result);
	    		var re = data.Result;
	    		//显示省市区
//	    		ShowPAR("buscmbProvince", "buscmbCity", "buscmbArea", re.Province, re.City, re.Region)
	    		
	    		pro+= '<input type="text" class="input-text02" id="busProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro+= '<input type="text" class="input-text02" id="busCity" value="'+re.City+'" readonly="readonly"/>'
				pro+= '<input type="text" class="input-text02" id="busArea" value="'+re.Region+'" readonly="readonly"/>'
	    		
	    		na += '<input type="text" class="input-text01" id="driver-name" value="'+re.DriverName+'" readonly="readonly"/>'
	    		addr += '<input type="text" class="input-text01" id="car-address" value="'+re.Address+'" readonly="readonly"/>'
	    		intro += '<textarea class="input-textarea01" id="car-intro" readonly="readonly">'+re.Introduce+'</textarea>'
	    		num += '<input type="text" class="input-text01" id="car-number" value="'+re.LicensePlate+'" readonly="readonly"/>'
	    		
	    		$("#driverName").html(na);
	    		$("#busNum").html(num);
	    		$("#busAddr").html(addr);
	    		$("#busIntro").html(intro);
	    		$("#showPCR8").html(pro);
	    	}
	    	/*
			 * 修改全国大巴信息
			 */
			$("#modify-bus-button").click(function(){
				$(this).hide();
				$("#SaveBus").show();
				$('input').attr("readonly",false);
				$('textarea').attr("readonly",false);
				$("#showPCR8").replaceWith('<li id="showPCR8"><select id="buscmbProvince" name="cmbProvince" class="select-frame02"><select>   <select id="buscmbCity" name="cmbCity" class="select-frame02"><select>  <select id="buscmbArea" name="cmbArea" class="select-frame02"><select></li>');
				addressInit('buscmbProvince', 'buscmbCity', 'buscmbArea');
				ShowPAR("buscmbProvince", "buscmbCity", "buscmbArea", re.Province, re.City, re.Region);	
			})
	    }
	});
}
/*
 * 修改全国大巴信息
 */
$("#SaveBus").click(function(){
	var Name = $("#driver-name").val();
	var Plate = $("#car-number").val();
	var Province = $("#buscmbProvince").val();
	var City = $("#buscmbCity").val();
	var Region = $("#buscmbArea").val();
	var Address = $("#car-address").val()
	var Introduce = $("#car-intro").val();
	var id = busID;
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateBus",
		async:true,
		data:{
			"BusID": id,
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
				alert("修改成功");
				$("#SaveBus").hide();
				$('input').attr("readonly",true);
				$('#buscmbProvince').attr("disabled","disabled");
				$('#buscmbCity').attr("disabled","disabled");
				$('#buscmbArea').attr("disabled","disabled");
				$('textarea').attr("readonly",true);
				window.location.reload();
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
/*
 * 删除全国大巴信息
 */
$("#delete-bus-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelBus?id="+busID+"&token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$("#menu-bus-infor").click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})