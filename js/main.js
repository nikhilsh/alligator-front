var nlform = new NLForm(document.getElementById('nl-form'));

var links = [
	// {
	// 	"url": "http://google.com",
	// 	"title": "text",
	// 	"summary": "fuck you",
	// 	"time": 2
	// }
];
function capitalize(s){
	return s[0].toUpperCase() + s.slice(1);
}
function stripTrailingSlash(str) {
    if(str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}
$(".nl-submit").click(function(e) {
	e.preventDefault();
		if ($('#textValue').prop('value') === "") {
			return;
		};
	$('#loading').show();
	$.get("http://alligator.eu-gb.mybluemix.net/query/" + $('#textValue').prop('value'), function(response) {
	// links = jQuery.parseJSON(response)
	 $.each(response['results'], function(i,row){
	 	var array = {
	 		"summary" : row["abstract"],
	 		"title" : row["title"],
	 		"time" : row["time_taken"],
	 		"url" : row["url"]
	 	};
	 	links.push(array);
	 });
		console.log(response)
		// $('#result-table').empty();

	// $('#result-table').load("index.html #result-table");

		$(".table-materialize").toggleClass('is-visible');
		// $(".nl-form").
		$(".nl-form").html('Learning about ' + $('#textValue').prop('value') + ' for ' + $('#timeValue').prop('value') + ' minutes');
		$('.nl-form').animate({text: '0px'}, 1000);
		var templateRow = _.template("<tr> \
				<td><a href= <%= stripTrailingSlash(url) %>><b><%= title %></b></a><br /> \
				<%= summary %> \
				</td> \
				<td><%= time %> minutes</td> \
				</tr> ");
		var htmlRows = ""
		_.each(links, function (link) {
			htmlRows += templateRow(link);
		})
		$('#search-result').append(htmlRows)
		$('#loading').hide();
	}, 'json');
});