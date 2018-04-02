function setCookie(name,value,timer){
	        var date =new Date;
	        date.setDate(date.getDate()+timer);
	        document.cookie = name+"="+value+";expires="+date;
	   }
		
	    //获取cookie
	    function getCookie(name){
			var str=document.cookie;
			var arr=str.split('; ');
			var newArr=[];
			for(var i=0;i<arr.length;i++){
				newArr.push(arr[i].split('='));
			}
			for(var i=0;i<newArr.length;i++){
				if(name==newArr[i][0]){
					return newArr[i][1];
				}
			}
		}
	    
	  //  删除cookie
	    function removeCookie(name){
	        setCookie(name,1,-1);
	    }