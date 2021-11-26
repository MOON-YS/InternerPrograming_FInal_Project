function fn_count(isSub, url){
    window.open(url);
}


const proxy = 'https://busan-show.herokuapp.com/';
var request = new XMLHttpRequest();
request.open("GET", proxy+"http://busandabom.net/play/view.nm?lang=ko&url=play&menuCd=5&res_no=2021110077");
request.responseType = "document";
request.onload = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var fullImg = request.responseXML.querySelector(".boardlistView>.bottom>.tab_container2>div>div>img");
        var ticketing1 = request.responseXML.querySelector("#ticketing");
        var ticketing2 = request.responseXML.querySelector(".info > a:nth-child(1)");
        var div = document.createElement('div')
        console.log(ticketing1.firstElementChild.attributes[1].textContent);
        fullImg.style.width = '100%';
        div.appendChild(fullImg)
        div.style.width = '406px';
        div.style.height = '567.7px'
        div.style.overflow ='hidden';
        document.body.appendChild(div);
        document.body.appendChild(ticketing1);
        document.body.appendChild(ticketing2);
      } else {
        console.error(request.status, request.statusText);
      }
    }
  };
  request.onerror = function (e) {
    console.error(request.status, request.statusText);
  };
  request.send(null);  // not a POST request, so don't send extra data

