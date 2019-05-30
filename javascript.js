// Initial array of movies
var topics = ['audi-r8', 'nsx', 'gt-r', 'Beer', 'ar-15', '2019-supra', 'kimber-1911', 'mclaren-p1', 'AA-12'];

// Function for dumping the JSON content for each button into the div
function displayTopicInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" && "https://api.giphy.com/v1/gifs/search?q=" + topic  + "&api_key=mAGrPIR6EkqS8JKrB22qgdxAZ5YBjzZS&limit=10"; 
   
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#topics-view").text(JSON.stringify(response));
    });
}

// Function for displaying topic data
function renderButtons() {

    // Deleting buttons prior to adding movies
    // or you will have topics that repeat themselves
    $("#buttons-view").empty();


    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of  to our button
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();

    // This line would grab the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding info from textbox to the array
    topics.push(topic);
    console.log(topic);


    // Calling renderButtons which handles the processing of our topics array
    renderButtons();
});

// Function for displaying the topic info
// Using $(document).on instead of $(".topic").on to add event listeners to dynamically generated elements
$(document).on("click", ".topic", displayTopicInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();

// click event listener to the buttons
$("button").on("click", function () {
    var name = $(this).attr("data-name");
    
    // making a queryURL from names of array
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=mAGrPIR6EkqS8JKrB22qgdxAZ5YBjzZS&limit=10";

    // AJAX request with the queryURL
    $.ajax({
            url: queryURL,
            method: "GET"
        })

        // once data comes back from the request
        .then(function (response) {
            console.log(queryURL);

            console.log(response);
            // the data from AJAX request in the results varible
            var results = response.data;
            // Emtpties div for new material when new button clicked
            $("#popup-gifs").empty()

            

            // loops through each result item
            for (var i = 0; i < results.length; i++) {

                //creating and storing div tag
                var itemDiv = $("<div>");

                //creating and storing an image tag
                var topicImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                topicImage.attr("src", results[i].images.fixed_height.url);

                // appending the image tag to the topicDiv
                itemDiv.append(topicImage);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#popup-gifs").prepend(itemDiv);
                
            }
        });

        
          });