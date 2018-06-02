// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        let articleTitle = `<a href=${data[i].link}><h3 class='title'>${data[i].title}</h3></a>`;
        let articleSummary = `<h5>${data[i].summary}</h5>`;
        let articleDiv = `<div data-id=${data[i]._id}>${articleTitle}${articleSummary}<button id="addNote" data-id=${data[i]._id}>Add note</button>`

        let articleNotes = data[i].notes
        if (articleNotes.length) {
            var viewNotesButton = `<button id="viewNotes" data-id=${data[i]._id}>View notes</button>`;
            articleDiv += viewNotesButton;
        }

        if (data[i].saved) {
            var unsaveArticleButton = `<button id="unsaveArticle" data-id=${data[i]._id}>Unsave article</button>`
            articleDiv += unsaveArticleButton;
        } else {
            var saveArticleButton = `<button id="saveArticle" data-id=${data[i]._id}>Save article</button>`
            articleDiv += saveArticleButton;
        }

        articleDiv += "</div>";

        $("#articles").append(articleDiv);
    }
});



// Whenever someone clicks a p tag
$(document).on("click", "#addNote", function (e) {
    // Prevent the button click from refreshing the page
    e.preventDefault();

    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    let thisId = $(this).attr("data-id");
    let thisTitle = $(this).parent().find(".title").text();

    // Create a note form for user to fill,
    // The title of the article
    $("#notes").append("<h2>" + thisTitle + "</h2>");
    // An input to enter a new title
    $("#notes").append("<input id='titleinput' name='title' >");
    // A textarea to add a new note body
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $("#notes").append("<button data-id='" + thisId + "' id='savenote'>Save Note</button>");
});

// save article
// When you click the savenote button
$(document).on("click", "#saveArticle", function (e) {
    // Prevent the button click from refreshing the page
    e.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "PUT",
        url: `/articles/${thisId}`,
        data: {
            saved: true
        }
    })
        // With that done
        .then(function (data) {
            // location reload to refresh page and have notes button appear
            location.reload();


        });
});

$(document).on("click", "#unsaveArticle", function (e) {
    // Prevent the button click from refreshing the page
    e.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "PUT",
        url: `/articles/${thisId}`,
        data: {
            saved: false
        }
    })
        // With that done
        .then(function (data) {
            // location reload to refresh page and have notes button appear
            location.reload();


        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function (e) {
    // Prevent the button click from refreshing the page
    e.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Only POST if user entered something in the body
    var body = $("#bodyinput").val();
    var title = $("#titleinput").val();

    if (title && body) {
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title,
                // Value taken from note textarea
                body
            }
        })
            // With that done
            .then(function (data) {
                // location reload to refresh page and have notes button appear
                location.reload();


            });
    }
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});

// When you click the viewNotes button
$(document).on("click", "#viewNotes", function (e) {
    // Prevent the button click from refreshing the page
    e.preventDefault();

    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
    })
        // With that done
        .then(function (data) {
            // location reload to refresh page and have notes button appear
            console.log(data);
        });
})
