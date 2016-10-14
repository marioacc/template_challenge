$(document).ready(function () {
	// Extract the text from the template .html() is the jquery helper method for that
	var raw_template = $('#template').html();
	// Compile that into an handlebars template
	var template = Handlebars.compile(raw_template);
	// Retrieve the placeHolder where the Posts will be displayed 
	var placeHolder = $("#blog");
	// Fetch all Blog Posts data from server in JSON

	$.ajax({
		type: "GET",
		url: "http://localhost:80/data", 
		success: function (data, status, xhr) {
            var html = template(JSON.parse(data));
				// Render the posts into the page
				placeHolder.append(html);
			$.each(data, function (index, element) {
				// Generate the HTML for each post
				
			});
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	})
});