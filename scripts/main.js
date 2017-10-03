$(document).ready(function() {
    $(".glyphicon").on("click", function() {
        $(".search-box").show();
        $(this).hide();
    });

    $(".btn").on("click", function() {
        var articleTerm = $("#inputBox").val();
        getArticle(articleTerm);
    })


    function getArticle(articleTerm) {
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',

            headers: {
                'Api-User-Agent': 'mickey4sure2k7@gmail.com'
            },

            data: {
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                format: 'json',
                origin: '*',
                list: 'search',
                srsearch: articleTerm,
            },

            success: function(data) {
                processData(data.query.search);
            },

            fail: function(err, xhr) {
                console.log(err);
            },
        });
    }

    function processData(data) {

        // var searchResultsBox = document.querySelector('.search-results');
        var $searchResultsBox = $('.search-results');
        // searchResultsBox.innerHTML = '';
        $searchResultsBox.html('');

        data.forEach(function(obj) {

            // var mainContainer = document.createElement('div');
            var $mainContainer = $("<div></div>");
            // mainContainer.className = "main-container";
            $mainContainer.addClass('main-container');

            var title = obj['title'];
            // var heading = document.createElement('h2');
            var $heading = $("<h2></h2>").text(title);
            // heading.textContent = title;

            // var para = document.createElement('p');
            var $para = $("<p></p>").html(obj['snippet']);
            // para.innerHTML = obj['snippet'];

            // var a = document.createElement('a');
            var $a = $("<a></a>").attr('href', 'https://en.wikipedia.org/?curid=' + obj['pageid']);

            // a.setAttribute('href', 'https://en.wikipedia.org/?curid=' + obj['pageid']);
            // var list = document.createElement('div');
            var $list = $("<li></li>");
            $list.append($heading);
            $list.append($para);
            // list.appendChild(heading);
            // list.appendChild(para);
            $("<ul></ul>").append($list).appendTo($a);
            // $a.append($);

            $mainContainer.append($a);
            $searchResultsBox.append($mainContainer);
        });
    }
});