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
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';

        HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+' class="'+((n%2 == 0)?'cssEven':'cssOdd')+' '+((DOO[n].hasOwnProperty("class"))? DOO[n].class:"")+'"'+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';

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
                        {id:"id3", class:"class3", value:"val 3"}
                    ]
                };
var TDropdown2 = {options:[
                    {value:"val 1"},
                    {value:"val 2"},
                    {value:"val 3"}]
                };
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown)); 
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown2));


function returnBsDropdownMarkup(DropdownObj){
    var Selected = 0;
    var DO = DropdownObj;
    console.log("DO: " + DO);  
    var HTML = '<div'+((DO.hasOwnProperty("id"))?' id="'+DO.id+'"':"")+' class="btn-group'+((DO.hasOwnProperty("class"))?' '+DO.class:'')+'"">';
    
    var DOO = DropdownObj.options;
    HTML +=     '<a href="#" class="btn btn-default btn-sm dropdown-toggle btn-autosize" data-toggle="dropdown">';
                if (DO.hasOwnProperty("selected")){
                    Selected = parseInt( DO.selected );
                } 
                    console.log("returnBsDropdownMarkup - Selected: " + Selected);
                    HTML += '<span class="MenuHeading">';
                    HTML += DOO[Selected].value;
                    HTML += '</span>';
    HTML +=         '<span class="glyphicon glyphicon-chevron-down"></span>';
    HTML +=     '</a>';
    HTML +=     '<ul role="menu" class="dropdown-menu">';
    for (n in DOO){
        if (n != Selected){
            HTML += '<li'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':'')+'><a href="#">'+DOO[n].value+'</a></li>';
        }    
    };
    HTML +=     '</ul>';
    HTML += "</div>";
    return HTML;
}

console.log("returnBsDropdownMarkup: " + returnBsDropdownMarkup(TDropdown));



function elementInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return true 
    }
    return false;
}
console.log("elementInArray - true: " + elementInArray([1,2,3,4,5], 3));
console.log("elementInArray - false: " + elementInArray([1,2,3,4,5], 6));



function ShuffelArray(ItemArray){
    var NumOfItems = ItemArray.length;
    var NewArray = ItemArray.slice();  // Copy the array...
    var Item2; var TempItem1; var TempItem2;
    for (var Item1 = 0; Item1 < NumOfItems; Item1++) {
        Item2 = Math.floor( Math.random() * NumOfItems);
        TempItem1 = NewArray[Item1];
        TempItem2 = NewArray[Item2];
        NewArray[Item2] = TempItem1;
        NewArray[Item1] = TempItem2;
    }
    return NewArray;
}


function returnOrderArray(MyDataArray){
    var Tarray = [];
    for (var n in MyDataArray) {
        Tarray.push(n);
    }
    return Tarray;
}
console.log("returnOrderArray: " +  returnOrderArray([3,1,5,2,8]));



function reorderArray(arrayOrder, MyDataArray){
    var Tarray = [];
    for (var n in arrayOrder) {
        Tarray.push(MyDataArray[arrayOrder[n]]);
    }
    return Tarray;
}
console.log("reorderArray: " +  reorderArray([3,2,4,1,5,0], ["a","b","c","d","e","f"]));


function returnElementNumInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return x 
    }
    return false;
}
console.log("returnElementNumInArray - (returns 2): " + returnElementNumInArray([1,2,3,4,5], 3));
console.log("returnElementNumInArray - false: " + returnElementNumInArray([1,2,3,4,5], 6));


function randomizeJsonData(){
    console.log("randomizeJsonData - jsonData 1: " + JSON.stringify(jsonData));
    for (var i in jsonData.qustions){
        console.log("randomizeJsonData - name: " + jsonData.qustions[i].name);
        for (var j in jsonData.qustions[i].DropDowns){
            console.log("randomizeJsonData - header: " + jsonData.qustions[i].DropDowns[j].header);
            for (var k in jsonData.qustions[i].DropDowns[j].correctAnswer){
                var correctAnswerNum = jsonData.qustions[i].DropDowns[j].correctAnswer[k];      // Contains the "correct answer number"
                var optionsArray = jsonData.qustions[i].DropDowns[j].obj[k].options.slice(1);   // All options in the array except the zero'th element (which is the question to the student).
                console.log("randomizeJsonData - AA correctAnswerNum: " + correctAnswerNum + ", optionsArray: " + JSON.stringify(optionsArray));
                var orderArray = ShuffelArray(returnOrderArray(optionsArray));                  // Creates a random orderArray
                var shuffledOptionsArray = reorderArray(orderArray, optionsArray);              // reorder optionsArray in accordance to the (randomized) orderArray
                console.log("randomizeJsonData - orderArray: " + orderArray + ", shuffledOptionsArray: " + JSON.stringify(shuffledOptionsArray));
                var firstObjElement = jsonData.qustions[i].DropDowns[j].obj[k].options.slice(0,1);   // Find the first element in options
                console.log("randomizeJsonData - firstObjElement: " + JSON.stringify(firstObjElement));
                var newOptionArray = firstObjElement.concat(shuffledOptionsArray);              // Make a new optionArray using the concatenated zero'th element followed by shuffledOptionsArray
                console.log("randomizeJsonData - newOptionArray: " + JSON.stringify(newOptionArray));
                jsonData.qustions[i].DropDowns[j].obj[k].options = newOptionArray;              // Insert the randomized options
                var newCorrectAnswerNum = parseInt(returnElementNumInArray(orderArray, correctAnswerNum-1));  // Find the position of correctAnswerNum (correctAnswerNum-1 because of the missing zero'th element: down-tranformation)
                console.log("randomizeJsonData - AA newCorrectAnswerNum: " + newCorrectAnswerNum + ", typeof(newCorrectAnswerNum): " + typeof(newCorrectAnswerNum));
                jsonData.qustions[i].DropDowns[j].correctAnswer[k] = newCorrectAnswerNum+1;     // Insert the new correct answerNumber (newCorrectAnswerNum+1 because of the added zero'th element: up-tranformation)
            }
        }
    }
    console.log("randomizeJsonData - jsonData 2: " + JSON.stringify(jsonData));
}



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


// IMPORTANT:    <------- THIS FUNCTION DOES NOT WORK IN INTERNET EXPLORER (BUT WORKS IN ALL OTHER BROWSWERS), AND IS THEREFORE NOT IN USE. ANOTHER AND BETTER SOLUTION TO THE PROBLEM HAS BEEN FOUND - SEE LINES 292 AND 293.
// ==========
// targetSelector has to be a class AND _need_ to have col-xs-XX, col-sm-XX, col-md-XX and col-lg-XX as classes - eg.:
//
//          <div class="DropdownContainer col-xs-12 col-sm-6 col-md-4 col-lg-4"> ..... </div>
// 
// - where targetSelector = DropdownContainer. All the sibling targetSelectors need to have a common parent with a (unique) id for the function to work properly.
// 
function setDropdownContainerHeight(targetSelector){
    console.log('setDropdownContainerHeight - FIRED ########################');
    
    // var targetSelectorClassStr = 'AAA BBB col-xs-12 col-sm-6 col-md-4';
    var targetSelectorClassStr = $(targetSelector).prop('class');
    
    console.log('setDropdownContainerHeight - targetSelectorClassStr: ' + targetSelectorClassStr);
    var targetSelectorClassArray = targetSelectorClassStr.split(' ');
    console.log('setDropdownContainerHeight - targetSelectorClassArray: ' + targetSelectorClassArray);

    var idArray = [];
    $( targetSelector ).each(function( index, element ) { // Collect all parent id's of targetSelector
        if (!elementInArray(idArray, $(element).parent().prop('id'))) idArray.push($(element).parent().prop('id'));
    });
    console.log('setDropdownContainerHeight - idArray: ' + idArray);

    for (var q in idArray){

        var numOfChildren = $('#'+idArray[q] + ' ' + targetSelector).length;
        console.log('setDropdownContainerHeight - numOfChildren:' + numOfChildren);

        var colObj = {};
        for (var n in targetSelectorClassArray){  // Insert all bootstrap column classes (col-xs-XX, col-sm-XX, col-md-XX and col-lg-XX) into colObj
            console.log('setDropdownContainerHeight - targetSelectorClassArray['+n+']: ' + targetSelectorClassArray[n]);
            console.log('setDropdownContainerHeight - indexof: ' + targetSelectorClassArray[n].indexOf('col-') + ' - ' + targetSelectorClassArray[n].split('-').length);
            if ((targetSelectorClassArray[n].indexOf('col-') !== -1) && (targetSelectorClassArray[n].split('-').length == 3)){
                var colElements = targetSelectorClassArray[n].split('-');
                colObj[colElements[1]] = colElements[2]; 
            }
        }
        console.log('setDropdownContainerHeight - colObj:' + JSON.stringify(colObj));
        console.log('setDropdownContainerHeight - bootstrapBreakpointSize:' + bootstrapBreakpointSize);

        $('#'+idArray[q] + ' ' +targetSelector).css('height', 'initial');  // IMPORTANT: Reset inline-style containing the height - otherwise the height will be as previously defined by this function.

        if (colObj.hasOwnProperty(String(bootstrapBreakpointSize))) {   // bootstrapBreakpointSize is a global variable that comes from detectBootstrapBreakpoints()
            var numOfTargetSelectorPrRow = Math.round(12/parseInt(colObj[String(bootstrapBreakpointSize)]));
            console.log('setDropdownContainerHeight - numOfTargetSelectorPrRow: ' + numOfTargetSelectorPrRow + ', typeof(numOfTargetSelectorPrRow): ' + typeof(numOfTargetSelectorPrRow));
            var numOfRows = Math.ceil((numOfChildren-1)/numOfTargetSelectorPrRow);
            console.log('setDropdownContainerHeight - numOfRows: ' + numOfRows);

            for (var i = 0; i < numOfRows; i++) {
                console.log("setDropdownContainerHeight - XXXX 1:" + String((i)*numOfTargetSelectorPrRow));
                var maxHeight = 0;
                for (var k = 0; k < numOfTargetSelectorPrRow; k++) {  // Find the heighst targetSelector in the row:
                    console.log("setDropdownContainerHeight - XXXX 2:" + String((i)*numOfTargetSelectorPrRow + k));
                    var Height = $('#'+idArray[q] + ' ' +targetSelector).eq((i)*numOfTargetSelectorPrRow + k).height();
                    if (maxHeight < Height) maxHeight = Height;
                }
                for (var k = 0; k < numOfTargetSelectorPrRow; k++) {  // Make height of all the targetSelectors in the row equal to the heighst targetSelector:
                    $('#'+idArray[q] + ' ' +targetSelector).eq((i)*numOfTargetSelectorPrRow + k).height(maxHeight);
                }
            }
        }
    }
}



function returnUserInterface(jsonData){
    var JDQ = jsonData.qustions;
    var bbs =  bootstrapBreakpointSize;
    var HTML = '';

    // HTML += '<div id="comparativeAnalysis_why">';
    // HTML +=     '<div class="floatLeft '+jsonData.endSenario.whyIconClass+'"></div> <div class="leftColumn floatLeft">' + jsonData.endSenario.whyText + '</div>';
    // HTML +=     '<div class="clear"></div>';
    // HTML += '</div>';
    
    // HTML += explanation(jsonData.endSenario.whyText);
    HTML += ((jsonData.endSenario.hasOwnProperty('whyText') && jsonData.endSenario.whyText != '')?explanation(jsonData.endSenario.whyText):'');

    // Rendering buttons for the user interface:
    HTML += '<div id="btnContainer">';
    for (var n in JDQ){
        HTML += '<span id="btnCase_'+n+'" class="btnCase btn btn-lg btn-'+((n==0)?"primary":"info")+'">'+JDQ[n].name+'</span>';
    }
        HTML += '<span class="btnEndSenario btn btn-lg btn-info hide">'+jsonData.endSenario.btnText+'</span>';  // Den rigtige - AKTIVER!!! 18/12-2015
        // HTML += '<span class="btnEndSenario btn btn-lg btn-info">'+jsonData.endSenario.btnText+'</span>';     // TEST MED TLY  18/12-2015
    HTML += '</div>';

    
    // Rendering the case-senarios for the usrinterface
    for(var n in JDQ){
        HTML += '<div id="UserInterface_'+String(n)+'"class="UserInterface '+((n>0)?"hide":"")+'">';
        HTML +=     '<div class="row">';
        HTML +=         returnSourceItem(JDQ[n].sourceData);
        HTML +=     '</div>';
        var JDQD = JDQ[n].DropDowns;
            for(var k in JDQD){

                // THE FOLLOWING TWO LINES SOLVES THE PROBLEM OF .DropdownContainers NOT BEHAVING AS INTENDED WHEN STACKING.
                HTML += ((k>0) && (k%3==0))?'<div class="clear visible-md-block visible-lg-block"></div>':'';   // This ensures that the "lg" and "md" bootstrap columns "break" at the intended places. If not there the lower "MEDIE" DropdownContainers get pushed down when "SITUATIONEN" get answered. Also the dynamic function created to set the hight of each row of DropdownContainers does not work i all versions of Internet Explorer.
                HTML += ((k>0) && (k%2==0))?'<div class="clear visible-sm-block"></div>':'';   // This ensures that the "sm" bootstrap columns "break" at the intended places. If not there the lower "MEDIE" DropdownContainers get pushed down when "SITUATIONEN" get answered.If not there the lower "MEDIE" DropdownContainers get pushed down when "SITUATIONEN" get answered. Also the dynamic function created to set the hight of each row of DropdownContainers does not work i all versions of Internet Explorer.
                
                // HTML += '<div class="DropdownContainer col-xs-12 col-sm-4 col-md-2"> ';
                // HTML += '<div class="DropdownContainer col-xs-12 col-sm-4 col-md-4"> ';  // Gammel visning til tirsdag d. 27/1-2016
                HTML += '<div class="DropdownContainer col-xs-12 col-sm-6 col-md-4 col-lg-4"> ';  // Gammel visning efter tirsdag d. 27/1-2016
                 
                        HTML += '<span class="DropdownIcon '+JDQD[k].glyphicon+'"></span>';
                        // HTML += JDQD[k].glyphicon;
                        HTML += '<span class="DropdownHeader">'+JDQD[k].header+'</span>';
                        for(var q in JDQD[k].obj){
                            HTML += '<div class="DropdownObj">'+returnDropdownMarkup( JDQD[k].obj[ q ] )+' <span class="ErrMsg"></span> </div> '; // <---- HTML DROPDOWN
                            // HTML += '<div class="DropdownObj">'+returnBsDropdownMarkup( JDQD[k].obj[ q ] )+' <span class="ErrMsg"></span> </div> ';  // <---- BOOTSTRAP DROPDOWN
                        }
                HTML += '</div>';
                

                console.log("returnSearchInterface " + n);
                
            }
        
        HTML += '</div>';
    }

    // Rendering the comparative analysis (danish: "komparativ analyse")
    HTML += '<div id="comparativeAnalysis" class="row">';  //  col-xs-12 col-md-6  <--- Virker ikke!!!
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
                                '<iframe class="embed-responsive-item" src="'+JDQS.src+'?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' + 
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


function giveFeedback(feedbackMsg, correctAnswer, callBack){
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

    callBack();
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
        HTML += '<div id="slide_'+i+'" class="'+((i==0)?' active':'')+'">';

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
    var HTML = '<div id="question_'+slideNum+'" class="question item'+((slideNum==0)?' active':'')+'">';

    switch(slideData[slideNum].type) {
        case "img":
            HTML += '<img class="img-responsive" src="'+slideData[slideNum].src+'" alt="'+slideData[slideNum].alt+'"/>';
            break;
        case "text":
            HTML += '<div class="TextHolder">'+slideData[slideNum].text+'</div>';
            break;
        case "video":
            HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' + 
                        '<iframe class="embed-responsive-item" src="'+slideData[slideNum].src+'?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' + 
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

    HTML += '<div id="questionCarousel" class="carousel slide col-xs-12 col-md-8" data-ride="carousel" data-interval="false">' +
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

    window.lowestUnansweredCaseStr = 'UserInterface_';
    window.lowestUnansweredCaseNum = 0;

    console.log("giveCaseFeedback - caseNum: " + caseNum);
   
    if (typeof caseCount === 'undefined') {
        window.caseCount = {};
        for (var n in jsonData.qustions){
            caseCount[n] = false;  // Each case is set to false, to indicate that the student has not answered all questions/dropdowns in the case.
        }
    }

    // if ($("#UserInterface_"+String(caseNum)+" select").length == 0) {    // <-------   HTML DROPDOWNS
    if ($("#UserInterface_"+String(caseNum)+" .Dropdown").length == 0) {    // <-------   BOOTSRAP DROPDOWNS
        caseCount[caseNum] = true;  // All questions/dropdowns has been answered, the caseCount for the caseNum is set to true.

        var count = 0;
        var caseStr = '';
        var TEMP = 10000;
        console.log("giveCaseFeedback - TEMP 1: " + TEMP);
        for (t in caseCount){  // Count the number of unanswered all questions/dropdowns
            if (!caseCount[t]){
                ++count;
                if (t < TEMP){
                    TEMP = t;
                }
            }
        }
        console.log("giveCaseFeedback - count a:" + count);

        console.log("giveCaseFeedback - TEMP 2: " + TEMP);
        
        // THIS WORKS!!! But TLY + MAM wants the student to be send to the lowest unanswered page - which is why it is commented out.
        // if (count > 0){
        //     caseStr += 'CASE ';
        //     for (var t in caseCount){
        //         if (!caseCount[t]){ 
        //             --count;
        //             caseStr += String(parseInt(t)+1)+((count>=2)?', ':((count==1)?' eller ':''));
        //         }  
        //     }
        // } else {
        //     caseStr += "KOMPARATIV ANALYSE";
        // }

        if (count > 0){
            lowestUnansweredCaseNum = ((TEMP == 10000)? 1 : TEMP);
            caseStr += 'CASE ' + String(parseInt(lowestUnansweredCaseNum)+1);
            lowestUnansweredCaseStr = 'UserInterface_'+String(lowestUnansweredCaseNum);
        } else {
            // caseStr += "KOMPARATIV ANALYSE";
            caseStr += "PERSPEKTIVERING";
            lowestUnansweredCaseStr = 'comparativeAnalysis';

            // $(".explanation").removeClass("hide"); // Unhide the explanation text.
        }

        var HTML = "";
        HTML += '<h3>Flot - du er færdig med case '+String(parseInt(caseNum)+1)+' </h3>';
        HTML += '<span class="btn btn-lg btn-info GoOnToNextCase">GÅ TIL '+caseStr+'</span>';

        UserMsgBox("body", HTML);
    }
}


function setDropDownTextWidth(targetSelector) {

    console.log("setDropDownTextWidth - targetSelector.length: " + '#Dropdown_0a'.length);

    // var Width = $('#Dropdown_0a').width();

    // var text = $('#Dropdown_0a').text();
    // console.log('setDropDownTextWidth - targetSelector id: ' + $('#Dropdown_0a').prop('id') + ', Width: ' + Width);

    // var newText = '<span id="FirstLetter">'+text.slice(0,1)+'</span>'+text.slice(1);
    // $('#Dropdown_0a').html(newText);  // Replace text with newText
    // console.log('setDropDownTextWidth - newText: ' + newText);

    // var letterWidth = $('#FirstLetter').width(); // Mesure the width of the first letter in px
    // console.log('setDropDownTextWidth - letterWidth: ' + letterWidth);

    // $('#Dropdown_0a').html(text);  // Replace newText with text

    Width = 200;
    letterWidth = 8;

    var maxNumOfChars = Math.floor(Width/letterWidth);  // Max number of characters
    console.log('setDropDownTextWidth - maxNumOfChars: ' + maxNumOfChars);
    
    
    $( targetSelector ).each(function( index, element ) {

        console.log("setDropDownTextWidth - index: " + index);

        

        //////////

        var text = $(element).text(); 

        var wordArray = text.split(" ");

        var Tstr = '';
        var str = '';
        for (var n in wordArray){
            Tstr += wordArray[n] + ' ';

            if (n > 0) {
                if (Tstr.length >= maxNumOfChars) {            
                    str += wordArray[n-1] + ' <br/>';
                    Tstr = '';
                } else {
                    str += wordArray[n-1] + ' ';
                }
            }
        }

        str += wordArray[wordArray.length-1]; // Add the last word.

        console.log('setDropDownTextWidth - str: ' + str);

        $(element).html(str);
        // $(element).html(text);

    });

}


function detectBootstrapBreakpoints(){
    if (typeof(bootstrapBreakpointSize) === 'undefined') {
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize defined.');
        window.bootstrapBreakpointSize = null;
    }

    $(document).ready(function() {
        console.log('detectBootstrapBreakpoints - document.ready.');
        $('body').append('<div id="bootstrapBreakpointWrapper"> <span class="visible-xs-block"> </span> <span class="visible-sm-block"></span> <span class="visible-md-block"> </span> <span class="visible-lg-block"> </span> </div>');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize);
    });

    $(window).on('resize', function () {
        console.log('detectBootstrapBreakpoints - window.resize.');
        bootstrapBreakpointSize = $( "#bootstrapBreakpointWrapper>span:visible" ).prop('class').split('-')[1];
        console.log('detectBootstrapBreakpoints - bootstrapBreakpointSize: ' + bootstrapBreakpointSize + ', typeof(bootstrapBreakpointSize): ' + typeof(bootstrapBreakpointSize));
    });
}


//=======================================================================================
//                  Run code
//=======================================================================================


$(window).resize(function() {
    // setDropdownContainerHeight('.DropdownContainer');

});


detectBootstrapBreakpoints();  // This function call has to be here, due to the use of $(document).ready() and $(window).resize() inside the function.


$(document).ready(function() {

    randomizeJsonData();

    addCounterToJsonData(jsonData);

    // detectBootstrapBreakpoints();

    for (var n in jsonData.qustions){
        var JDQD = jsonData.qustions[n].DropDowns
        for (var m in JDQD){
            NumOfQuestions +=  JDQDO = JDQD[m].obj.length;
        }
    } 
    console.log("NumOfQuestions: " + NumOfQuestions);

    $('.QuestionCounter').text(QuestionCounter+' ud af '+NumOfQuestions); // Update the score counter
    
    $("#DataInput").html(returnUserInterface(jsonData)); 
    $("#instruktionContainer").html(instruction(jsonData.userInterface.subHeader));

    // setDropdownContainerHeight('.DropdownContainer');

    // setDropDownTextWidth(".Dropdown option");   // VIRKER IKKE !!!

    $("#comparativeAnalysis").addClass("hide"); // Hide the comparative analysis
    // $("#comparativeAnalysis_why").addClass("hide"); // Hide the explanation text
    $(".explanation").addClass("hide"); // Hide the explanation text
    // explanation

    console.log("jsonData: " + JSON.stringify(jsonData) );

    $("#header").html(jsonData.userInterface.header);   // Shows the initial heading.
    $("#subHeader").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.
    $(".instructionText").html(jsonData.userInterface.subHeader);
  
    // HTML DROPDOWN - Check of student answers:
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

                        // VERY IMPORTANT: 
                        // ===============
                        // The JSON data for the option-tags cannot contain interpreted HTML char like "&quot;" due to the matching of values in the if-clause below!!!
                        if (JDQD[k].obj[ q ].options[JDQD[k].correctAnswer[q]].value == $(this).val()){  // The student gave the correct answer...
                            console.log("onChange - CORRECT ANSWER - n: " + n + ', k: ' + k + ', q: ' + q );

                            var id = $(this).closest(".UserInterface").prop('id');
                            
                            $(this).parent().html(JDQD[k].feedback[q].posetive); // Remove the dropdown and inset text to the student
                            QuestionCounter += 1;
                            $('.QuestionCounter').text(QuestionCounter+' ud af '+NumOfQuestions);
                            if (QuestionCounter == NumOfQuestions){
                                $(".btnEndSenario").removeClass("hide");
                            }

                            if ($('#'+id+' .Dropdown').length > 0) {  // Only if there are more ".Dropdown" in the case, then:
                                // giveFeedback(JDQD[k].feedback[0].posetive, true, function(n) {  // <----------  CALLBACK FUNKTIONEN FUNGERE IKKE EFTER HENSIGTEN!!!
                                giveFeedback(JDQD[k].feedback[q].posetive, true, function(n) {  // <----------  CALLBACK FUNKTIONEN FUNGERE IKKE EFTER HENSIGTEN!!!
                                    // console.log('.Dropdown - giveFeedback - id: ' + id +'  ' + $('#'+id+' .Dropdown').length);
                                    // if ($('#'+id+' .Dropdown').length == 0) {  // Only if there are NO more ".Dropdown" in the case, then:
                                    //     $('.MsgBox_bgr').unbind('click');
                                    //     $('#UserMsgBox').unbind('click');
                                    //     $('.MsgBox_bgr').addClass('UserMsgBox_click');
                                    //     $('#UserMsgBox').addClass('UserMsgBox_click');
                                    //     $( document ).on('click', ".UserMsgBox_click", function(n){
                                    //         $(".UserMsgBox_click").fadeOut(200, function(n) {
                                    //             $(this).remove();
                                    //             console.log('onChange - n:');
                                    //             setTimeout(function(n){ giveCaseFeedback(n); }, 500);
                                    //         });
                                    //         // giveCaseFeedback(n);
                                    //     });
                                    // }
                                });  // TLY does not want this... 
                            } else {   // else give 
                                giveCaseFeedback(n);
                            }

                            // setDropdownContainerHeight('.DropdownContainer');

                        } else {                    // The student gave the wrong answer...
                            console.log("onChange - WRONG ANSWER");
                            // giveFeedback(JDQD[k].feedback[q].negative, false);  // Rettelse d. 1/2-2016 - brugertest i klasse har vist at kursisterne ikke ønsker at få svaret presenteret. Nedenstående svar gives istedet:
                            giveFeedback('Du har svaret <i>&quot;'+$(this).val()+'&quot;</i>, men det er ikke det korrekte svar.', false, function(){});
                            ErrorCount += 1;
                            $('.ErrorCount').text(ErrorCount);
                        }
                    }
                }
            }
        }
    });

    // BOOTSTRAP DROPDOWN - Check of student answers:
    $( document ).on('click', ".btn-group ul a", function(event){
        console.log("click event fired");
        event.preventDefault();  // Forhindre at anchor-tag'et sender brugeren til "href".
        console.log("onChange - $(this).id: " + $(this).prop("id"));
        var JDD = jsonData.DropDowns;
        var JDQ = jsonData.qustions;
        for (var n in JDQ){
            var JDQD = JDQ[n].DropDowns;
            for(var k in JDQD){

                for(var q in JDQD[k].correctAnswer){

                    if (JDQD[k].obj[ q ].id == $(this).closest('.btn-group').prop("id")){  // Find the correct JSON dropdown object...
                        console.log("onChange - JDD[n].header: " + JDQD[k].header);
                        console.log("onChange - $(this).val()): " + $(this).text());

                        if (JDQD[k].obj[ q ].options[JDQD[k].correctAnswer[q]].value == $(this).text()){  // The student gave the correct answer...
                            console.log("onChange - CORRECT ANSWER - n: " + n + ', k: ' + k + ', q: ' + q);
                            // giveFeedback(JDQD[k].feedback[0].posetive, true);  // TLY does not want this...
                            $(this).closest('.DropdownObj').html(JDQD[k].feedback[q].posetive); // Remove the dropdown and inset text to the student
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


    $( document ).on('click', ".GoOnToNextCase", function(event){
        console.log("GoOnToNextCase - PRESSED");

        $(".btnEndSenario").removeClass("btn-primary").addClass("btn-info");    // Reset comparativeAnalysis / btnEndSenario
        $(".btnCase").removeClass("btn-primary").addClass("btn-info");          // Reset btnCase

        if (lowestUnansweredCaseStr == 'comparativeAnalysis'){  // If all cases are answered...
            $('.UserInterface').addClass('hide');
            $('#comparativeAnalysis').removeClass('hide');

            $('.btnEndSenario').addClass("btn-primary").removeClass("btn-info");

            $(".explanation").removeClass("hide"); // Unhide the explanation text.

        } else {                                                // If all cases are NOT answered...
            $('.UserInterface').addClass('hide');
            $('#'+lowestUnansweredCaseStr).removeClass('hide');

            $('#btnCase_'+lowestUnansweredCaseNum).addClass("btn-primary").removeClass("btn-info");
        }

        // setDropdownContainerHeight('.DropdownContainer');
    });


    $( document ).on('click', ".btnCase", function(event){

        $("#header").html(jsonData.userInterface.header);   // Shows the initial heading.
        $("#subHeader").html(jsonData.userInterface.subHeader);    // Shows the initial subheading.
        $(".instructionText").html(jsonData.userInterface.subHeader);

        $(".PointFeedback").removeClass("hide");

        var index = $(".btnCase").index( this );
        console.log("onClick - index: " + index);
        $(".btnEndSenario").removeClass("btn-primary").addClass("btn-info");
        $(".btnCase").removeClass("btn-primary").addClass("btn-info");
        $(this).addClass("btn-primary").removeClass("btn-info");

        $("#comparativeAnalysis").addClass("hide");
        // $("#comparativeAnalysis_why").addClass("hide");
        $(".explanation").addClass("hide"); // Hide the explanation text
        $(".UserInterface").addClass("hide");  // Unhide the explanation text
        $("#UserInterface_"+String(index)).removeClass("hide");

        // setDropdownContainerHeight('.DropdownContainer');
    });


    $( document ).on('click', ".btnEndSenario", function(event){
        // UserMsgBox("body", jsonData.endSenario.feedback);

        $("#header").html(jsonData.endSenario.header);   // Shows the comparative analysis heading.
        $("#subHeader").html(jsonData.endSenario.subHeader);    // Shows the comparative columnHeading subheading.
        $(".instructionText").html(jsonData.endSenario.subHeader);

        $(".PointFeedback").addClass("hide");
        $(".UserInterface").addClass("hide");
        $("#comparativeAnalysis").removeClass("hide"); // Unhide the comparative analysis.
        // $("#comparativeAnalysis_why").removeClass("hide"); //Unhide the explanation text
        $(".explanation").removeClass("hide"); // Unhide the explanation text
        
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


    /////////////////////////    TEST    /////////////////////////


    // $("#DataInput").append(returnBsDropdownMarkup(TDropdown));
    

});