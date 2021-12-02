const proxy = 'https://busan-show.herokuapp.com/';
var request = new XMLHttpRequest();
request.open("GET", proxy+"http://busandabom.net/play/view.nm?lang=ko&url=play&menuCd=5&res_no=2021100061");
request.responseType = "document";
request.onload = function (e) {
    if (request.readyState === 4) {
      if (request.status === 200) {
        var imgElement = request.responseXML.querySelector("div.leftbox>img");
        var ticketing1 = request.responseXML.querySelector("#ticketing");
        var ticketing2 = request.responseXML.querySelector(".info");
        var div = document.createElement('div')
        var imgUrl = imgElement.src;
        var splitUrl = imgUrl.split('/')
        imgUrl = 'http://busandabom.net/images/contents/'+ splitUrl[5]
        console.log(imgUrl)
        console.log(ticketing2);
        var newImg = document.createElement('img')
        newImg.src = imgUrl;
        div.appendChild(newImg)
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

	function fn_count(restype, url){
		//카운트 수 증가
		//url 추가가능
		alert("본인확인으로 입장이 제한될 수 있습니다.");
		//url 링크로 이동
		window.open(url);
	}