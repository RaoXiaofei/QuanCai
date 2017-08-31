var urlf = "http://quancai.nbxuanma.com/";
var image_value = "";
var a = [];
var b = [];
var bimg = [];
var aimg  =[];
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}

function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/*
 * 显示省市区
 */
function ShowPAR(provinceID, CityID, RegionID, province, city, regio){
	//显示省市区
	var prov = document.getElementById(provinceID); 
	for(var i = 0; i<prov.options.length; i++){  
		if(prov.options[i].innerHTML == province){			
    		prov.options[i].selected = true;  
    		addressInit(provinceID, CityID, RegionID);
    		break;
		}  
	}			
	
	var ci = document.getElementById(CityID);
//	console.log(ci)
	for(var i = 0; i < ci.options.length; i++){  
		if(ci.options[i].innerHTML == city){ 
			addressInit(provinceID, CityID, RegionID);
    		ci.options[i].selected = true;     		
    		break;
		}  
	}	
	
	var regi = document.getElementById(RegionID);
//	console.log(regi)
	for(var i = 0; i < regi.options.length; i++){
		if(regi.options[i].innerHTML == regio){
			regi.options[i].selected = true;
			break;
		}
	}		
}

/*
 * 显示职位
 */
function ShowSelectPosi(selectID1, selectID2, dataPosiClassName, dataPosiName){
	var posiCName = document.getElementById(selectID1);
//	console.log(dataPosiClassName)
	var posi = '';
	
	for(var i in posiCName.options){
		if(posiCName.options[i].innerHTML == dataPosiClassName){
			posiCName.options[i].selected = true;
			Jobs(posiCName.options[i].innerHTML);
			break;
		}	
	}
	posi = document.getElementById(selectID2);
	for(var j in posi.options){
		if(posi.options[j].innerHTML == dataPosiName){
//			console.log(posi.options[j].innerHTML)
//			console.log(dataPosiName)
			posi.options[j].selected = true;
			break;
		}
	}
}

/*
 * 显示信息
 */
function ShowSelectedInfor(selectID, dataInfor){
	var expe = document.getElementById(selectID);
	for(var i in expe.options){
		if(expe.options[i].innerHTML == dataInfor){
			expe.options[i].selected = true;
			break;
		}
	}
}

/*
 * 删除信息弹框
 */
function Del(){
	var msg = "您真的确定要删除吗？\n\n请确认！"; 
	if (confirm(msg)==true){ 
		return true; 
	}
	else{
		return false; 
	} 
}

/*
 * 价目表上传图片
 */ 
function UploadPriceImg(liID, inputID, imgID){
	$("#"+liID).delegate("#"+inputID,"change",function(){
	var formdata=new FormData( ); 
	formdata.append("file" , $("#"+inputID)[0].files[0]);
	//获取文件法二
	$.ajax({
	    type : 'post',
	    url : urlf+'api/Photo/UpdateForImage?type=0',
	    data : formdata,
	    cache : false,
	    processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
	    contentType : false, // 不设置Content-type请求头
	        success : function(data){
//	        	console.log(data.Result);
		        image_value = data.Result;
	        }      
	})   
	//图片预览效果
	var $file = $(this);
	var fileObj = $file[0];
	var windowURL = window.URL || window.webkitURL;
	
	// var dataURL;
	var $img = $("#"+imgID);
	 
	if(fileObj && fileObj.files && fileObj.files[0]){
	    dataURL = windowURL.createObjectURL(fileObj.files[0]);
	    $img.attr('src',dataURL);
	    $img.css("width","70px");
	    $img.css("height","70px")
	}
	else{
	    dataURL = $file.val();
	    var imgObj = document.getElementById(imgID);
	    imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
	    // imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
	}
});
}

/*
 * 上传租房详情图片（不多于6张）
 */
function UploadListImg(liID, inputID, imgID){
	$("#"+liID).delegate("#"+inputID,"change",function(){
		var formdata = new FormData( ); 	
		for(var i = 0; i < 5; i++){
			formdata.append("file" , $("#"+inputID)[0].files[i]);
		}	
		var img = '';
		//上传图片
		$.ajax({
		    type : 'post',
		    url : urlf+'api/Photo/UpdateForImage?type=2',
		    data : formdata,
		    cache : false,
		    processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
		    contentType : false, // 不设置Content-type请求头
	        success : function(data){
//	        	console.log(data.Result);

				if(data.Status == 1){
		        	console.log(data.Result);
		        	for(var i = 0; i < data.Result.length; i++){
		        		if(data.Result.length < 6){
		        			aimg[i] = data.Result[i];
				        	a[i] = urlf + data.Result[i];
				        	im += '<input type="file" id='+inputID+' multiple="multiple">'
				        	im += '<img src="'+a[i]+'" alt="" id='+imgID+'  style="width: 70px;height: 70px; margin-right:33px">'
		        		}
			        	else{
			        		alert("图片最多上传5张");
			        	}
			        }
			       
			        $("#"+liID).html(im);
		        }
		        else{
		        	alert(data.Status);
		        }
	        }      
		})   	
	});
}
var im = ''
/*
 * 上传工作介绍图片
 */
function UploadWorkImg(liID, inputID, imgID){
	$("#"+liID).delegate("#"+inputID,"change",function(){
		var formdata = new FormData(); 	
		for(var i = 0; i < 5; i++){
			formdata.append("file" , $("#"+inputID)[0].files[i]);
		}
		//上传图片
		$.ajax({
		    type : 'post',
		    url : urlf+'api/Photo/UpdateForImage?type=1',
		    data : formdata,
		    cache : false,
		    processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
		    contentType : false, // 不设置Content-type请求头
	        success : function(data){        	
		        if(data.Status == 1){
		        	console.log(data.Result);
		        	for(var i = 0; i < data.Result.length; i++){
			        	bimg[i] = data.Result[i];
			        	b[i] = urlf + data.Result[i];
			        	im += '<input type="file" id='+inputID+' multiple="multiple">'
			        	im += '<img src="'+b[i]+'" alt="" id='+imgID+'  style="width: 70px;height: 70px; margin-right:33px">'
			        }
			       
			        $("#"+liID).html(im);
		        }
		        else{
		        	alert(data.Status);
		        }
	        }      
		})   
		
	});
}
