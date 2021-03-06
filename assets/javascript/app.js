

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
  
//function to display images to html , 10 images each time 
displayEmotionImages = function () {
   // declare variables initial and end for the begging and end of result array 
    var initial=0;
    var end=10; 
    //declair url using APIkey
    var apikey = "5nuO5530mf7ZP8hu1PuNJP83FGzJTqyV";
    var url = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=" + apikey ;
    //get the type of button clicked if the original buttons above or the add more button 
    var type = $(this).attr("data-type");
    var myDiv=$("<div>");
    //if the original buttons clicked then get the name of the nutton and intilize initial to  and end to 10 
    if (type === "originalAdd") {
        $("#img-view").empty();
        name = $(this).attr("data-name");
        initial=0;
        end=10;
       
    }
    // els eif the buttonclickes is add more then add 10 to inital and end 
    if(type==="add")
    {
     $("#col2").remove();
     initial=initial+10;
     end=end+10;
     
    }


  //giving url to axios object 
    axios.get(url)
        .then(function (response) {
            //put the response in result array 
            var results = response.data;
             // for 10 times add an image to the htmk div with title and rating and download link 
            for (  initial; initial < end; initial++) {
                
                console.log(initial);
                var imgAnimate = response.data.data[initial].images.fixed_height_small.url;
                console.log(imgAnimate);
                var imgSrc = response.data.data[initial].images.fixed_height_small_still.url;
                var imgStill = response.data.data[initial].images.fixed_height_small_still.url;
                var rating = response.data.data[initial].rating;
                var emotionImg = $("<img>");
                emotionImg.attr("src", imgSrc);
                emotionImg.attr("data-still", imgStill);
                emotionImg.attr("data-animate", imgAnimate);
                emotionImg.attr("data-state", "still");
                emotionImg.css("width", "180px");
                emotionImg.css("height", "180px");
                emotionImg.addClass("emotion-img");
                var ratingP = $("<p>").text("Rating is:" + rating);
                var titleP = $("<p>").text("Title :" + response.data.data[initial].title);
                var ahref=$("<a href="+imgSrc+" >Download </a>");
                ahref.attr("download");
                var movetoF=$("<a href='#'>Move to favourite section</a>");
                movetoF.addClass("moveToFavourite");
                var col = $("<div class='col-md-3 col-sm-6 mt-2 '>").append([emotionImg, ratingP,titleP,ahref]);
                $("#img-view").append(col);
                console.log(response.data.data[initial]);
            }
            var addBtn = $("<button id='addBtn' class='btn btn-warning ml-1 mb-1 mt-1 emotion-btn'>").text("Add More ..");
            addBtn.attr("data-type", "add");
            var col2 = $("<div id='col2' class='col-md-3 col-sm-6 mt-2 '>").append(addBtn);
            $("#img-view").append(col2);
        })
        .catch(function(err){
            console.error(err)
        }
    )
    

}
// change image state whenever clicked on images
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

//when addBtn button clicked get the name and oush it to the array 
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

// call addButtons to add buttons at the top in html
addButtons();
