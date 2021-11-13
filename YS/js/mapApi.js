var usrLatitude;
var usrLongitude; 

var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log(result);
    }
};


function callMap() { //사용자 위치를 먼저 불러오고 이후 맵을 띄움
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(usrLatitude, usrLongitude), // 지도의 중심좌표
			level: 3, // 지도의 확대 레벨
			mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
		};
		console.log("현재 위치는 : " + usrLatitude + ", "+ usrLongitude);
	// 지도를 생성한다 
	var map = new kakao.maps.Map(mapContainer, mapOption);

	// 지도에 마커를 생성하고 표시한다
	var marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(usrLatitude, usrLongitude), // 마커의 좌표
		map: map // 마커를 표시할 지도 객체
	});
	var geocoder = new kakao.maps.services.Geocoder();


geocoder.addressSearch('해남군 송지면', callback);

	
}

navigator.geolocation.getCurrentPosition(function(pos) { // 사용자 현재위치 저장
    usrLatitude = pos.coords.latitude;
    usrLongitude = pos.coords.longitude;
	callMap();
});

$.ajax({
    url: 'https://dapi.kakao.com/v2/local/search/address.json?query=동면',
    headers: { 'Authorization': 'KakaoAK YOUR_APP_KEY'},
    type: 'GET'
}).done(function(data) {
    console.log(data);
});