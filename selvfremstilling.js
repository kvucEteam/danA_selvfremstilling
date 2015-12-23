var jsonData = "<h1>OK</h1>";

var NumOfQuestions = 0;
var QuestionCounter = 0; // 21;  // <---- For testing endsenario.
var ErrorCount = 0;


function returnDropdownMarkup(DropdownObj){
    var Selected = 0;
    var DO = DropdownObj;
    console.log("DO: " + DO);
    var HTML = '<select'+((DO.hasOwnProperty("id"))?' id="'+DO.id+'"':"")+((DO.hasOwnProperty("class"))?' class="'+DO.class+'"':"")+'>';
    if (DO.hasOwnProperty("selected"))
            Selected = parseInt( DO.selected );
            console.log("returnDropdownMarkup - Selected: " + Selected);
    var DOO = DropdownObj.options;
    for (n in DOO){
        HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+DOO[n].value+'">'+DOO[n].value+'</option>';
    };
    HTML += "</select>";
    return HTML;
}
var TDropdown = {id:"Dropdown1", class:"Dropdown", selected: "1",
                    options:[
                        {id:"id1", class:"class1", value:"val 1"},
                        {id:"id2", class:"class2", value:"val 2"},
                        {id:"id3", class:"class3", value:"val 2"}
                    ]
                };
var TDropdown2 = {options:[
                    {value:"val 1"},
                    {value:"val 2"},
                    {value:"val 2"}]
                };
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown));
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown2));



function ReturnAjaxData(Type, Url, Async, DataType) {
    $.ajax({
        type: Type,
        url: Url,
        async: Async,
        dataType: DataType,
        success: function(Data) {
            console.log("ReturnAjaxData: " + JSON.stringify(Data));
            jsonData = JSON.parse(JSON.stringify(Data));
            // JsonExternalData = JSON.parse(JSON.stringify(Data));
        }
    }).fail(function() {
        alert("Ajax failed to fetch data - the requested quizdata might not exist...");
    });
}

function addCounterToJsonData(jsonData){
    console.log("\n\n jsonData 1: " + JSON.stringify(jsonData));
    var JDQ = jsonData.qustions;
    for(var n in JDQ){
        var JDQD = JDQ[n].DropDowns;
        for(var k in JDQD){
            JDQD[k].counter = 0; // All dropdown get the counter. When the first dropdown-answer is correct, then counter = 1. When the second dropdown-answer is correct, then counter = 2.
        }
    }
    console.log("\n\n jsonData 2: " + JSON.stringify(jsonData));
}


function returnUserInterface(jsonData){
    var JDQ = jsonData.qustions;
    var HTML = '';

    // Rendering buttons for the user interface:
    HTML += '<div id="btnContainer">';
    for (var n in JDQ){
        HTML += '<span class="btnCase btn btn-'+((n==0)?"primary":"info")+'">'+JDQ[n].name+'</span>';
    }
        // HTML += '<span class="btnEndSenario btn btn-info hide">'+jsonData.endSenario.btnText+'</span>';  // Den rigtige - AKTIVER!!! 18/12-2015
        HTML += '<span class="btnEndSenario btn btn-info">'+jsonData.endSenario.btnText+'</span>';     // TEST MED TLY  18/12-2015
    HTML += '</div>';
    
    // Rendering the case-senarios for the usrinterface
    for(var n in JDQ){
        HTML += '<div id="UserInterface_'+String(n)+'"class="UserInterface '+((n>0)?"hide":"")+'">';
        HTML +=     '<div class="row">';
        HTML +=         returnSourceItem(JDQ[n].sourceData);
        HTML +=     '</div>';
        HTML +=     '<div class="row">';
        var JDQD = JDQ[n].DropDowns;
        
            for(var k in JDQD){
                HTML += '<div class="DropdownContainer col-xs-12 col-sm-4 col-md-2"> ';
                    HTML += '<div class="DropdownIcon '+JDQD[k].glyphicon+'"></div>';
                    // HTML += JDQD[k].glyphicon;
                    HTML += '<div class="DropdownHeader">'+JDQD[k].header+'</div>';
                    for(var q in JDQD[k].obj){
                        // HTML += '<span class="DropdownObj">'+returnDropdownMarkup( JDQD[k].obj[ JDQD[k].counter ] )+' <span class="ErrMsg"></span> </span> ';
                        HTML += '<div class="DropdownObj">'+returnDropdownMarkup( JDQD[k].obj[ q ] )+' <span class="ErrMsg"></span> </div> ';
                    }
                HTML += '</div>';
                console.log("returnSearchInterface " + n);
            }
        HTML +=     '</div>';
        HTML += '</div>';
    }

    // Rendering the comparative analysis (danish: "komparativ analyse")
    HTML += '<div id="comparativeAnalysis">';
    // HTML +=     '<h2 id="header_comparativeAnalysis">'+jsonData.endSenario.header+'</h2>';         // Moved to event-listeners
    // HTML +=     '<h4 id="subHeader_comparativeAnalysis">'+jsonData.endSenario.subHeader+'</h4>';   // Moved to event-listeners
    HTML +=     returnCarouselHtml(jsonData);  // Insert carousel HTML
    HTML += '</div>';
    
    return HTML;
}


//==============================================================================
//          Datatypes for text, images and video
//==============================================================================
// "sourceData": {
//             "type": "img",
//             "src": "img/06_Elna_Statistisk_aarbog_1920_side_27_js.jpg",
//             "alt": "Lokalt billede..."
//         }
// "sourceData": {
//             "type": "text",
//             "text": "Mødeindkaldelse ledsaget af artikel skrevet af Louis Pio..."
//         }
// "sourceData": {
//             "type": "video",
//             "src": "https://player.vimeo.com/video/129639593"
//         }
function returnSourceItem(JDQS){
    var HTML = '';
    switch(JDQS.type) {
        case "img":
            // HTML += '<div class="SourceWrapper" data-toggle="modal" data-target="#myModal"> <img class="img-responsive SourceImg" src="'+itemData.kildeData.src+'" alt="'+itemData.kildeData.alt+'"/> </div>';
            HTML += '<div class="ImgHolder SourceWrapper col-xs-12 col-md-8"> <img class="img-responsive SourceImg" src="'+JDQS.src+'" alt="'+JDQS.alt+'"/> </div>';
            break;
        case "text":
            HTML += '<div class="TextHolder SourceWrapper col-xs-12 col-md-8">'+JDQS.text+'</div>';
            break;
        case "video":
            HTML += '<div class=" col-xs-12 col-md-8">' +
                        '<div class="VidHolder SourceWrapper embed-responsive embed-responsive-16by9">' +
                                '<iframe class="embed-responsive-item" src="'+JDQS.src+'?rel=0" allowfullscreen="1"></iframe>' + 
                        '</div>' +
                    '</div>';
            break;
        case "html":
            HTML += '<div class="htmlHolder SourceWrapper col-xs-12 col-md-8">' + 
                        JDQS.html + 
                    '</div>';
            break;
        default:
            alert('Invalid "type"');
    }
    console.log("returnSourcelItem: " + HTML);
    return HTML;
}


function giveFeedback(feedbackMsg, correctAnswer){
    var HTML = "";

    if (correctAnswer) {
        HTML += '<h3>Du har svaret <span class="label label-success">Korrekt!</span> </h3>';
        HTML += "<p>";
        HTML += feedbackMsg;
        HTML += "</p>";
        HTML += '<span class="btn btn-lg btn-info GoOn">GÅ VIDERE</span>';

        UserMsgBox("body", HTML);
    }
    if (!correctAnswer){
        HTML += '<h3>Du har svaret <span class="label label-danger">Forkert</span> </h3>';
        HTML += "<p>";
        HTML += feedbackMsg;
        HTML += "</p>";

        UserMsgBox("body", HTML);
    }
}


//=======================================================================================
//                  Carousel code
//=======================================================================================


// The function makes the carousel-indicator for the carousel:
function returnCarouselIndicators(jsonData){
    var HTML = '';
    // for (var i = 0; i < jsonData.endSenario.carousel.length; i++) {
    for (var i in jsonData.endSenario.carousel) {
        HTML += '<li data-target="#questionCarousel" data-slide-to="'+i+'"'+((i==0)?' class="active"':'')+'></li>';
    };
    console.log("returnCarouselIndicators: " + HTML);

    return HTML;
}
// XXX = [{1:1},{2:2},{3:3},{4:4},{5:5}];
// returnCarouselIndicators(XXX);



function returnCarouselItem2(jsonData){
    console.log("returnCarouselItem2 - jsonData: " + JSON.stringify(jsonData));
    var slideData = jsonData.endSenario.carousel;
    console.log("returnCarouselItem2 - slideData: " + slideData.length);

    var HTML = '';

    // for (var i in slideData){
    for (var i = 0; i < slideData.length; i++) {
        // var HTML = '<div id="question_'+questionNum+'" class="item'+((questionNum==0)?' active':'')+'">' + '<h2 class="indent">'+itemData.taskText+'</h2>';
        HTML += '<div id="slide_'+i+'" class="item'+((i==0)?' active':'')+'">';

        HTML += '<h3 class="columnHeading">'+slideData[i].header+'</h3>';

        for (var j in slideData[i].data) {
            var l = slideData[i].data.length;
            var bsColNum = ((l==1)?'12':((l==2)?'6':((l==3)?'4':'12'))); 
            HTML += '<div class="analysis column col-xs-12 col-md-'+bsColNum+'">'+slideData[i].data[j].analysis+'</div>';
        }

        // HTML += '<div class="clear"></div>';
        
        HTML += '</div>';
    }
    
    console.log("returnCarouselItem2: " + HTML);

    return HTML;
}


// function returnCarouselItem3(jsonData){
function returnCarouselSlide(jsonData){
    console.log("returnCarouselItem2 - jsonData: " + JSON.stringify(jsonData));
    var slideData = jsonData.endSenario.carousel;
    console.log("returnCarouselItem2 - slideData: " + slideData.length);

    var HTML = '';

    // for (var i in slideData){
    for (var i = 0; i < slideData.length; i++) {
        // var HTML = '<div id="question_'+questionNum+'" class="item'+((questionNum==0)?' active':'')+'">' + '<h2 class="indent">'+itemData.taskText+'</h2>';
        HTML += '<div id="slide_'+i+'" class="item'+((i==0)?' active':'')+'">';

        HTML += '<h3 class="columnHeading">'+slideData[i].header+'</h3>';

        // for (var j in slideData[i].data) {
        //     // var l = slideData[i].data.length;
        //     // var bsColNum = ((l==1)?'12':((l==2)?'6':((l==3)?'4':'12'))); 
        //     // HTML += '<div class="analysis column col-xs-12 col-md-'+bsColNum+'">'+slideData[i].data[j].analysis+'</div>';
        //     HTML += returnCarouselItem(j, slideData);
        // }

        HTML += returnCarouselItem(i, slideData);

        // HTML += '<div class="clear"></div>';
        
        HTML += '</div>';
    }
    
    console.log("returnCarouselItem2: " + HTML);

    return HTML;
}

//==============================================================================
//          Datatypes for text, images and video
//==============================================================================
// {
//     "type": "img",
//     "src": "img/06_Elna_Statistisk_aarbog_1920_side_27_js.jpg",
//     "alt": "Lokalt billede..."
// }, {
//     "type": "text",
//     "text": "Mødeindkaldelse ledsaget af artikel skrevet af Louis Pio..."
// }, {
//     "type": "video",
//     "src": "https://player.vimeo.com/video/129639593"
// }
// {   
//     "type" : "columnData",
//     "columnData": [
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
// {   
//     "type" : "columnData",
//     "columnData": [          <-----------------  It takes 1 to N columns: columns 1 to 3 gets their own columns, 4 columns and up stacks in one column.
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
function returnCarouselItem(slideNum, slideData){
    // var itemData = jsonData.endSenario.carousel[slideNum];

    // var HTML = '<div id="question_'+slideNum+'" class="item'+((slideNum==0)?' active':'')+'">' + '<h2 class="indent">'+itemData.taskText+'</h2>';
    var HTML = '<div id="question_'+slideNum+'" class="item'+((slideNum==0)?' active':'')+'">';

    switch(slideData[slideNum].type) {
        case "img":
            HTML += '<img class="img-responsive" src="'+slideData[slideNum].src+'" alt="'+slideData[slideNum].alt+'"/>';
            break;
        case "text":
            HTML += '<div class="TextHolder">'+slideData[slideNum].text+'</div>';
            break;
        case "video":
            HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' + 
                        '<iframe class="embed-responsive-item" src="'+slideData[slideNum].src+'?rel=0" allowfullscreen="1"></iframe>' + 
                    '</div>';
            break;
        case "columnData":
            console.log("SLIDE TEST 1");
            for (var j in slideData[slideNum].columnData) {
                console.log("SLIDE TEST 2");
                var l = slideData[slideNum].columnData.length;
                var bsColNum = ((l==1)?'12':((l==2)?'6':((l==3)?'4':'12'))); 
                HTML += '<div class="analysis column col-xs-12 col-md-'+bsColNum+'">'+slideData[slideNum].columnData[j].column+'</div>';
            }
            break;
        default:
            alert('Invalid "type"');
    }

    HTML += '</div>';
    
    console.log("returnCarouselItem: " + HTML);

    return HTML;
}


function returnCarouseList(jsonData){
    var HTML = '';
    for (n in jsonData){
        HTML += returnCarouselItem2(n, jsonData);
    }

    console.log("returnCarouseList: " + HTML);
    
    return HTML;
}


function returnCarouselHtml(jsonData){
    
    var HTML = '';

    console.log("ReturnQustionHtml - btnHtml: " + HTML);

    HTML += '<div id="questionCarousel" class="carousel slide" data-ride="carousel" data-interval="false">' +
                '<ol class="carousel-indicators">' +
                    returnCarouselIndicators(jsonData) + 
                '</ol>' +
                '<div class="carousel-inner" role="listbox">' +
                    // returnCarouselItem2(jsonData) +
                    returnCarouselSlide(jsonData) + 
                '</div>' +
                '<a class="left carousel-control" href="#questionCarousel" role="button" data-slide="prev">' +
                    '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
                    '<span class="sr-only">Previous</span>' +
                '</a>' +
                '<a class="right carousel-control" href="#questionCarousel" role="button" data-slide="next">' +
                    '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                    '<span class="sr-only">Next</span>' +
                '</a>' +
            '</div>';
    return HTML;
}


function giveCaseFeedback(caseNum){

    console.log("giveCaseFeedback - test");
   
    if (typeof caseCount === 'undefined') {
        window.caseCount = {};
        for (var n in jsonData.qustions){
            caseCount[n] = false;  // Each case is set to false, to indicate that the student has not answered all questions/dropdowns in the case.
        }
    }

    if ($("#UserInterface_"+String(caseNum)+" select").length == 0) {
        caseCount[caseNum] = true;  // All questions/dropdowns has been answered, the caseCount for the caseNum is set to true.

        var count = 0;
        var caseStr = '';
        for (t in caseCount){  // Count the number of unanswered all questions/dropdowns
            if (!caseCount[t]){
                ++count;
            }
        }
        console.log("giveCaseFeedback - count a:" + count);
        if (count > 0){
            caseStr += 'CASE ';
            for (var t in caseCount){
                if (!caseCount[t]){ 
                    --count;
                    caseStr += String(parseInt(t)+1)+((count>=2)?', ':((count==1)?' eller ':''));
                }  
            }
        } else {
            caseStr += "KOMPARATIV ANALYSE";
        }

        var HTML = "";
        HTML += '<h3>Flot - du er færdig med case '+String(parseInt(caseNum)+1)+' </h3>';
        HTML += '<span class="btn btn-lg btn-info GoOn">GÅ TIL '+caseStr+'</span>';

        UserMsgBox("body", HTML);
    }
}


//=======================================================================================
//                  Run code
//=======================================================================================


$(document).ready(function() {

    addCounterToJsonData(jsonData);

    for (var n in jsonData.qustions){
        var JDQD = jsonData.qustions[n].DropDowns
        for (var m in JDQD){
            NumOfQuestions +=  JDQDO = JDQD[m].obj.length;
        }
    } 
    console.log("NumOfQuestions: " + NumOfQuestions);

    $('.QuestionCounter').text(QuestionCounter+' ud af '+NumOfQuestions); // Update the score counter
    
    $("#DataInput").html(returnUserInterface(jsonData)); 

    $("#comparativeAnalysis").addClass("hide"); // Hide the comparative analysis

    console.log("jsonData: " + JSON.stringify(jsonData) );

    $("#header").html(jsonData.userInterface.header);   // Shows the initial heading.
    $("#subHeader").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.
  
    // Check of student answers:
    $( document ).on('change', '.Dropdown', function() {
        console.log("onChange event fired");
        console.log("onChange - $(this).id: " + $(this).prop("id"));
        var JDD = jsonData.DropDowns;
        var JDQ = jsonData.qustions;
        for (var n in JDQ){
            var JDQD = JDQ[n].DropDowns;
            for(var k in JDQD){

                for(var q in JDQD[k].correctAnswer){

                    if (JDQD[k].obj[ q ].id == $(this).prop("id")){  // Find the correct JSON dropdown object...
                        console.log("onChange - JDD[n].header: " + JDQD[k].header);
                        console.log("onChange - $(this).val()): " + $(this).val());

                        if (JDQD[k].obj[ q ].options[JDQD[k].correctAnswer[q]].value == $(this).val()){  // The student gave the correct answer...
                            console.log("onChange - CORRECT ANSWER - n: " + n + ', k: ' + k + ', q: ' + q);
                            // giveFeedback(JDQD[k].feedback[0].posetive, true);  // TLY does not want this...
                            $(this).parent().html(JDQD[k].feedback[q].posetive); // Remove the dropdown and inset text to the student
                            QuestionCounter += 1;
                            $('.QuestionCounter').text(QuestionCounter+' ud af '+NumOfQuestions);
                            if (QuestionCounter == NumOfQuestions){
                                $(".btnEndSenario").removeClass("hide");
                            }

                            giveCaseFeedback(n);

                        } else {                    // The student gave the wrong answer...
                            console.log("onChange - WRONG ANSWER");
                            giveFeedback(JDQD[k].feedback[q].negative, false);
                            ErrorCount += 1;
                            $('.ErrorCount').text(ErrorCount);
                        }

                    }

                }
            }
        }
    });


    $( document ).on('click', ".btnCase", function(event){

        $("#header").html(jsonData.userInterface.header);   // Shows the initial heading.
        $("#subHeader").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.

        $(".PointFeedback").removeClass("hide");

        var index = $(".btnCase").index( this );
        console.log("onClick - index: " + index);
        $(".btnEndSenario").removeClass("btn-primary").addClass("btn-info");
        $(".btnCase").removeClass("btn-primary").addClass("btn-info");
        $(this).addClass("btn-primary").removeClass("btn-info");

        $("#comparativeAnalysis").addClass("hide");
        $(".UserInterface").addClass("hide");
        $("#UserInterface_"+String(index)).removeClass("hide");

    });


    $( document ).on('click', ".btnEndSenario", function(event){
        // UserMsgBox("body", jsonData.endSenario.feedback);

        $("#header").html(jsonData.endSenario.header);   // Shows the comparative analysis heading.
        $("#subHeader").html(jsonData.endSenario.subHeader);    // Shows the comparative columnHeading subheading.

        $(".PointFeedback").addClass("hide");
        $(".UserInterface").addClass("hide");
        $("#comparativeAnalysis").removeClass("hide"); // Unhide the comparative analysis.
        
        $(".btnCase").removeClass("btn-primary").addClass("btn-info");
        $(this).addClass("btn-primary").removeClass("btn-info");

        $("#header_comparativeAnalysis").html(jsonData.endSenario.header);   // Shows the initial heading.
        $("#subHeader_comparativeAnalysis").html(jsonData.endSenario.subHeader);    // Shows the initial subheading.
        $("#content_comparativeAnalysis").html(jsonData.endSenario.content);   // Shows the initial heading.
    });


    $( document ).on('click', ".left", function(event){
        console.log("LEFT - PRESSED");
    });

    $( document ).on('click', ".right", function(event){
        console.log("RIGHT - PRESSED");
    });

});