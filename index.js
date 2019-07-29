// global variables
let coinArray = new Array;
let coinModalArray = new Array;
let reportsArray = new Array;
let coinIdSearch = "";

/// loading gif for Ajax
$(document).ready(function(){

    $(document).ajaxStart(function(){
        if( $("#reportsPage").is(':visible')){
            return
        }
        else{
        $(".loading").css("display", "block");
        }
    });

    $(document).ajaxComplete(function(){
        if( $("#reportsPage").is(':visible')){
            return
        }
        else{
            $(".loading").css("display", "none");
        }

    });
});
   

$("#ConisButton").on("click" ,async function(){

    $("#reportsPage").css("display", "none");
    $("#aboutPage").css("display", "none");
    $("#CoinsPage").css("display", "block");
   // checking if coin div has coins
        if($('#CoinsDiv').children().length == 0){
            $('#CoinsDiv').empty();
            $('#coinsSearchDivUpdate').empty();
            $("#CoinsDiv").css("display", "grid")
            
            coinArray = [];
            coinArray=[];
        }
        
        else{
            return;
        }

    let searchInput = $("<input aria-describedby='basic-addon1' type='text' placeholder='Search Coin Simbole' id='searchCoinValue'></input>");
    let searchButton = $("<button class='btn btn-primary' id='searchCoinButton'>Search</button>");
    $("#searchCoinDiv").prepend(searchButton);
    $("#searchCoinDiv").prepend(searchInput);

    // ajax 
    let responseConisButton = await $.getJSON("https://api.coingecko.com/api/v3/coins/list");
         
        for(let i = 0; responseConisButton.length > i; i++){
            
            let responseConisButtonID = [responseConisButton[i].id,responseConisButton[i].symbol.toUpperCase()];
            let divCrad = $('<div></div>').addClass('card').attr('width', '18rem').attr("id", "card-" + responseConisButton[i].id).addClass("cord-class-"+responseConisButton[i].symbol);
            let CardBody = $('<div></div>').addClass('card-body');
            let CardBodyH5 = $('<h5></h5>').addClass('card-title').append(responseConisButton[i].symbol.toUpperCase());
            let CardBodyH6 = $('<h6></h6>').addClass('card-subtitle mb-2 text-muted').append(responseConisButton[i].name);
            let moreInfoBtn = $('<button id=' + responseConisButton[i].id + '>More Info</button>').attr('width', '200px').addClass('btn btn-primary').attr('onclick', "moreInfoClick('" + responseConisButton[i].id +"')");
            let CardToggle = $('<div></span>').attr('id', 'span' + responseConisButton[i].id).css("display", "none");
            let toggleButton = $("<button></button>").addClass("toggleButton").attr('onclick', "toggelCoin('" + responseConisButtonID + "')");       
            let toggleSpan = $("<span></span>").attr("id", "toggleSpan-" + responseConisButton[i].id);            
        
                $('#CoinsDiv').append(divCrad);
                    $(divCrad).append(CardBody);
                    $(CardBody).append(CardBodyH5);
                    $(CardBody).append(CardBodyH6);
                    $(CardBody).append(moreInfoBtn);
                    $(CardBody).append(CardToggle);
                    $(CardBody).append(toggleButton);
                    (toggleButton).append(toggleSpan);
        }
    
   /// Search     
        searchButton.on("click", () =>{
        coinIdSearch = "";
        let searchCoinValue = $("#searchCoinValue").val().toLowerCase();

        if(searchCoinValue == ""){
            alert("for searching a Coin plz write the Coin Symbol.")
            return;
        }
        
        let coinsSearchDivArry =$( "#coinsSearchDivUpdate" ).children();
        let coinsDivArry =$( "#CoinsDiv" ).children();
      
        for(let i =0; coinsDivArry.length > i; i++){
            if($(coinsDivArry[i]).hasClass("cord-class-"+searchCoinValue) == true){
                coinIdSearch = coinsDivArry[i];
                break;
            }
            else{
                if($(coinsSearchDivArry[i]).hasClass("cord-class-"+searchCoinValue) == true){
                    alert("You've already Searched "+ searchCoinValue )
                    coinIdSearch = "false";
                    break;
                }          
            }  
        }
        if(coinIdSearch == ""){
            alert ("Coin " + searchCoinValue +" is not found")
            return
        }
        else{
            if(coinIdSearch == "false"){
                return
            }
            $('#coinsSearchDivUpdate').append(coinIdSearch);
        }
    })    
});
/// toggle button  clicked
async function  toggelCoin(coinId){

    let coinSlipt = coinId.split(",");
    let coinCardModel = coinSlipt[0];
    let coinreports = coinSlipt[1];

    if($("#myModal").hasClass("modal fade show")){
        if($("#" +"toggleSpan-" + coinCardModel).hasClass("toggled")){

            $("#" +"toggleSpan-" + coinCardModel).removeClass("toggled");
            coinArray.splice($.inArray(coinCardModel, coinArray), 1);
            reportsArray.splice($.inArray(coinreports, reportsArray), 1);
            let modalCoinsAutoClick =  $("#coinModalBody").children();
            $(modalCoinsAutoClick).css("height", 250);
            $("#CoinsDiv").prepend(modalCoinsAutoClick);
        
            coinArray.push(coinModalArray[0]);
            reportsArray.push(reportsArray[0]);

            coinModalArray= [];
            $("#modalButtonAutoClose").click();
            return;
    }
        else{
            alert("you can't select more than 5 coins");
            return;
        }
    }
    
    if($("#" +"toggleSpan-" + coinCardModel).hasClass("toggled")){
        
        $("#" +"toggleSpan-" + coinCardModel).removeClass("toggled");
        coinArray.splice($.inArray(coinCardModel, coinArray), 1);
        reportsArray.splice($.inArray(coinreports, reportsArray), 1);
    }

    else{

        //if the user select lese than 5 
        if(coinArray.length < 5){

            $("#" +"toggleSpan-" + coinCardModel).addClass("toggled");      
            coinArray.push(coinCardModel);
            reportsArray.push(coinreports); 
        }
        //if the user select more than 5 
        // model open
        else{
            // add to model array
            coinModalArray.push(coinCardModel);
            $("#" +"toggleSpan-" + coinCardModel).addClass("toggled");
            $("#modelButton").click();

                for(let i = 0;coinArray.length > i; i++){
                    $("#card-" + coinArray[i]).removeAttr('height');
                    $("#coinModalBody").append($("#card-" + coinArray[i]));
                }   
        }
    }
}
// modal - close button click
$("#modalButton").click(function(){
   
        let modalCoins =  $("#coinModalBody").children();
        $("#CoinsDiv").prepend(modalCoins);
        $("#" +"toggleSpan-" + coinModalArray[0]).removeClass("toggled");
        coinModalArray= [];
});

async function reports(){

        $("#CoinsPage").css("display", "none");
        $("#aboutPage").css("display", "none");
        $("#reportsPage").css("display", "grid");

        if(reportsArray.length == 0){
            alert("you need to pick a coin to see his report");
            $("#ConisButton").click();
            return
        }
        else{

            let reportsCoins = "";
            
            for (let i = 0; i < reportsArray.length; i++) {
                if (i != reportsArray.length - 1) {
                    reportsCoins += reportsArray[i] + ",";
                } else {
                    reportsCoins += reportsArray[i];
                }
            }
                
            let data = [];
            let dataPoints= [];

            let ajaxCoinsReport = await $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + reportsCoins + "&tsyms=USD");    
            let coinsNamesReport = Object.keys(ajaxCoinsReport);
            let coinsValuesReport = Object.values(ajaxCoinsReport);
            
                if(ajaxCoinsReport.Response == "Error"){
                    alert(ajaxCoinsReport.Message);
                    $("#ConisButton").click()
                    return;
                }
         
            for(let i = 0;coinsNamesReport.length > i; i++){
                dataPoints.push([{x:new Date(),y: coinsValuesReport[i].USD}]);
            }
   
            for(let i = 0;coinsNamesReport.length > i; i++){

                let newSeries = {
        
                    type: "spline",
                    name: coinsNamesReport[i],
                    showInLegend: true,
                    xValueFormatString: "HH:mm:ss",
                    yValueFormatString: "$ 0.############",
                    dataPoints: dataPoints[i]
                };
                data.push(newSeries);

            }
                var options = {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: "Coins Value Chart"
                    },
                    subtitles: [{
                        text: "Click Legend to Hide or Unhide Data Series"
                    }],
                    axisX: {
                        title: "States"
                    },
                    axisY: {
                        title: "Coin Vlaue",
                        titleFontColor: "#4F81BC",
                        lineColor: "#4F81BC",
                        labelFontColor: "#4F81BC",
                        tickColor: "#4F81BC",
                        includeZero: false
                    },
                    axisY2: {
                        title: "Profit in USD",
                        titleFontColor: "#C0504E",
                        lineColor: "#C0504E",
                        labelFontColor: "#C0504E",
                        tickColor: "#C0504E",
                        includeZero: false
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: toggleDataSeries
                    },	
                    data: data
 
                };
                let chart = new CanvasJS.Chart("chartContainer", options);
                chart.render();

                let updateCart = async function(){
                    if($("#CoinsPage").is(':visible') || $("#aboutPage").is(':visible')){
                        clearInterval(updateCart)              
                    }
                    else{
                        let ajaxCoinsReport = await $.getJSON("https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + reportsCoins + "&tsyms=USD");
                        let coinsValuesReport = Object.values(ajaxCoinsReport);
                        let coinsNamesReport = Object.keys(ajaxCoinsReport);
        
                        for(let i = 0;coinsNamesReport.length > i; i++){
                            options.data[i].dataPoints.push({x:new Date(),y: coinsValuesReport[i].USD});
                        }
                        chart.render();
                }          
            }
                setInterval(function(){updateCart()}, 2000);

                function toggleDataSeries(e) {
                    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }
        };
        }

function moreInfoClick(coinId){

    if ($("#" + "span" + coinId).css('display').toLowerCase() == 'block') {

        $("#" + "span" + coinId).hide();
      } else {
        $("#" + "span" + coinId).show();
      }

    let sessionTime = sessionStorage.getItem(coinId);
    let jsonSession = JSON.parse(sessionTime);
       
        if(sessionTime !== null){

            if(Math.floor((new Date() - jsonSession.lastTime)/60000) < 2 ){
            let usdSession = jsonSession.usd;
            let eurSession = jsonSession.eur;
            let ilsSession = jsonSession.ils;
            let imgSession = jsonSession.img;
            $("#" + "span" + coinId).html(usdSession + "<br>" + eurSession + "<br>" + ilsSession + "<br>" + imgSession);
        }
        else{

            $.ajax({

                url: "https://api.coingecko.com/api/v3/coins/" + coinId,
                success: function(response){
         
                    let usd = response.market_data.current_price.usd + "$";
                    let eur = response.market_data.current_price.eur + "&#8364";
                    let ils = response.market_data.current_price.ils + "&#8362";
                    let img = "<img src='" + response.image.small +"'></img>";
                    let lastTime =  Math.floor(new Date());
                    let obj = { "usd":usd, "eur":eur, "ils":ils,"img":img,"lastTime":lastTime };
                    let myJSON = JSON.stringify(obj);
    
                    sessionStorage.setItem(coinId, myJSON);
      
                    $("#" + "span" + coinId).html(usd + "<br>" + eur + "<br>" + ils + "<br>" + img);
                    },  
                        error: function(err){
                            alert("Error: " + err.status);
                        }   
                    });        
        }

    }
        else{
            $.ajax({

                url: "https://api.coingecko.com/api/v3/coins/" + coinId,
                success: function(response){
 
                let usd = response.market_data.current_price.usd + "$";
                let eur = response.market_data.current_price.eur + "&#8364";
                let ils = response.market_data.current_price.ils + "&#8362";
                let img = "<img src='" + response.image.small +"'></img>";
                let lastTime =  Math.floor(new Date());
                let obj = { "usd":usd, "eur":eur, "ils":ils,"img":img,"lastTime":lastTime };
                let myJSON = JSON.stringify(obj);

                sessionStorage.setItem(coinId, myJSON);
  
                $("#" + "span" + coinId).html(usd + "<br>" + eur + "<br>" + ils + "<br>" + img);
            },  
            error: function(err){
                alert("Error: " + err.status);
            }   
        });
    
            }    
    };

    $("#aboutButton").on("click" ,function(){
        $("#reportsPage").css("display", "none");
        $("#CoinsPage").css("display", "none");
        $("#aboutPage").css("display", "block");
        $("#aboutPage").html("<div class='aboutPage'><h1 class=''>About Me...</h1><div class='aboutMe'><p>Welcome "+
        "to my site <br> my name is Adi Levi <br> I am 25 years old from israel Petah Tikva.<br>" +
        "I really like Web development.</p>"+
        "<img src='images/aboutMy.jpg'></div><div class='aboutSite'><h3></h3><p>this site provides information and" +
        "reports from the world of virtual trade.<br>On this site you can search for "+
        "information on 4000 coins.<br>Search by currency symbol.<br>" +
        "You can see the value of the currencies in real time.To do this," +
        "click the switch in each currency and click the Reports button"+"</p></div>"+"</div>"                                                                               
        )
    }); 
              
 