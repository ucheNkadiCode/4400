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
		var sql = "Select P.OwnedBy, U.Email, Count(*) AS NumProps From PROPERTY AS P, USER AS U Where P.OwnedBy = U.Username Group By P.OwnedBy"

		query(sql,function(result){
			//alert(JSON.stringify(result));
			if(result.length == 0) {
			 		alert("No Properties");
		 	} else {
		 		$.each(result, function(index, row) {
		 			$('#table-body').append(
		 				"<tr class='table-result'>" +
							"<td>" +
								row.OwnedBy +
							"</td>" + 
							"<td>" +
								row.Email +
							"</td>" +
							"<td>" +
								row.NumProps +
							"</td>" +
						"</tr>"
		 				);
		 		});
		 		
			}
		});
	}

});