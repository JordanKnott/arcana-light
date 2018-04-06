function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * Blurs the background and darkens it
 */
function blurBG() {
            $('#background').css("filter", "blur(5px) brightness(65%)");
}

/*
 * Unblurs and undarkens the background
 */
function unblurBG() {
            $('#background').css("filter", "none");
}

/*
 * Shows all category icons and hides all links that are showing.
 */
function unhideAll() {
    $('.category-container').each(function(index) {
        $(this).find(".icons").removeClass("category-hidden");
        $(this).find("div").removeClass("index-show");
    });
}

/*
 * Unselects all links 
 */
function unselectAll(key) {
    $('#category-' + key).find('div').children().each(function (){
            $(this).removeClass('target-link');
    });
}

/*
 * Creates a link element given a name and a location (href).
 */
function makeLink(name, href) {
        return "<a class='link' href='" + href + "'>" + name + "</a>";
}

/*
 * Sets the background based on the settings object.
 */
function setBackground() {
        $('#background').css('background',
                            'url("img/' + settings['background'] + '") center center / cover no-repeat fixed');
}

var articles = [];


$(document).ready(function() {

        // Set up the weather library
        $.simpleWeather({
            location: 'Tulsa, OK',
            woeid: '',
            unit: 'f',
            success: function(weather) {
                    html = '<h2 class="weatherHead"><i class="wi wi-yahoo-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp  + "</h2>"
                            + '<h3 class="weatherDetails">' + weather.currently + '</h3>';
                    $('#weather').html(html);
            },
            error: function(error) {
                    console.log("Error! " + error);
            }
        });

        // Starts the clock
        startTime();


        // Sets the current date
        $('#date').text(getDate());
        $('#day').text(getCurrentDayName());


        // Generate the categories and link lists based on the settings object
        var cat_length = settings['category'].length;
        for (var i=0; i<cat_length; i++) {
                var icons = settings['category'][i]['icon'];
                var links = settings['category'][i]['links'];
                var links_html = "";
                for (var index=0; index < links.length; index++) {
                    links_html += makeLink(links[index]['name'], links[index]['link']);
                }
                $('.link-container').append("<div id='category-" + i + "' class='category-container'><i class='icons fa fa-" + icons  + "'></i><div class='link-index'>" + links_html + "</div></div>");
        }


        // Event handler for when a mouse enters a category. 
        $(".category-container").mouseenter(function() {
                target = $('#category-' + $(this).index());
                target.find("div").toggleClass("index-show");
                currentMaxLinks = target.find("div").children().length;
                target.find("i").toggleClass("category-hidden");
                blurBG();
                target.find("a").first().addClass("target-link");
                links = [];
                target.find("div").children().each(function(index) {
                    links[index] = $(this).attr('href');
                });
                currentCategory = $(this).index();
                currentSelectedLink = 0;
        });

        // Event handler for when a mouse hovers over a link
        $('.category-container a').mouseenter(function() {
                unselectAll(currentCategory);
                currentSelectedLink = $(this).index();
                $(this).addClass('target-link');
        });

        // Event handler for when a mouse leaves a category
        $(".category-container").mouseleave(function() { 
                $(this).find("i").toggleClass("category-hidden");
                $(this).find("div").toggleClass("index-show");
                unblurBG();

                unhideAll();
                if (currentCategory !== null) {
                        unselectAll(currentCategory);
                }
                currentCategory = null;
                currentSelectedLink = null;
                currentMaxLinks = 0;
                links = [];
        });

        var bindings = [];
        var mappings = [];
        var cat_length = settings['category'].length;

        // Generates bindings based on the number of categories there are
        for (var i=0; i<cat_length; i++) {
                bindings[i] = (i + 1).toString();
                mappings[(i + 1).toString()] = i;
        }

        var currentCategory = null;
        var currentSelectedLink = null;
        var currentMaxLinks = 0;
        var links = [];

        // Binds the generated key array to a handler
        Mousetrap.bind(bindings, function(e) {
                unhideAll();

                if (currentCategory !== null) {
                        unselectAll(currentCategory);
                }

                var key = mappings[e.key];
                if (currentCategory == key) {
                        unblurBG();
                        currentCategory = null;
                        return;
                }

                target = $('#category-' + key);
                target.find("div").toggleClass("index-show");
                currentMaxLinks = target.find("div").children().length;
                target.find("i").toggleClass("category-hidden");
                blurBG();
                target.find("a").first().addClass("target-link");
                links = [];
                target.find("div").children().each(function(index) {
                    links[index] = $(this).attr('href');
                });
                currentCategory = key;
                currentSelectedLink = 0;
        });


        // Event handler for when up or k is pressed
        Mousetrap.bind(["up", "k"], function(e) { 
                if (currentCategory === null) {
                        return;
                }

                currentSelectedLink--;
                if ( currentSelectedLink == -1) {
                        currentSelectedLink = 0;
                }
                target = $('#category-' + currentCategory);
                target.find("div").children().eq(currentSelectedLink + 1).removeClass('target-link');
                target.find("div").children().eq(currentSelectedLink).addClass('target-link');
        });

        // Event handler for when down or j is pressed
        Mousetrap.bind(["down", "j"], function(e) { 
                if (currentCategory === null) {
                        return;
                }

                currentSelectedLink++;
                if ( currentSelectedLink == currentMaxLinks) {
                        currentSelectedLink = currentMaxLinks - 1;
                }
                target = $('#category-' + currentCategory);
                target.find("div").children().eq(currentSelectedLink - 1).removeClass('target-link');
                target.find("div").children().eq(currentSelectedLink).addClass('target-link');

        });

        // Event handler for when enter is pressed.
        Mousetrap.bind("enter", function(e) {
                console.log(links[currentSelectedLink]);
                if ( typeof currentSelectedLink !== "undefined" ) {
                        window.location = links[currentSelectedLink];
                }

        });

        Mousetrap.bind("alt+enter", function(e) {
            $("#search input[type=text]").focus();
        });

        Mousetrap.bind("escape", function(e) {
            $("categories-container").focus();
            unselectAll(currentCategory);
            unhideAll();
            unblurBG();
        });

        $("#search input[type=text]").on('keypress', function(e) {
            if(e.which === 13) {
                window.location = "http://google.com/#q=" + $("#search input[type=text]").val();
            }
        });

        $("#search input[type=text]").focusin(function() {
                blurBG();
        });
        $("#search input[type=text]").focusout(function() {
                unblurBG();
        });

        // Focus the category container



        var sources = settings['sources'];
        var endpoint = "https://newsapi.org/v1/articles";
        var apiKey = settings['apiKey'];
        for (var i = 0; i < sources.length; i++ ) {
                $.ajax({
                        url: endpoint + "?source=" + sources[i] + "&apiKey=" + apiKey
                }).then(function( data) {
                        var target = data['articles'];
                        for (var index = 0; index < target.length; index++ ) {
                                articles.push({
                                        "title" : target[index]['title'],
                                        "description" : target[index]['description'],
                                        "url" : target[index]['url']
                                });
                        }
                        articles = shuffle(articles);
                });
        }
        $('.category-container').focus();
});

var articleIndex = 0;
function startNewsSlider() { 
    if (articles.length !== 0) {
            $('#news').fadeOut(400, function() {
                    $('#news').html('');
                    if ( articles[articleIndex]['description'] !== null) {
                            $('#news').append('<a href="'
                                    + articles[articleIndex]['url'] +
                                    '"><h1>' + articles[articleIndex]['title'] 
                                    + '</h1><h2>' + articles[articleIndex]['description'] 
                                    + '</h2></a>');
                    } else {
                            $('#news').append('<a href="'
                                    + articles[articleIndex]['url'] +
                                    '"><h1>' + articles[articleIndex]['title'] 
                                    + '</h1></a>');

                    }
                    $('#news').fadeIn(400, function() {
                            articleIndex++;
                            if ( articleIndex == articles.length) {
                                    articleIndex = 0;
                            }
                            var t = setTimeout(startNewsSlider, 15000);
                    });

            });
    } else {
            var t = setTimeout(startNewsSlider, 500);
    }
}

startNewsSlider();

setBackground();
