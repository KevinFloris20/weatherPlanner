

function getweather(){
$.ajax({
    type: "GET", 
    url: "http://api.openweathermap.org/data/2.5/weather?q=parsippany&appid=0013900bdb5821e8627c8eccc8185316",
    dataType: "json",
    success: function(data){
        console.log(data);
    }
});
}
console.log("yo");
getweather();
//0013900bdb5821e8627c8eccc8185316