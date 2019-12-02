

var listObj = getAllData();
var table = document.getElementById("table")
var box = document.getElementById("box")
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");

if(listObj.length == 0) { //购物车为空
	box.className = "box";
	table.className = "hide";
} else {
	box.className = "box hide";
	table.className = "";
	for(var i = 0, len = listObj.length; i < len; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("pid", listObj[i].pid);
			//{"pid":值,"pImg":值,"pName":值,"pDesc":值,"price":值,"pCount":1},
		tr.innerHTML = '<td>' +
			'<input type="checkbox" class="ck"  />' +
			'</td>' +
			'<td>' +
			'<img src="' + listObj[i].pImg + '" alt="" />' +
			'</td>' +
			'<td>' +
			listObj[i].pDesc +
			'</td>' +
			'<td>' +
			'<button class="down">-</button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly" /><button class="up">+</button>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price + '</span>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price * listObj[i].pCount + '</span>' +
			'</td>' +
			'<td>' +
			'<button class="del" >delete</button>' +
			'</td>';
		tbody.appendChild(tr);
	}
}

/*
 	功能：计算总价格
 */
var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
	cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for(var i = 0, len = cks.length; i < len; i++) {
		if(cks[i].checked) { //如果当前被选中
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum = Number(temp) + sum;
		}
	}
	return sum;
}
/*循环遍历为每一个checkbox添加一个onchange事件*/
for(var i = 0, len = cks.length; i < len; i++) {
	cks[i].onchange = function() {
		checkAllChecked();
		totalPrice.innerHTML = getTotalPrice();
	}
}

/*全选实现*/
allCheck.onchange = function() {
	if(this.checked) {
		for(var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = true;
		}
	} else {
		for(var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = false;
		}
	}
	totalPrice.innerHTML = getTotalPrice();
}

var downs = document.querySelectorAll(".down"); //一组减的按钮
var ups = document.querySelectorAll(".up"); //一组加的按钮
var dels = document.querySelectorAll(".del"); //一组删除按钮
for(var i = 0, len = downs.length; i < len; i++) {
	downs[i].onclick = function() {
		var txtObj = this.nextElementSibling;//下一个兄弟节点
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = txtObj.value - 1;
		if(txtObj.value < 1) {
			txtObj.value = 1;
			updateObjById(pid, 0)
		} else {
			updateObjById(pid, -1)
		}
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked();
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();

	}

	ups[i].onclick = function() {
		var txtObj = this.previousElementSibling;//上一个兄弟节点
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = Number(txtObj.value) + 1;
		updateObjById(pid, 1)
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked()
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();
	}

	dels[i].onclick = function() {
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid")
		if(confirm("Remove the item from cart?")) {
			//remove()  
			tr.remove();
			listObj = deleteObjByPid(pid);
		}
		if(listObj.length == 0) { //购物车为空
			box.className = "box";
			table.className = "hide";
		} else {
			box.className = "box hide";
			table.className = "";
		}
		totalPrice.innerHTML = getTotalPrice();
	}
}

/*检测是否要全选*/
function checkAllChecked() {
	var isSelected = true; //全选是否会选中
	for(var j = 0, len = cks.length; j < len; j++) {
		if(cks[j].checked == false) {
			isSelected = false;
			break;
		}
	}
	allCheck.checked = isSelected;
}