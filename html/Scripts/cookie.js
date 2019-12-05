/*
	
	full description：square brackets are optional info.

	document.cookie  = “name=value[;expires=date][;path=path-to-resource][;domain=][;secure]”
*/

var cookieObj = {
	/*
	cookieObj.set(o)		set cookieObj
		para：o object{}
		name:string name of cookie
		value:string value of cookie
		expires: when does the cookie expire --> Date();
		path:string path restrain
		domain:string domain restrains
		secure:boolean  true https  false or undeinfed 
	*/
	set: function(o) {
		var cookieStr = encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);
		
		if(o.expires) {
			cookieStr += ";expires=" + o.expires;
		}
		if(o.path) {
			cookieStr += ";path=" + o.path;
		}
		if(o.domain) {
			cookieStr += ";domain=" + o.domain;
		}
		if(o.secure) {
			cookieStr += ";secure";
		}

		document.cookie = cookieStr;
	},
	/*
		delete coockie
		param: the name value of cookie
	*/
	del: function(n) {
		
		var date = new Date();
		date.setHours(-1);
		//invoke the this method
		this.set({
			name: n,
			expires: date
		});
	},
	/*get cookie*/
	get: function(n) {
		n = encodeURIComponent(n);
		var cooikeTotal = document.cookie;
		var cookies = cooikeTotal.split("; ");
		for(var i = 0; i < cookies.length; i++) {
			var arr = cookies[i].split("=");
			if(n == arr[0]) {
				return decodeURIComponent(arr[1]);
				//return (arr[1]);
			}
		}
	}
}