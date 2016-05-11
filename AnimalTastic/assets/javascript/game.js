var animals = ["Tyrion Lannister", "Daenerys Targaryen ", "Jon Snow", "Jaime Lannister", "Arya Stark", "Brienne of Tarth", "Cersei Lannister", "Eddard Stark", "Robb Stark", "Davos Seaworth", "Tywin Lannister"];

function displayInfo (){
	$('#animalsView').empty();
	var animal = $(this).attr("data-name");
	var api = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";

	$.ajax({
		url: api,
		method: 'GET'
	}).done(function(response) {
		var results = response.data;

		for (var i = 0; i < 10; i++){
			if (results[i].rating == "r" || results[i].rating == "pg-13"){

			}
			else {
		var gifDiv = $('<div class="item">');
		var rating = results[i].rating;
		var p = $('<p>').text("Rating: " + rating);

		var animalImage = $('<img class="pause">');
		animalImage.attr({
			src: results[i].images.fixed_height_still.url,
			"data-still": results[i].images.fixed_height_still.url,
			"data-animate": results[i].images.fixed_height.url,
			"data-state": "still",

	});
		gifDiv.append(p);
		gifDiv.append(animalImage);
		gifDiv.addClass("gifs");
		$('#animalsView').prepend(gifDiv);

			}
		}

$('.pause').on("click", function(){
	 var state = $(this).attr('data-state'); 
            if (state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            console.log($(this).attr("src"))
})

	})
}

function renderButtons(){
	$("#buttonsView").empty();

	for (var i = 0; i < animals.length; i++) {
		var a = $('<button>')
		a.addClass('animal');
		a.attr('data-name', animals[i]);
		a.text(animals[i]);
		$('#buttonsView').append(a)
	}
}

$('#addAnimal').on('click', function(){
	var animal = $("#animal-input").val().trim();
	animals.push(animal);
	renderButtons();
	return false;
})



$(document).on('click', '.animal', displayInfo);

renderButtons();

