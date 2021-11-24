//사용자 좌표값을 저장할곳
var usrLatitude;
var usrLongitude; 
var usrMarker;
var defaultMarker = new kakao.maps.Marker({});
var specialMarkerImage = new kakao.maps.MarkerImage(
	'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
	new kakao.maps.Size(64, 69), new kakao.maps.Point(27, 69));


//마커배열내의 마커를 전부 기본마커로 리셋
function resetMarkerImg(markerArr,img){
	for(var i = 0; i<markerArr.length;i++){
		markerArr[i].setImage(img);
	}
}
//마커배열내 특정인덱스의 마커를 특수마커로 바꿉니다.
function setSpMarkerImg(markerArr,k){
		markerArr[k].setImage(specialMarkerImage);
}
//기본 지도 그리기
let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
		center: new kakao.maps.LatLng(35.1379222, 129.05562775), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
		mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
	};
// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption);

function setCenter(lt, ln) {//해당위치를 맵의 센터로
	var moveLatLon = new kakao.maps.LatLng(lt, ln)
	map.setCenter(moveLatLon);
}

function usrLocation() { //사용자 위치허가 이후설정
	//사용자위치로 맵을 센터
	setCenter(usrLatitude, usrLongitude);
	// 지도에 마커를 생성하고 표시한다
	usrMarker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(usrLatitude, usrLongitude), // 마커의 좌표
		map: map // 마커를 표시할 지도 객체
	});

}

navigator.geolocation.getCurrentPosition(function (pos) { // 사용자 현재위치가 받을수있을대 실행됨
	usrLatitude = pos.coords.latitude;
	usrLongitude = pos.coords.longitude;
	usrLocation();//사용자 현재위치에 마커 표시 밑 맵 센터로
});
//맵에 마커를 추가하기위한 클러스터
var clusterer = new kakao.maps.MarkerClusterer({
	map: map,
	averageCenter: true,
	minLever: 5,
	minClusterSize: 100,
})
//상영정보를 받아 마커 생성하여 배열에 마커 삽입
function addMarkerToArray(lttd,lngt,targetMarkerArry) {
	var Marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(lttd, lngt),
	});
	targetMarkerArry.push(Marker);
	console.log("marker added")

}
//클러스터로 맵에 마커 배열 삽입
function addMarkerToMap(MarkerArr) {
		clusterer.addMarkers(MarkerArr);
}


//중복체크-기능은하나 lat만 정상적으로 출력되기에 lat만으로 비교
function isOverlap(lat,markerArray){
	var isOverlap;
	for(var i=0; i<markerArray.length; i++){
		var pos = markerArray[i].getPosition();
		var posLat = pos.getLat();
		//var posLng = pos.getLng();
		if( lat > posLat ){//오차범위  1프로
			if(lat - posLat < 0.00001){
				isOverlap = true;
				break;
			}
			else{
				isOverlap = false;
			}

		}
		else{
			if(posLat -  lat < 0.00001){
				isOverlap = true;
				break;
			}
			else{
				isOverlap = false;
			}
		}
	}
	return isOverlap;
}

//좌표값에 해당하는 마커 인덱스 반환-중복체크와 마찬가지로 lat만으로 확인
function getMarkerIndex(lat,markerArray){
	var result;
	for(var i=0; i<markerArray.length; i++){
		var pos = markerArray[i].getPosition();
		var posLat = pos.getLat();
			if( lat > posLat ){
				if(lat - posLat < 0.00001){
					result = i;
					break;
				}
			}
			else{
				if(posLat -  lat < 0.00001){
					result = i;
					break;
				}

			}
	}
	return result;
}
