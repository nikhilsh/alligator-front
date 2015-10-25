var nlform = new NLForm(document.getElementById('nl-form'));
var links = [
	{
		"url": "http://google.com",
		"type": "text",
		"summary": "fuck you",
		"time": 2
	}
];
function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}
$(".nl-submit").click(function(e) {
	e.preventDefault();
	$(".table-materialize").toggleClass('is-visible');
	$(".nl-form").html('Learning about ' + $('#textValue').prop('value') + ' for ' + $('#timeValue').prop('value') + ' minutes');
	$('.nl-form').animate({text: '0px'}, 1000);
	var templateRow = _.template("<tr> \
				<td><b><a href=<%= url %>> <%= url.split('//')[1] %></a></b><br /> \
				<%= summary %> \
				</td> \
				<td><%= capitalize(type) %></td> \
				<td><%= time %> minutes</td> \
				</tr> ");
	var htmlRows = ""
	_.each(links, function (link) {
		htmlRows += templateRow(link);
	})
	$('#search-result').append(htmlRows)
});