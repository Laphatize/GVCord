function gup(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



if (!gup('code')) {
    window.location.href = "./failure";
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       localStorage.setItem("token", JSON.parse(xhttp.responseText).access_token);
       window.location.href = "../setup"
    }
};
xhttp.open("GET", `https://gvcord.pranavramesh.dev/api/fetchToken?code=${gup('code')}`, true);
xhttp.send();