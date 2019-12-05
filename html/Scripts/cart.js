/* ideas:
		1. Create an table for items in the cart page accessing the cookies.
			get all the involved elements.
		2. load tbody and checkbox.
		3. add onchange listener for each created checkbox,+button&-button.
		4. select all item function
		5. delete the items in cookie data array then update the array.
*/

// parse the cookie into JSON object
var listObj = getAllData();
var table = document.getElementById("table")
var box = document.getElementById("box")
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");

if(listObj.length == 0) { //if the cart is empty.
	box.className = "box";
	table.className = "hide";
} else {
	box.className = "box hide";
	table.className = "";
	// for loop to create table for each item stored in cookies
	for(var i = 0, len = listObj.length; i < len; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("pid", listObj[i].pid);
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

//calculates the total

var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
	cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for(var i = 0, len = cks.length; i < len; i++) {
		if(cks[i].checked) { //if checkbox is selected
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum = Number(temp) + sum;
		}
	}
	return sum;
}
// go through all the checkbox to add listeners
for(var i = 0, len = cks.length; i < len; i++) {
	cks[i].onchange = function() {
		checkAllChecked();
		totalPrice.innerHTML = getTotalPrice();
	}
}




// select all handler
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

var downs = document.querySelectorAll(".down"); //select all minus buttons
var ups = document.querySelectorAll(".up"); //select all add buttons
var dels = document.querySelectorAll(".del"); //select all delete buttons
// minus and add handler
for(var i = 0, len = downs.length; i < len; i++) {
	downs[i].onclick = function() {
		// nextElementSibling searcher.
		var txtObj = this.nextElementSibling;
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
		// previousElementSibling query searcher
		var txtObj = this.previousElementSibling;
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
		if(listObj.length == 0) { //if cart is empty
			box.className = "box";
			table.className = "hide";
		} else {
			box.className = "box hide";
			table.className = "";
		}
		totalPrice.innerHTML = getTotalPrice();
	}
}

//
function checkAllChecked() {
	var isSelected = true; //
	for(var j = 0, len = cks.length; j < len; j++) {
		if(cks[j].checked == false) {
			isSelected = false;
			break;
		}
	}
	allCheck.checked = isSelected;
}