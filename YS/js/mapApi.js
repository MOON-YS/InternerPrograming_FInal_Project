var usrLatitude;
var usrLongitude; 

function initCallMap() { //초기 맵로드
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(35.1379222, 129.05562775), // 부산 중심좌표를 초기 지도 중심으로
			level: 3, // 지도의 확대 레벨
			mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
		};
	// 지도를 생성한다 
	var map = new kakao.maps.Map(mapContainer, mapOption);
}

function callUsrMap() { //사용자 위치를 먼저 불러오고 이후 맵을 띄움
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

}
initCallMap();//초기 or Gps 정보가 없을경우를 위한 지도출력

navigator.geolocation.getCurrentPosition(function(pos) { // 사용자 현재위치 저장
    usrLatitude = pos.coords.latitude;
    usrLongitude = pos.coords.longitude;
	callUsrMap();//유저위치에 좌표
});

