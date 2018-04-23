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



$(function() {
	//document has loaded
	//alert(document.cookie);
	var username = document.cookie
	$('#name').html(username);

	if(username) {
		//query database and get all 
		var sql = "Select V.Username, U.Email, Count(*) AS NumVisits From VISIT AS V, USER AS U Where V.Username = U.Username Group By V.UserName"

		query(sql,function(result){
			//alert(JSON.stringify(result));
			if(result.length == 0) {
			 		alert("No Properties");
		 	} else {
		 		$.each(result, function(index, row) {
		 			$('#table-body').append(
		 				"<tr class='table-result'>" +
							"<td>" +
								row.Username +
							"</td>" + 
							"<td>" +
								row.Email +
							"</td>" +
							"<td>" +
								row.NumVisits +
							"</td>" +
						"</tr>"
		 				);
		 		});
		 		
			}
		});
	}

});