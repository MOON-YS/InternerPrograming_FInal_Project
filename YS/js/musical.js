const appKey = '8ktFgkosFIYx7p%2FkZzmjWvD20eEUWMgZOipB0SNmBt%2BllCqqY0UoTiS0SHYConkvQ14vg31BhVGRGUFZ%2BMWBfg%3D%3D';
const apiLink1 = 'http://apis.data.go.kr/6260000/BusanCultureMusicalDetailService/getBusanCultureMusicalDetail?serviceKey=';
const apiLink2 = '&pageNo=1&numOfRows=';
let type = '&resultType=json';
var numOfRows1;//뮤지컬 정보 수
const proxy = 'https://busan-show.herokuapp.com/';
const initMusicalUrl = proxy + apiLink1 + appKey + apiLink2 + 10 + type;
let today = new Date();

const hallApiLink1 = 'http://apis.data.go.kr/6260000/BusanCulturePerformPlaceService/getBusanCulturePerformPlace?serviceKey=';
const hallApiLink2 = '&pageNo=1&numOfRows=';

const initHallUrl = proxy + hallApiLink1 + appKey + hallApiLink2 + 10 + type;

const todayDate = today.toISOString(); //현재날짜를 ISOSTring으로 반환(YYYY-MM-DDTtime:min:sec)-json 날짜와 비교가능

fetch(initMusicalUrl)//뮤지컬 초기 값
    .then((res) => res.json())
    .then((resJson) => {
        numOfRows1 = resJson.getBusanCultureMusicalDetail.totalCount;//전체 데이터를 불러오기위해 numOfRows에 전체 항목들 수 저장
        const musicalUrl = proxy + apiLink1 + appKey + apiLink2 + numOfRows1 + type;

        fetch(musicalUrl)//전체 뮤지컬
            .then((res) => res.json())
            .then((resJson) => {

                fetch(initHallUrl)//공연장 초기값
                    .then((res2) => res2.json())
                    .then((res2Json) => {
                        var numOfRows2 = res2Json.getBusanCulturePerformPlace.totalCount;
                        const hallUrl = proxy + hallApiLink1 + appKey + hallApiLink2 + numOfRows2 + type;

                        fetch(hallUrl)//전체 공연장
                            .then((res2) => res2.json())
                            .then((res2Json) => {
                               
                                var place = res2Json.getBusanCulturePerformPlace.item;
                                var musicalData = resJson.getBusanCultureMusicalDetail.item;
                                var curMusicalData = [];//날짜순 정렬을위해 뮤지컬 목록을 저장할 배열
                                var j = 0;

                                for (var i = 0; i < numOfRows1; i++) {
                                    if (musicalData[i]["op_st_dt"] >= todayDate) {//현재 날짜보다 큰경우만 실행 -> 오늘을 기점으로 이전 인경우엔 실행안함
                                        curMusicalData[j] = {
                                            res_no: musicalData[i]["res_no"],//뮤지컬 넘버
                                            title: musicalData[i]["title"],//뮤지컬 제목
                                            op_st_dt: musicalData[i]["op_st_dt"],//시작 날짜
                                            op_ed_dt: musicalData[i]["op_ed_dt"],//종료날짜
                                            op_at: musicalData[i]["op_at"],//
                                            place_id: musicalData[i]["place_id"],//공연장 id
                                            place_nm: musicalData[i]["place_nm"],//공연장 이름
                                            themeCodes: musicalData[i]["theme"],//테마 코드
                                            runTime: musicalData[i]["runtime"],//상영 시간
                                            showTime: musicalData[i]["showtime"],//상영 시작/종료 시각
                                            rating: musicalData[i]["rating"],//연령 등급
                                            price: musicalData[i]["price"],//가격
                                            original: musicalData[i]["original"],//
                                            casting: musicalData[i]["casting"],//캐스팅
                                            crew: musicalData[i]["crew"],//
                                            enterprise: musicalData[i]["enterprise"],//엔터테이먼트
                                            avg_star: musicalData[i]["avg_star"],//평점
                                            dabom_url: musicalData[i]["dabom_url"]//보담 정보 url
                                        }
                                        j++;
                                    }
                                }
                                dataPane = document.querySelector(".theater_data");

                                function sortByEnd() {
                                    for (var i = curMusicalData.length - 1; i > 0; i--) {
                                        for (var j = 0; j < i; j++) {
                                            if (curMusicalData[j].op_ed_dt > curMusicalData[j + 1].op_ed_dt) {
                                                var temp = curMusicalData[j];
                                                curMusicalData[j] = curMusicalData[j + 1];
                                                curMusicalData[j + 1] = temp;
                                            }
                                            else if (curMusicalData[j].op_ed_dt == curMusicalData[j + 1].op_ed_dt) {
                                                if (curMusicalData[j].op_st_dt > curMusicalData[j + 1].op_st_dt) {
                                                    var temp = curMusicalData[j];
                                                    curMusicalData[j] = curMusicalData[j + 1];
                                                    curMusicalData[j + 1] = temp;
                                                }
                                            }
                                        }
                                    }
                                }
                                sortByEnd();
                                
                                for (var i = 0; i < curMusicalData.length; i++) {
                                    let myButton = document.createElement('button');
                                    myButton.style.margin = '2%';
                                    let myDiv = document.createElement('Div');
                                    let mh3 = document.createElement('p');
                                    let when = document.createElement('p');
                                    let where = document.createElement('p');


                                    //dom에 내용 추가
                                    mh3.textContent = curMusicalData[i].title;
                                    when.textContent = "상영기간: " + curMusicalData[i].op_st_dt + '~' + curMusicalData[i].op_ed_dt
                                    where.textContent = "장소: " + curMusicalData[i].place_nm;

                                    //dom 추가
                                    dataPane.appendChild(myButton);
                                    myButton.appendChild(myDiv);
                                    myDiv.appendChild(mh3);
                                    myDiv.appendChild(when);
                                    myDiv.appendChild(where);
                                }

                                


                            })
                    })
            })
    })