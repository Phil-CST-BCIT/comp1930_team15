/*
 	ideas：
 		1.：get all the involved nodes.
 		2.：calculates how many items 
 		3.：add listener to each add to cart button
 			set the local cookie
			 get the pid of item
			 go through the cookie array and compare if the added item exsit
			 if so, add quantity.
			 else, creat new item object in the cart page with quantity one
 */

var ccount = document.getElementById("ccount"); //get the total quantity 
var btns = document.querySelectorAll(".list dl dd button"); //all buttons

//assign the datas json to listStr.
var listStr = cookieObj.get("datas");
//see if the cart is empty
//cart is empty     datas  json
if(!listStr) { 
	cookieObj.set({
		name: "datas",
		value: "[]"
	});
	listStr = cookieObj.get("datas");
}

var listObj = JSON.parse(listStr);
// convert the json into array
// go through the quantity in array.
//default is zero
var totalCount = 0; 
for(var i = 0; i < listObj.length; i++) {
	totalCount = listObj[i].pCount + totalCount;
}
ccount.innerHTML = totalCount;

// add event listener for each button
for(var i = 0; i < btns.length; i++) {
	btns[i].onclick = function() {
		var dl = this.parentNode.parentNode;
		var pid = dl.getAttribute("pid");//get pid
		var arrs = dl.children;//get all children nodes in dl
		/*if pid doesn't exist in cookie, which is our cart

		*/
		if(checkObjByPid(pid)) {
			listObj = updateObjById(pid, 1)
		} else {
			var imgSrc = arrs[0].firstElementChild.src;
			var pName = arrs[1].innerHTML;
			var pDesc = arrs[2].innerHTML;
			var price = arrs[3].firstElementChild.innerHTML;
			var obj = {
				pid: pid,
				pImg: imgSrc,
				pName: pName,
				pDesc: pDesc,
				price: price,
				pCount: 1
			};
			listObj.push(obj)
			listObj = updateData(listObj);
		}
		ccount.innerHTML = getTotalCount();
	}
}

// go back to the previous page
function goback(){
	history.go(-1);
   }
//    function go(){
//    history.go(1);
//    }