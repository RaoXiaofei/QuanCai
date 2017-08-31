var ListID = window.document.location.href;
//console.log(ListID);
//console.log(ListID.split("id=")[1])
listID = ListID.split("id=")[1]

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

var pro = '';
var ProvIn01= '';
var ProvIn02='';
$.ajax({
	type:"get",
	url:urlf+"api/Company/ProvideDetail?id="+listID,
	async:true,
	success:function(data){
//		console.log(data.Result);
		var re = data.Result;
		
		pro += '<span class="work-line" style="float: right;cursor: pointer;"onclick="Report()">'
		pro += 		'<img src="assets/举报.png" />'
		pro += 		'<span class="work-text01">&nbsp;举报</span>'
		pro += '</span>'
		pro += '<br />'
		pro += '<span class="work-line">'
		pro += 		'<span class="work-text02">'+re.WorkType+'</span><span class="work-text03">'+re.Count+'人</span>'
		pro += '</span>'
		pro += '<br />'
		pro += '<span class="work-line">'
		pro += 		'<span class="work-text04">'+re.Salary+'元 /月&nbsp;&nbsp;&nbsp;100人</span>'
		pro += '</span>'
		pro += '<br />'
		pro += '<span class="work-line">'
		pro += 		'<img src="assets/坐标.png" />'
		pro += 		'<span class="work-text05">&nbsp;&nbsp;'+re.Address+'</span>'
		pro += '</span>'
		pro += '<br />'
		pro += '<span class="work-line">'
		pro += '<div class="btn-group" role="group" style = "margin-right:30px">'
		pro +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
		pro +=	  '<ul class="dropdown-menu">'
		pro +=		 '<li>'+re.Phone+'</li>'
		pro +=	  '</ul>'
		pro +=	'</div>'
		pro += 		'<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
		pro += '</span>'
		
		ProvIn01 += '<img src="assets/我.png" />'
		ProvIn01 += 	'<span class="work-text05">&nbsp;'+re.Name+'</span>&nbsp;&nbsp;'
		ProvIn01 += 	'<img src="assets/电话.png" />'
		ProvIn01 +=  '<span class="work-text05">&nbsp; '+re.Phone+'</span>'
		
		ProvIn02 += '<p class="work-section01">'+re.CompanyIntroduce+'</p>'
		
		$("#ProvInfor").html(pro);
		$("#bProv01").html(ProvIn01);
		$("#bProv02").html(ProvIn02);
	}
});

function Report(){
	$.ajax({
		type:"get",
		url:urlf+"api/Report/UserReport?id="+listID+"&type=4",
//		async:true,
		beforeSend: function(xhr) {
	        xhr.setRequestHeader("Authorization",getCookie('token'));
	    },
		success:function(data){
			if(data.Status == 1){
				alert(data.Result);
			}
			else{
				alert(data.Status);
			}
		}
	});
}
