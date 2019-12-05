// demo for presentation
function testServer(){
	console.log(cookieObj.get('datas'));
	var cookieJSON = JSON.parse(cookieObj.get('datas'));
	// cookies data convert into an array after JSON.parse
	console.log(cookieJSON[1]);
	console.log(cookieJSON[0].pImg);
	console.log(cookieJSON[0].pCount);
	//cookieJSON.splice(0,1);
	//cookieObj.del('datas')
   
	
	// testing the cookieObj function from cookie.js
	
	console.log(cookieJSON[0]);
	   
	//console.log(encodeURIComponent(cookieObj.get('datas')));
	
	
}





/*
	 check if there is pid in the cookie
	 jsonObj = JSON.parse(cookieObj.get("datas"));
	 pid from each item is jsonObj[index].pid
 	 param: id the pid value.
 */
function checkObjByPid(id) {
	var jsonStr = cookieObj.get("datas");
	var jsonObj = JSON.parse(jsonStr);
	var isExist = false;
	for(var i = 0; i < jsonObj.length; i++) {
		if(jsonObj[i].pid == id) {
			isExist = true;
			break;
		}
	}
	return isExist; //return false;
}

/*
 	update data array
 	param. arr array object
 	return updated array data
 * */
function updateData(arr) {
	var jsonStr = JSON.stringify(arr);
	cookieObj.set({
		name: "datas",
		value: jsonStr
	});
	jsonStr = cookieObj.get("datas");
	return JSON.parse(jsonStr);
}

/*
 	Total quantity 
 	return total quantity
 */
function getTotalCount() {
	// go through all pCount in data array. then return total quantity.
	var totalCount = 0; //default value 0
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0; i < listObj.length; i++) {
		totalCount = listObj[i].pCount + totalCount;
	}
	return totalCount;
}

/*
	 update data via pid
	 return dadated array.
 */
function updateObjById(id, num) {
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0; i < listObj.length; i++) {
		if(listObj[i].pid == id) {
			listObj[i].pCount = listObj[i].pCount + num;
			break;
		}
	}
	return updateData(listObj);
}

/*
	 get the cookie data
	 return parsed cookie.
 * */
function getAllData() {
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	return listObj;
}

/* delete item by its pid.
	return updated item array
*/
function deleteObjByPid(id) {
	var lisObj = getAllData();
	for(var i = 0; i < lisObj.length; i++) {
		if(lisObj[i].pid == id) {
			lisObj.splice(i, 1);
			break;
		}
	}
	updateData(lisObj);
	return lisObj;
}