

var emotionList = ["happy", "sad", "ungry", "excited", "mad"];



//function to add buttons dynamically to buttons div in HTML
addButtons = function () {
    $("#buttons").empty();
    for (var i = 0; i < emotionList.length; i++) {
        //  dynamicaly generates buttons for each emotion in the array
        var emotionBtn = $("<button>");
        emotionBtn.text(emotionList[i]);
        emotionBtn.addClass("btn btn-warning ml-1 mb-1 mt-1 emotion-btn");
        emotionBtn.attr("data-name", emotionList[i]);
        // Added the button to the buttons-view div
        $("#buttons").append(emotionBtn);

    }
}

displayEmotionImages = function () {
    $("#img-view").empty();
    var name = $(this).attr("data-name");
    var apikey = "5nuO5530mf7ZP8hu1PuNJP83FGzJTqyV";
    var url = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + apikey + "&limit=10";
    axios.get(url)
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < 10; i++) {
                var imgAnimate = response.data.data[i].images.fixed_height_small.url;
                var imgSrc = response.data.data[i].images.fixed_height_small_still.url;
                var imgStill = response.data.data[i].images.fixed_height_small_still.url;
                var rating = response.data.data[i].rating;
                var emotionImg = $("<img>");
                emotionImg.attr("src", imgSrc);
                emotionImg.attr("data-still", imgStill);
                emotionImg.attr("data-animate", imgAnimate);
                emotionImg.attr("data-state", "still");
                emotionImg.css("width", "180px");
                emotionImg.css("height", "180px");
                emotionImg.addClass("emotion-img");
                var ratingP=$("<p>").text("Rating is:"+rating);
                var col = $("<div class='col-md-3 col-sm-6 mt-2 '>").append([emotionImg,ratingP]);
                $("#img-view").append(col);
                console.log(response.data.data[i].images.fixed_height_small.url);


                console.log(response.data.data[i].images.fixed_height_small_still.url);
                console.log(response.data.data[i].rating);
            }
        })
    //    .error(function(error){
    //   console.error(error);

    //    })

}
ChangeImgState = function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    }

    if (state === "animate") {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
}

$("#addBtn").on("click", function () {
    event.preventDefault();
    // grab the input from the textbox
    var name = $("#emotion-input").val().trim();
    //  then added to emotion array
    console.log(name);
    emotionList.push(name);


    // Call addButtons to add add the content of array as buttons to HTML
    addButtons();

})

// Adding click event listeners to the elements with a class of "emotion-btn"
$(document).on("click", ".emotion-btn", displayEmotionImages);
// Adding click event listeners to he elements with a class of "emotion-img"
$(document).on("click", ".emotion-img", ChangeImgState);


addButtons();
