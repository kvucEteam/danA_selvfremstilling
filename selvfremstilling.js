var jsonData = "<h1>OK</h1>";

var NumOfQuestions = 0;
var QuestionCounter = 0;
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


// function returnSearchInterface(jsonData){
//     var JDD = jsonData.DropDowns;
//     var HTML = '<div id="DropDownInterface">';
//     // HTML += '<input id="SearchText" type="text" placeholder="Skriv dine søgeord her..." /> <span class="ErrMsg"></span> <br/>';
//     HTML += returnSourceItem(jsonData);
//     for(var n in JDD){
//         HTML += '<div class="DropdownContainer"> ';
//             HTML += '<div class="DropdownIcon '+JDD[n].glyphicon+'"></div>';
//             HTML += '<div class="DropdownHeader">'+JDD[n].header+'</div>';
//             HTML += '<span class="DropdownObj">'+returnDropdownMarkup(JDD[n].obj)+' <span class="ErrMsg"></span> </span> ';
//         HTML += '</div>';
//         console.log("returnSearchInterface " + n);
//     }
//     HTML += '</div>';
//     return HTML;
// }


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
        HTML += '<span class="btnEndSenario btn btn-info hide">'+jsonData.endSenario.btnText+'</span>';
    HTML += '</div>';
    
    // Rendering the case-senarios for the usrinterface
    for(var n in JDQ){
        HTML += '<div id="UserInterface_'+String(n)+'"class="UserInterface '+((n>0)?"hide":"")+'">';
        HTML += returnSourceItem(JDQ[n].sourceData);
        var JDQD = JDQ[n].DropDowns;
        for(var k in JDQD){
            HTML += '<div class="DropdownContainer col-xs-12 col-sm-4 col-md-2"> ';
                HTML += '<div class="DropdownIcon '+JDQD[k].glyphicon+'"></div>';
                // HTML += JDQD[k].glyphicon;
                HTML += '<div class="DropdownHeader">'+JDQD[k].header+'</div>';
                HTML += '<span class="DropdownObj">'+returnDropdownMarkup( JDQD[k].obj[ JDQD[k].counter ] )+' <span class="ErrMsg"></span> </span> ';
            HTML += '</div>';
            console.log("returnSearchInterface " + n);
        }
        HTML += '</div>';
    }

    // Rendering the comparative analysis (danish: "komparativ analyse")
    HTML += '<div id="comparativeAnalysis">';
    HTML +=     '<h1 id="header_comparativeAnalysis">'+jsonData.endSenario.header+'</h1>';
    HTML +=     '<h4 id="subHeader_comparativeAnalysis">'+jsonData.endSenario.subHeader+'</h4>';
    HTML +=     '<h4 id="content_comparativeAnalysis">'+jsonData.endSenario.content+'</h4>';
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
            HTML += '<div class="ImgHolder SourceWrapper col-xs-12 col-md-12"> <img class="img-responsive SourceImg" src="'+JDQS.src+'" alt="'+JDQS.alt+'"/> </div>';
            break;
        case "text":
            HTML += '<div class="TextHolder SourceWrapper col-xs-12 col-md-12">'+JDQS.text+'</div>';
            break;
        case "video":
            HTML += '<div class="VidHolder SourceWrapper embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' + 
                        '<iframe class="embed-responsive-item" src="'+JDQS.src+'?rel=0" allowfullscreen="1"></iframe>' + 
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



$(document).ready(function() {
// $(window).load(function() {

    addCounterToJsonData(jsonData);

    for (var n in jsonData.qustions){
        NumOfQuestions += jsonData.qustions[n].DropDowns.length;
    } 
    console.log("NumOfQuestions: " + NumOfQuestions);

    $('.QuestionCounter').text(QuestionCounter+'/'+NumOfQuestions); // Update the score counter
    
    // $("#DataInput").html(returnSearchInterface(jsonData));  // Insert carousel HTML
    $("#DataInput").html(returnUserInterface(jsonData)); 

    $("#comparativeAnalysis").addClass("hide"); // Hide the comparative analysis

    console.log("jsonData: " + JSON.stringify(jsonData) );

    $("#header").html(jsonData.userInterface.header);   // Shows the initial heading.
    $("#subHeader").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.

    
    // console.log("returnSearchInterface: " + returnSearchInterface(jsonData));

    
    // $('.Dropdown').on('change', function() {
    $( document ).on('change', '.Dropdown', function() {
        console.log("onChange event fired");
        console.log("onChange - $(this).id: " + $(this).prop("id"));
        var JDD = jsonData.DropDowns;
        var JDQ = jsonData.qustions;
        // for (var n in JDD){
        for (var n in JDQ){
            var JDQD = JDQ[n].DropDowns;
            for(var k in JDQD){
                if (JDQD[k].obj[ JDQD[k].counter ].id == $(this).prop("id")){  // Find the correct JSON dropdown object...
                    console.log("onChange - JDD[n].header: " + JDQD[k].header);
                    console.log("onChange - $(this).val()): " + $(this).val());
                    if(JDQD[k].correctAnswer.length > 1){ // If there is MORE than one correct answer...
                        // 
                        // We might want MORE than one correct answer - this logic goes here...
                        //
                        // NOTER:
                        //      - Anvend koden for eet korrekt svar som skabelon
                        //      - Indsæt en for-loop for hver ".obj" JSON-dropdown-data. 
                        //      - Anvend et ".anwsered = true" objekt i JSON-dataet for ".obj" JSON-dropdown-dat, for at afgøre om der er svaret korrekt på en dropdown.
                        //      - KONVENTION: 
                        //          + antallet af correctAnswer elementer i arrayet afgør antallet af dropdowns.
                        //          + hvis der kun er een ".obj" JSON-dropdown-data, men flere correctAnswer elementer, så genbruges den ene ".obj" JSON-dropdown-data i alle dropdowns.
                        //          + hvis der er flere ".obj" JSON-dropdown-data, så skal der være lige så mange correctAnswer elementer, og de bruges par vis.
                        //

                        console.log("onChange - correctAnswer");

                        if (JDQD[k].obj.length > 1){
                            console.log("onChange - OBJ 1");
                        } else {
                            console.log("onChange - OBJ 2");

                            // if (JDQD[k].obj.options[JDQD[k].correctAnswer[0]].value == $(this).val()){  // The student gave the correct answer...
                            //     console.log("onChange - CORRECT ANSWER");
                            //     // giveFeedback(JDQD[k].feedback[0].posetive, true);  // TLY does not want this...
                            //     $(this).parent().html(JDQD[k].feedback[0].posetive); // Remove the dropdown and inset text to the student
                            //     QuestionCounter += 1;
                            //     $('.QuestionCounter').text(QuestionCounter+'/'+NumOfQuestions);
                            //     if (QuestionCounter == NumOfQuestions){
                            //         $(".btnEndSenario").removeClass("hide");
                            //     }
                            // } else {                    // The student gave the wrong answer...
                            //     console.log("onChange - WRONG ANSWER");
                            //     giveFeedback(JDQD[k].feedback[0].negative, false);
                            //     ErrorCount += 1;
                            //     $('.ErrorCount').text(ErrorCount);
                            // }
                        }

                    } else { // If there is ONE correct answer...
                        if (JDQD[k].obj[ JDQD[k].counter ].options[JDQD[k].correctAnswer[0]].value == $(this).val()){  // The student gave the correct answer...
                            console.log("onChange - CORRECT ANSWER");
                            // giveFeedback(JDQD[k].feedback[0].posetive, true);  // TLY does not want this...
                            $(this).parent().html(JDQD[k].feedback[0].posetive); // Remove the dropdown and inset text to the student
                            QuestionCounter += 1;
                            $('.QuestionCounter').text(QuestionCounter+'/'+NumOfQuestions);
                            if (QuestionCounter == NumOfQuestions){
                                $(".btnEndSenario").removeClass("hide");
                            }
                        } else {                    // The student gave the wrong answer...
                            console.log("onChange - WRONG ANSWER");
                            giveFeedback(JDQD[k].feedback[0].negative, false);
                            ErrorCount += 1;
                            $('.ErrorCount').text(ErrorCount);
                        }
                    }


                    // // TEST:
                    // if (JDQD[k].obj[ JDQD[k].counter ].options[JDQD[k].correctAnswer[0]].value == $(this).val()){  // The student gave the correct answer...
                    //         console.log("onChange - CORRECT ANSWER");
                    //         // giveFeedback(JDQD[k].feedback[0].posetive, true);  // TLY does not want this...
                    //         $(this).parent().html(JDQD[k].feedback[0].posetive); // Remove the dropdown and inset text to the student
                    //         QuestionCounter += 1;
                    //         $('.QuestionCounter').text(QuestionCounter+'/'+NumOfQuestions);
                    //         if (QuestionCounter == NumOfQuestions){
                    //             $(".btnEndSenario").removeClass("hide");
                    //         }
                    //     } else {                    // The student gave the wrong answer...
                    //         console.log("onChange - WRONG ANSWER");
                    //         giveFeedback(JDQD[k].feedback[0].negative, false);
                    //         ErrorCount += 1;
                    //         $('.ErrorCount').text(ErrorCount);
                    //     }



                }
            }
        }
    });


    $( document ).on('click', ".btnCase", function(event){
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

        $(".UserInterface").addClass("hide");
        $("#comparativeAnalysis").removeClass("hide"); // Hide the comparative analysis
        
        $(".btnCase").removeClass("btn-primary").addClass("btn-info");
        $(this).addClass("btn-primary").removeClass("btn-info");

        $("#header_comparativeAnalysis").html(jsonData.userInterface.header);   // Shows the initial heading.
        $("#subHeader_comparativeAnalysis").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.
        $("#content_comparativeAnalysis").html(jsonData.userInterface.header);   // Shows the initial heading.
    });


    ///////////////////////////////////////////////////


    // $("#id_description_iframe").contents().find("body").html()


});