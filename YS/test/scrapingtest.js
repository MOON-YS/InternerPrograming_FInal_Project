//포스트 이미지 url 반환 함수
function getImgUrl(dabomUrl) {//다봄 url삽입
  return new Promise(function (resolve, reject) {
    const proxy = 'https://busan-show.herokuapp.com/';
    var request = new XMLHttpRequest();
    request.open("GET", proxy + dabomUrl);
    request.responseType = "document";
    request.onload = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let start = new Date();  // 시작
          var imgElement = request.responseXML.querySelector("div.leftbox>img");
          var imgUrl = imgElement.src;
          var splitUrl = imgUrl.split('/')
          imgurl = 'http://busandabom.net/images/contents/' + splitUrl[5]
          //console.log(imgurl)
          resolve(imgurl)
        } else {
          console.error(request.status, request.statusText);
        }
      }
    };
    request.onerror = function (e) {
      console.error(request.status, request.statusText);
    };
    request.send(null);  // not a POST request, so don't send extra data
  });
}

//전역
var testUrl = 'http://busandabom.net/play/view.nm?lang=ko&url=play&menuCd=5&res_no=2021100160'
var imgurl = await getImgUrl(testUrl);

console.log(imgurl)