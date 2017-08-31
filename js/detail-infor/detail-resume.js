var listID = window.document.location.href;
//console.log(listID)
//console.log(listID.split("id=")[1])
var id = listID.split("id=")[1];

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

var resume1 = '';
var resume2 = '';
var Token = getCookie("token");
$.ajax({
	type:"get",
	url:urlf+"api/Company/ResumeDetail?id="+id,
	async:true,
	data:{
		"Token":Token
	},
	error:function(data){
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
//		console.log(data.Result);
		var re = data.Result;
		resume1 += '<span class="work-line" style="float: right;"></span>'
		resume1 += '<br />'
		resume1 += '<span class="work-line">'
		resume1 += 	'	<span class="work-text02">'+re.Name+'</span><span class="work-text03">'+re.SalaryExpectation+'元/月</span>'
		resume1 += '</span>'
		resume1 += '<br />'
		resume1 += '<span class="work-line">'
		resume1 += 		'<span class="work-text04">'+re.Qualifications+'&nbsp;&nbsp;&nbsp;'+re.WorkExperience+'&nbsp;&nbsp;&nbsp;'+re.PositionName+'</span>'
		resume1 += '</span>'
		resume1 += '<br />'
		resume1 += '<span class="work-line">'
		resume1 += 		'<img src="assets/坐标.png" />'
		resume1 += 		'<span class="work-text05">'+re.Address+'</span>'
		resume1 += '</span>'
		resume1 += '<br />'
		resume1 += '<span class="work-line">'
		resume1 += '<div class="btn-group" role="group">'
		resume1 +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
		resume1 +=	  '<ul class="dropdown-menu">'
		resume1 +=		 '<li>'+re.Phone+'</li>'
		resume1 +=	  '</ul>'
		resume1 +=	'</div>'
		resume1 += 		'&nbsp;&nbsp;&nbsp;&nbsp;'
		resume1 += 		'<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
		resume1 +='</span>'
		
		resume2 += '<p class="work-section01">'+re.Introduction+'</p>'
		
		$("#myres").html(resume1);
		$("#selfIn").html(resume2);
	}
});