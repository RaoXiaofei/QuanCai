var keyW = '';
var account = '';
$("#Logout").hide()
$("#qingkong").click(function() {
	$("#phone").val('');
});
$(".phone").click(function() {
	$(".phone-number").css("color", "#FF6146");
})
$("#code-frame").click(function() {
	$(".phone-number").css("color", "#4A4A4A");
})

function login(e) {
	var phone = $("#phone").val();
	var code = $("#code-frame").val();
	$.ajax({
		type: "Post",
		url: urlf + "api/User/Register",
		async: true,
		data: {
			"Phone": phone,
			"Code": code,
			"Lng": 0,
			"Lat": 0,
			"ID": 0
		},
		success: function(data) {
			if(data.Status == 1) {
				alert("登录成功!");

				setCookie("isLogin", true);
				setCookie("token", data.Result);

				$("#login").modal("hide");

				$.ajax({
					type: "get",
					url: urlf + "api/User/Info",
					async: true,
					beforeSend: function(xhr) {
						xhr.setRequestHeader("Authorization", getCookie('token'));
					},
					success: function(data) {
						if(data.Status == 1) {							
//							console.log(data.Result);
							this.account = data.Result.NickName;
							setCookie("phone", this.account);
							window.location.reload();
						} else {
							console.log(data.Status);
						}
					}.bind(this)
				});
			} else {
				alert("登录失败,请重新登录");
			}
		}
	});
}
//var islogin =  false;
var islogin = getCookie("isLogin");
if(islogin == "false"  || islogin == null){	
	$("#Login").show();
	$(".pp").hide();
	$("#Logout").hide();
}
else{
	var pp = getCookie("phone");
	$("#Login").hide();
	$(".pp").replaceWith("<span class='top-text04 login loginframe'>" + pp + "</span>");
	$(".pp").show();
	$("#Logout").show();
}

$("#Logout").click(function() {
	delCookie("token");
	delCookie("change");
	delCookie("phone");
	setCookie("isLogin", false);
	alert("退出成功");
	$("#Login").show();
	$("#pp").hide();
	$("#Logout").hide();
	window.location.reload();
})
var countdown = 60;
$("#get-code").click(function(obj) {
	var phone = $("#phone").val();
	if(phone == "") {
		alert("手机号码不能为空");
	} else if(!(/^1[34578]\d{9}$/.test(phone))) {
		alert("手机号码不正确");
	} else {
		cod();

		function cod(obj) {
			if(countdown == 0) {
				$("#get-code").text("获取验证码");
				$("#get-code").attr("onclick", "code(this)");
				countdown = 60;
				return;
			} else {
				$("#get-code").attr("onclick", "null");
				$(".get-codetext").text("重新发送(" + countdown + ")");
				countdown--;
			}
			setTimeout(function() {
					cod(obj)
				},
				1000);
		}
		$.ajax({
			type: "get",
			url: urlf + "/api/VerifyCode/Send",
			data: {
				phone: phone
			},
			success: function(data) {
				if(data.Status == 1) {
					alert("验证码发送成功");
				} else {
					alert(data.Result);
				}
			},
			error: function() {
				alert('服务器异常');
			},

		});
	}
})
