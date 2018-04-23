function query(sql, callback) {
	$.ajax({
		url:"http://localhost:3000/query",
		data: {statement: sql},
		dataType: "jsonp",
		//headers: {'Access-Control-Allow-Origin': *},
		//crossDomain: true,
		
	}).done(function(result){
		callback(result);
	});
}

function insert(sql) {
	$.ajax({
		url:"http://localhost:3000/query",
		data: {statement: sql},
		dataType: "jsonp"
	});
}

var sqlGetCrops = "Select Itemname, Itemtype from PROPERTYITEM where IsApproved = 1";
query(sqlGetCrops, function(response) {
	$.each(response, function(index, element) {
		if (element.Itemtype === "ANIMAL") {
			$('#animal').append("<option>" + element.Itemname + "</option>");
		} else {
			$('#crop').append("<option>" + element.Itemname + "</option>");
		}
	});
});


$(function() {
	//document has loaded
	//alert(document.cookie);
	$('#submit').click(function() {
		var email = $('#email').val();
		var name = $('#name').val();
		var password = $('#password').val();
		var passwordcheck = $('#passwordcheck').val();
		var propname = $('#propname').val();
		var addr = $('#addr').val();
		var city = $('#city').val();
		var zip = $('#zip').val();
		var acres = $('#acres').val();
		var proptype = $('#proptype').val();
		var animal = $('#animal').val();
		var crop = $('#crop').val();
		var public = $('#public').val();
		var commercial = $('#commercial').val();
		if(email.length && name && password && passwordcheck && propname
			&& addr && city && zip && acres && proptype && animal && crop && public && commercial) {
			if(password == passwordcheck) {
				//query database and get all 
				var makeuser = "Insert Into USER (Username, Email, Password, Usertype) " +
				"Values (\'" + name + "\',\'" + email + "\', \'" + password + "\', \'Owner\')";
				var makeprop = "Insert Into PROPERTY (PropName, PropType, IsCommercial, SizeAcres, IsPublic, StAddress, City, Zip, OwnedBy, ApprovedBy) "
				+ "Values (\'" + propname + "\',\'" + proptype + "\',0b" + commercial + ",\'" + acres + "\',0b" + public + ",\'" + addr + "\',\'" + city + "\',\'" + zip + "\',\'" + name + "\',NULL)";

				insert(makeuser);
				insert(makeprop)

				document.cookie = name;
				document.location = "/owner/ownerhome.html";
			} else {
				alert("Passwords must match");
			}
		} else {
			alert("All fields must be filled out");
		}
	});

});