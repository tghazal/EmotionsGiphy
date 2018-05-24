

var emotionList = ["Happy", "Ungry", "Excited", "Mad", "Fear", "Anger", "Sadness", "Joy", "Disgust", "Surprise", "Trust", "Anticipation"];
var name;



//function to add buttons dynamically to buttons div in HTML
addButtons = function () {
    $("#buttons").empty();
    for (var i = 0; i < emotionList.length; i++) {
        //  dynamicaly generates buttons for each emotion in the array
        var emotionBtn = $("<button>");
        emotionBtn.text(emotionList[i]);
        emotionBtn.addClass("btn btn-warning ml-1 mb-1 mt-1 emotion-btn");
        emotionBtn.attr("data-name", emotionList[i]);
        emotionBtn.attr("data-type", "originalAdd");
        // Added the button to the buttons-view div
        $("#buttons").append(emotionBtn);

    }
}

displayEmotionImages = function () {
  
    var type = $(this).attr("data-type");
    var myDiv=$("<div>");
    if (type === "originalAdd") {
        $("#img-view").empty();
        name = $(this).attr("data-name");
    }
    if(type==="add")
    {
     $("#col2").remove();
  
    }


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
                var ratingP = $("<p>").text("Rating is:" + rating);
                var titleP = $("<p>").text("Title :" + response.data.data[i].title);
              var ahref=$("<a href="+imgSrc+">Download</a>");
              ahref.attr("download","output.png");
                var col = $("<div class='col-md-3 col-sm-6 mt-2 '>").append([emotionImg, ratingP,titleP,ahref]);
                $("#img-view").append(col);
                console.log(response.data.data[i]);
            }
            var addBtn = $("<button id='addBtn' class='btn btn-warning ml-1 mb-1 mt-1 emotion-btn'>").text("Add More ..");
            addBtn.attr("data-type", "add");
            var col2 = $("<div id='col2' class='col-md-3 col-sm-6 mt-2 '>").append(addBtn);
            $("#img-view").append(col2);
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
