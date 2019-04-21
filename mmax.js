// default header for all pages except forms
var header = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">' +
    '<a class="navbar-brand" href="index.html"> <span class="logo">MovieMax</span></a>' +
    '<form class="form-inline col-sm " action="search.html"> <input class=' +
    '"form-control mr-sm-2  col-sm-8" type="text" id="query" name="query" placeholder="Search movie">' +
    '<button class="btn btn-primary" type="submit">Search</button> </form>' +
    '<ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="login.html">' +
    'Log in</a> </li> <li class="nav-item"><a class="nav-link" href="cart.html">Cart</a>' +
    '</li></ul></nav>'

// default footer for all pages
var footer = '<div class="col col-sm-4" style="">' +
    '<ul class="list-unstyled"><li class="nav-item"><a href="/se-projects/account/index.html">Your Account</a>' +
    '</li><li class="nav-item"><a href="/se-projects/register.html">Register</a></li><p><small>' +
    '&copy; 2019 MovieMax</small></p></ul></div><div class="col col-sm-4">' +
    '<ul class="list-unstyled"><li class="nav-item"><a href="/se-projects/terms.html">Terms of Use</a>' +
    '</li><li class="nav-item"><a href="/se-projects/privacy.html">Privacy Policy</a></li></ul></div>' +
    '<div class="col col-sm-4"><ul class="list-unstyled"><li class="nav-item">' +
    '<a href="/se-projects/contact.html">Contact Us</a></li><li class="nav-item"><a href="/se-projects/about.html">' +
    'About us</a></li></ul></div>'

// header for pages with forms
var forms_header = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">' +
    '<a class="navbar-brand" href="/se-projects/index.html"> <span class="logo">MovieMax</span></a></nav>'

var header_loggedIn = '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">' +
    '<a class="navbar-brand" href="/se-projects/index.html"> <span class="logo">MovieMax</span></a>' +
    '<form class="form-inline col-sm " action="search.html"> <input class=' +
    '"form-control mr-sm-2  col-sm-8" type="text" placeholder="Search movie">' +
    '<button class="btn btn-primary" type="submit">Search</button> </form>' +
    '<ul class="navbar-nav"><li class="nav-item dropdown">' +
    '<a class="nav-link dropdown-toggle" href="/se-projects/account/index.html" id="navbardrop" data-toggle="dropdown">' +
    'My account</a><div class="dropdown-menu">' +
    '<a class="dropdown-item" href="/se-projects/account/edit.html">Edit profile</a>' +
    '<a class="dropdown-item" href="/se-projects/account/library.html">Movie library</a>' +
    '<a class="dropdown-item" href="/se-projects/account/history.html">History</a></div></li>' +
    '<li class="nav-item"><a class="nav-link" href="/se-projects/cart.html">Cart</a>' +
    '</li></ul></nav>'

function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}

const movies_endpoint = 'https://j0l1npgx02.execute-api.us-east-2.amazonaws.com/prod-live/movies/';
const ul = document.getElementById('moviesList');

// get movie with match
function getMovies(searchString) {
    window.fetch(movies_endpoint + toTitleCase(searchString))
        .then((resp) => resp.json())
        .then(function (data) {
            let movies = data.results;
            return movies.map(function (movie) {
                // this is for testing purposes, will change to return list once i can get the endpoint working locally
                let li = createNode('li'),
                    span = createNode('span');
                span.innerHTML = `${movie.title} ${movie.year}`;
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

// get movie function 2
function getMovies2(searchString){
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
// ghibliapi is a placeholder until i get our movies endpoint working
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
        console.log(movie.title)
    })
    } else {
        console.log('error')
    }
  }

// Send request
request.send()
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
