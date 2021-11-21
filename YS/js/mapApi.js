var usrLatitude;
var usrLongitude; 
//기본 지도
let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
		mapOption = {
			center: new kakao.maps.LatLng(35.1379222, 129.05562775), // 지도의 중심좌표
			level: 3, // 지도의 확대 레벨
			mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
		};
	// 지도를 생성한다 
	var map = new kakao.maps.Map(mapContainer, mapOption);

function setCenter(lt,ln){//해당위치를 맵의 센터로
	var moveLatLon = new kakao.maps.LatLng(lt, ln)	
	map.setCenter(moveLatLon);
	}

function usrLocation() { //사용자 위치허가 이후설정
	//사용자위치로 맵을 센터
	setCenter(usrLatitude, usrLongitude);
	// 지도에 마커를 생성하고 표시한다
	var marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(usrLatitude, usrLongitude), // 마커의 좌표
		map: map // 마커를 표시할 지도 객체
	});

}

navigator.geolocation.getCurrentPosition(function(pos) { // 사용자 현재위치가 받을수있을대 실행됨
    usrLatitude = pos.coords.latitude;
    usrLongitude = pos.coords.longitude;
	usrLocation();//사용자 현재위치에 마커 표시 밑 맵 센터로
});

var clusterer = new kakao.maps.MarkerClusterer({
	map: map,
	averageCenter: true,
	minLever: 5,
})

