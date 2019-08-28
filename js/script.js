/******************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
******************************************/

$(document).ready(function () {

    // SECTION 1 -  PUT THE FIRST FIELD IN FOCUS STATE

    $("#name").focus();

    // SECTION 2 - ADD AN "OTHER" OPTION TO THE JOB ROLE SECTION

    $('#other-title').hide();

    let lastValue = $('#title option:last-child').val();

    $('#title').change(function () {
        if ($(this).val() == 'other') {
            $('#other-title').show('slow');
        } else {
            $('#other-title').hide('slow');
        }
    }); 


    // SECTION 3 - T-Shirt 

    $("#design option").eq(0).hide();

    let izeroandione = [];
    $.each($("#design option"), function (index, element) {
        izeroandione.push(element);
    });
    
    if($("#design option").eq(0)[0]["selected"] == true) {
        $("#colors-js-puns").hide();
    }
    
    let jscolors = [];
    let punscolors = [];

    $("#color").prepend($("<option value='selectanswer'>Please select a T-shirt theme</option>"));
    $("#color option[value='selectanswer']")[0]["selected"] = true;

    // Storing and Hiding Color Elements
    $.each($("#color option"), function (index, element) {
        if (index <= 3) {
            $(element)[0]["selected"] = false;
            $(element).hide();
            jscolors.push($(element));
        }
        if (index >= 4) {
            $(element).hide();
            punscolors.push($(element));
        }
    });


    $("#design").change(function (e) {
        if (e.target.value == "js puns") {
            $("#colors-js-puns").show("slow");
            $("#color option[value='selectanswer']").remove();
            $.each(jscolors, function (index, element) {
                if (element[0]["textContent"] == "Cornflower Blue (JS Puns shirt only)") {
                    element[0]["selected"] = true;
                } else {
                    element[0]["selected"] = false;
                }
                element.show();
            });
            $.each(punscolors, function (index, element) {
                element.hide();
            });
        }

        if (e.target.value == "heart js") {
            $("#colors-js-puns").show("slow");
            $("#color option[value='selectanswer']").remove();
            $.each(jscolors, function (index, element) {
                element.hide();
            });
            $.each(punscolors, function (index, element) {
                if (element[0]["value"] == "tomato") {
                    element[0]["selected"] = true;
                } else {
                    element[0]["selected"] = false;
                }
                element.show();
            });
        }
    });

    let activityCost = 0;
    let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");
    $(".activities").append(totalCost);

    //EVENT-LISTENER
    $(".activities label").change(function (event) {
        let startIndex = $(this).text().indexOf("$");
        let intoString = String($(this).text());
        let lastNumInd = 0;
        let theNumber = '';
        let createInt = [];

        let activity_obj = {
            //checked and unchecked
            input_multi: [[], []],
            // checked and unchecked
            days_multi: [[], []],
            // checked and unchecked
            times_multi: [[], []],
            // checked and unchecked
            timeandday: [[], []],
            // (0) checked day/time (1)unchecked day/time
            // (2) checked tues element (3)unchecked tues element
            // (4) disabled
            tuesdayelements: [[], [], [], [], ]
        }

        /*
        For loop below will start from the dollar sign index within the string. For example if we click on the activity that
        has its text set as `Main Conference — $200` we should start the for loop at index 19 within the string and will end until
        it reaches the length of the string - 1 which is 23 - 1 = 22.

         M a i n
         0 1 2 3 4

         C o n f e r  e  n  c  e
         5 6 7 8 9 10 11 12 13 14 15

         —  -
         16 17 18

         $  2  0  0
         19 20 21 22

        Once inside the for loop there is a condition checking if the text can be parsed into an Integer and if that holds true first push
        the integer into the createInt array. Then since the for loop will iterate till the end of the text it will keep looking for the last
        character that can be parsed into an Integer and that will be stored into the lastNumInd variable.

        */

        for (let i = startIndex; i <= intoString.length - 1; i++) {
            if (Number.isInteger(parseInt(intoString[i]))) {
                createInt.push(parseInt(intoString[i]));
                lastNumInd = i;
            }
        }

        /*
        For loop below will iterate through the array createInt which contains the integers of the activity cost
        and will turn each index that is currently an integer into a string and concatenate the number into a variable
        called theNumber.
        */

        for (let i = 0; i < createInt.length; i++) {
            theNumber += createInt[i].toString();
        }

        // This if statement is checking if element has been checked and if so will add to variable activityCost
        if ($(this)[0]["firstChild"]["checked"] == true) {
            activityCost += parseInt(theNumber);
        }

        // This if statement is checking if element has been checked and if so will substract from variable activityCost
        if ($(this)[0]["firstChild"]["checked"] == false) {
            activityCost -= parseInt(theNumber);
        }

        $("#updateCost").text(activityCost)

  
        $(".activities label").each(function (index, element) {
            if ($(element)[0]["firstChild"]["checked"]) {
                activity_obj["input_multi"][0].push($(element));
            } else {
                activity_obj["input_multi"][1].push($(element));
            }
        }); 

        // SECTION 4 - FINDING THE DAY AND TIME AND FIXING CONFLICTING ACTIVITIES

        $.each(activity_obj["input_multi"][0], function (index, element) {
            let checkedDay = '';
            let index_for_day = $(element).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]) + 2;
            let checkedTime = '';
            let index_to_get_time = '';
            let turn_chars_into_day = [];
            let time_in_chars = [];
            let comma_index = $(element).text().indexOf(",");

            for (let i = index_for_day; i < $(element).text().length; i++) {
                if ($(element).text()[i] != " ") {
                    turn_chars_into_day.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            for (let i = 0; i < turn_chars_into_day.length; i++) {
                checkedDay += turn_chars_into_day[i];
            }

            activity_obj["days_multi"][0].push(String(checkedDay));

            for (let i = comma_index - 1; i > index_for_day; i--) {
                if ($(element).text()[i] != " ") {
                    time_in_chars.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            checkedTime = time_in_chars.reverse().join("");

            if (checkedDay == "Tuesday") {
                activity_obj["tuesdayelements"][0].push(String(checkedDay) + " " + String(checkedTime));
                activity_obj["tuesdayelements"][2].push(element);
            }


            activity_obj["times_multi"][0].push(String(checkedTime));

            activity_obj["timeandday"][0].push(String(checkedDay) + " " + String(checkedTime));

        }); // FOR LOOP FOR CHECKED ACTIVITIES


        // FOR LOOP FOR UNCHECKED ACTIVITIES
        $.each(activity_obj["input_multi"][1], function (index, element) {
            let unchecked_day = '';
            let index_for_day_un = $(element).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]) + 2;
            let uncheckedTime = '';
            let index_to_get_time_un = '';
            let turn_chars_into_day_ = [];
            let time_in_chars_un = [];
            let comma_index_ = $(element).text().indexOf(",");

            for (let i = index_for_day_un; i < $(element).text().length; i++) {
                if ($(element).text()[i] != " ") {
                    turn_chars_into_day_.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            for (let i = 0; i < turn_chars_into_day_.length; i++) {
                unchecked_day += turn_chars_into_day_[i];
            }

            activity_obj["days_multi"][1].push(String(unchecked_day));



            for (let i = comma_index_ - 1; i > index_for_day_un; i--) {
                if ($(element).text()[i] != " ") {
                    time_in_chars_un.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            uncheckedTime = time_in_chars_un.reverse().join("");

            if (unchecked_day == "Tuesday") {
                activity_obj["tuesdayelements"][1].push(String(unchecked_day) + " " + String(uncheckedTime));
                activity_obj["tuesdayelements"][3].push(element);
            }


            activity_obj["times_multi"][1].push(String(uncheckedTime));
            activity_obj["timeandday"][1].push(String(unchecked_day) + " " + String(uncheckedTime));

        });

        if (activity_obj["tuesdayelements"][0].length == 2) {
            $.each(activity_obj["tuesdayelements"][0], function (ind, elem) {
                activity_obj["tuesdayelements"][3][ind][0]["firstChild"]["disabled"] = true;
            });
        }

        if (activity_obj["tuesdayelements"][0].length == 1) {
            $.each(activity_obj["tuesdayelements"][0], function (ind, elem) {
                $.each(activity_obj["tuesdayelements"][1], function (i, ele) {
                    if (elem == ele) {

                        activity_obj["tuesdayelements"][3][i][0]["firstChild"]["disabled"] = true;
                    }
                    if (elem != ele) {
                        activity_obj["tuesdayelements"][3][i][0]["firstChild"]["disabled"] = false;
                    }
                });
            });
        }

        if (activity_obj["tuesdayelements"][0].length == 0) {
            $.each(activity_obj["tuesdayelements"][3], function (ind, elem) {
                activity_obj["tuesdayelements"][3][ind][0]["firstChild"]["disabled"] = false;
            });
        }
    }); // END OF EVENT LISTENER FOR $(".activities label").change(function(event) {


    // SECTION 4 - PAYMENT INFO SECTION

    let values = $("#payment option");
    values[0]["hidden"] = true;
    values[0]["selected"] = false;
    values[1]["selected"] = true;
    let allDivs = $("div");
    // Bitcoin
    console.log($(allDivs[allDivs.length - 1])[0]);

    // Paypal
    console.log($(allDivs[allDivs.length - 2])[0]);

    $(allDivs[allDivs.length - 1])[0]["hidden"] = true;
    $(allDivs[allDivs.length - 2])[0]["hidden"] = true;

    let selectedPayment = [];
    $("#payment").change(function (e) {
        if (e.target.value == "paypal") {
            selectedPayment.push(e.target.value);
            $(allDivs[allDivs.length - 1])[0]["hidden"] = true;
            $(allDivs[allDivs.length - 2])[0]["hidden"] = false;
            $("#credit-card").hide("slow");
        }
        if (e.target.value == "bitcoin") {
            selectedPayment.push(e.target.value);
            $(allDivs[allDivs.length - 2])[0]["hidden"] = true;
            $(allDivs[allDivs.length - 1])[0]["hidden"] = false;
            $("#credit-card").hide("slow");
        }
        if (e.target.value == "credit card") {
            selectedPayment.push(e.target.value);
            $(allDivs[allDivs.length - 1])[0]["hidden"] = true;
            $(allDivs[allDivs.length - 2])[0]["hidden"] = true;
            $("#credit-card").show("slow");
        }
        console.log("selected payment", selectedPayment);
    });
    console.log("selected payment length", selectedPayment.length);



    // SECTION 5 - FORM VALIDATION

    //const nameregex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const nameregex = /^[A-Z]{1}[a-z]*[ ][A-Z]{1}[a-z]*$/;
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // 16 digit
    const ccnumregex1 = /^\d{4}[-]\d{4}[-]\d{4}$/;
    // 18 digit
    const ccnumregex2 = /^\d{4}[-]\d{4}[-]\d{4}[-]\d{4}$/;
    const zipregex = /^\d{5}$/;
    const cvvregex = /^\d{3}$/;

    let inputs = [$("#name"), $("#mail"), $("#cc-num"), $("#zip"), $("#cvv")];

    $("#name").after("<small id='nameerror'></small>");
    $("#mail").after("<small id='mailerror'></small>");
    $("#cc-num").after("<small id='ccerror'></small>");
    $("#zip").after("<small id='ziperror'></small>");
    $("#cvv").after("<small id='cvverror'></small>");
    $("button").after("<br><small id='submiterror'></small>");
    $(".activities label").eq(6)[0].after($("<small id='activityerror'></small>")[0]);


    let act_error = $(".activities label");
    let a_count = 0;

    $.each(act_error, function (index, element) {
        if ($(element)[0]["firstChild"]["checked"] == false) {
            a_count += 1;
        }

        if (a_count == 7) {
            $("#activityerror").text("Select one or more activities before registering");
            $("#activityerror").css("color", "red");
        }
    });


    $(".activities label").change(function (event) {
        if (event.target.checked == true) {
            a_count -= 1;
        }
        if (event.target.checked == false) {
            a_count += 1;
        }
        if (a_count != 7) {
            $("#activityerror").text("");
        }
        if (a_count == 7) {
            $("#activityerror").text("Select one or more activities before registering");
            $("#activityerror").css("color", "red");
        }
    });


    let thenames = [];
    let theemails = [];
    let theccs = [];
    let thezips = [];
    let thecvvs = [];

    $.each(inputs, function (index, element) {
        element.focusout(function () {

            // Name
            if (index == 0) {
                if (element[0]["value"]["length"] == 0) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    thenames.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && nameregex.test(element[0]["value"]) == false) {
                    $("#nameerror").text("Example: Firstname Lastname");
                    $("#nameerror").css("color", "red");
                    element[0].style.borderColor = "#5e97b0";
                    thenames.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && nameregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#nameerror").text("");
                    thenames.push(element[0]["value"]);
                }
            }

            // Email
            if (index == 1) {
                if (element[0]["value"]["length"] == 0) {
                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    theemails.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && emailregex.test(element[0]["value"]) == false) {
                    $("#mailerror").text("Example: clippernation@icloud.com");
                    $("#mailerror").css("color", "red");
                    element[0].style.borderColor = "#5e97b0";
                    theemails.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && emailregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#mailerror").text("");
                    theemails.push(element[0]["value"]);
                }
            }

            // Credit Card
            if (index == 2) {
                //console.log("value", typeof element[0]["value"]);
                if (element[0]["value"]["length"] == 0) {
                    $("#ccerror").text("Please enter credit card");
                    $("#ccerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    theccs.push(element[0]["value"]);
                }
                console.log(element[0]["value"]["length"]);
                if (element[0]["value"]["length"] != 14 && ccnumregex1.test(element[0]["value"]) == false || element[0]["value"]["length"] != 19 && ccnumregex2.test(element[0]["value"]) == false) {
                    $("#ccerror").text("Enter as xxxx-xxxx-xxxx (or) xxxx-xxxx-xxxx-xxxx");
                    $("#ccerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    theccs.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] == 14 && ccnumregex1.test(element[0]["value"]) == true || element[0]["value"]["length"] == 19 && ccnumregex2.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#ccerror").text("");
                    theccs.push(element[0]["value"]);
                }
            }

            // Zip Code
            if (index == 3) {
                if (element[0]["value"]["length"] == 0) {
                    $("#ziperror").text("Please enter zip code");
                    $("#ziperror").css("color", "red");
                    thezips.push(element[0]["value"]);
                    element[0].style.borderColor = "#CD5C5C";
                }
                if (element[0]["value"]["length"] != 0 && zipregex.test(parseInt(element[0]["value"])) == false || element[0]["value"]["length"] > 5 || element[0]["value"]["length"] < 4) {
                    element[0].style.borderColor = "#CD5C5C";
                    $("#ziperror").text("Enter 5 digit number");
                    $("#ziperror").css("color", "red");
                    thezips.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && zipregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#ziperror").text("");
                    thezips.push(element[0]["value"]);
                }
            }

            // CVV
            if (index == 4) {
                if (element[0]["value"]["length"] == 0) {
                    $("#cvverror").text("Please enter cvv");
                    $("#cvverror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    thecvvs.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && cvvregex.test(parseInt(element[0]["value"])) == false || element[0]["value"]["length"] > 3 || element[0]["value"]["length"] < 3) {
                    element[0].style.borderColor = "#CD5C5C";
                    $("#cvverror").text("Enter 3 digit number");
                    $("#cvverror").css("color", "red");
                    thecvvs.push(element[0]["value"]);
                }

                if (element[0]["value"]["length"] != 0 && cvvregex.test(parseInt(element[0]["value"])) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#cvverror").text("");
                    thecvvs.push(element[0]["value"]);
                }
            }
            console.log(theccs);
            console.log(theccs[theccs.length - 1]);
        });
    });

    
    $("button").click(function () {
        $("form").submit(function (event) {

            // CREDIT CARD

            if ($("#payment")[0][1]["selected"] == true || selectedPayment[selectedPayment.length - 1] == "credit card") {

                // name is only missing
                // Done
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#submiterror").text("Please provide full name.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is only missing
                // Done
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#submiterror").text("Please provide full name.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // email is missing
                // done
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please provide email.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // done
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please provide email.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // zip is missing Done
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please provide your zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // zip is missing Done
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please provide your zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                // cvv is missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please provide your cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // cvv is missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please provide your cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // activity is missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                // name is missing
                // email is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please enter full name and email.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please enter full name and email.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // credit card 1 is missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter your full name.");
                    $("#nameerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name and credit card number.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // credit card 2 is missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter your full name.");
                    $("#nameerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name and credit card number.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                // name is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter your name and zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter your name and zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter your name and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter your name and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // EMAIL

                // email is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // email is missing
                // cc is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter email and credit card.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // cc is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter email and credit card.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter email and zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter email and zip code.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // ACTIVITY


                // activity is missing
                // cc is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter credit card and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                // cc is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter credit card and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter zip and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter zip and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter cvv and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // activity is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter cvv and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // credit card is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and credit card.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // credit card is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and credit card.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // credit card 1 is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, credit card, and zip.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // credit card 1 is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, credit card, and zip.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                // name is missing
                // cvv is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // cvv is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // EMAIL

                // email is missing
                // activity is missing
                // cc1 is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // activity is missing
                // cc2 is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                ///
                // email is missing
                // activity is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // activity is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // credit card 1 is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, and zip.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // credit card 2 is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, and zip.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // zip is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // cvv is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // cvv is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter email, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // CREDIT CARD

                // credit card is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // credit card is missing
                // zip is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // FOUR FIELDS MISSING

                // name is missing
                // email is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ziperror").text("Please enter cvv.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // zip is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ziperror").text("Please enter cvv.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // cc1 is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // cc2 is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // email is missing
                // activity is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ziperror").text("Please enter cvv.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ziperror").text("Please enter cvv.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name is missing
                // email is missing
                // activity is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                // 4 REQUIRED MISSING
                //EMAIL

                // email is missing
                // activity is missing
                // cc1 is missing
                // zip is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#submiterror").text("Please enter email, credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // activity is missing
                // cc2 is missing
                // zip is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#submiterror").text("Please enter email, credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // email is missing
                // activity is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#submiterror").text("Please enter email, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // activity is missing
                // zip is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#submiterror").text("Please enter email, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // credit card is missing
                // zip is missing
                // cvv is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");


                    $("#submiterror").text("Please enter email, credit card, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email is missing
                // credit card is missing
                // zip is missing
                // cvv is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");


                    $("#submiterror").text("Please enter email, credit card, zip, and cvv.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // credit card is missing
                // zip is missing
                // cvv is missing
                // activity is missing
                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // credit card is missing
                // zip is missing
                // cvv is missing
                // activity is missing
                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // 5 FIELDS MISSING

                // name is missing
                // email is missing
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email is missing
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name is missing
                // email
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name
                // email missing
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name
                // email missing
                // activity missing
                // credit card is missing
                // zip is missing
                // cvv missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name missing
                // email missing
                // activity
                // credit card is missing
                // zip is missing
                // cvv missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");


                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name missing
                // email missing
                // activity
                // credit card is missing
                // zip is missing
                // cvv missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count != 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");


                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }


                // name missing
                // email missing
                // activity
                // credit card is missing
                // zip
                // cvv missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name missing
                // email missing
                // activity
                // credit card is missing
                // zip
                // cvv missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }



                //RANDOM TESTING
                // cc missing
                // zip missing
                // activity missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // cc missing
                // zip missing
                // activity missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, zip, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                //-----------------------------------------------------------------------------------------------

                // cc missing
                // cvv missing
                // activity missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // cc missing
                // cvv missing
                // activity missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#submiterror").text("Please enter credit card, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                //-----------------------------------------------------------------------------------------------

                // zip missing
                // cvv missing
                // activity missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // zip missing
                // cvv missing
                // activity missing

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                //-----------------------------------------------------------------------------------------------

                // name missing
                // email missing
                // activity missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name missing
                // email missing
                // activity missing

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");


                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                //-----------------------------------------------------------------------------------------------

                // everything except credit card

                // 1
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // everything except credit card

                // 2
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#ccerror").text("");
                    $("#ccerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }
                //-----------------------------------------------------------------------------------------------



                // Everything missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex1.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // Everything missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && ccnumregex2.test(theccs[theccs.length - 1]) == false && zipregex.test(parseInt(thezips[thezips.length - 1])) == false && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name.");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");

                    $("#ccerror").text("Please enter credit card.");
                    $("#ccerror").css("color", "red");

                    $("#ziperror").text("Please enter zip code.");
                    $("#ziperror").css("color", "red");

                    $("#cvverror").text("Please enter cvv.");
                    $("#cvverror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please enter name, email, credit card, zip, cvv, and select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // Everything not missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex1.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    /*
                    $("#nameerror").text("");
                    $("#mailerror").text("");
                    $("#ccerror").text("");
                    $("#ziperror").text("");
                    $("#cvverror").text("");
                    $("#activityerror").text("");
                    $("#submiterror").text("Thank you for your information.");
                    $("#submiterror").css("color", "white");
                    $("button").css("backgroundColor", "#083f57");
                    //event.preventDefault();
                    */
                    return;
                }

                // Everything not missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && ccnumregex2.test(theccs[theccs.length - 1]) == true && zipregex.test(parseInt(thezips[thezips.length - 1])) == true && cvvregex.test(parseInt(thecvvs[thecvvs.length - 1])) == true && a_count != 7) {
                    /*
                    $("#nameerror").text("");
                    $("#mailerror").text("");
                    $("#ccerror").text("");
                    $("#ziperror").text("");
                    $("#cvverror").text("");
                    $("#activityerror").text("");
                    $("#submiterror").text("Thank you for your information.");
                    $("#submiterror").css("color", "white");
                    $("button").css("backgroundColor", "#083f57");
                    */
                    return;
                }

            }

            //PAYPAL OR BITCOIN

            if (selectedPayment.length != 0 && selectedPayment[selectedPayment.length - 1] == "paypal" || selectedPayment.length != 0 && selectedPayment[selectedPayment.length - 1] == "bitcoin") {


                // Name missing
                // 2 complete 1 missing
                // name is empty
                // email is not empty
                // an activity is selected
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#submiterror").text("Please provide your full name.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // Email missing
                // 2 complete 1 missing
                // name is not empty
                // email is empty
                // activity is not empty
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && a_count != 7) {
                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please provide your email.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name and email missing
                // activity not missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && a_count != 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please enter your full name and email.");
                    $("#submiterror").css("color", "red");
                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // name and activity missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering");
                    $("#activityerror").css("color", "red");

                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#submiterror").text("Please enter your full name and select an activity.");
                    $("#submiterror").css("color", "red");
                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // email and activity missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == false && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering.");
                    $("#activityerror").css("color", "red");

                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#submiterror").text("Please enter your email and select an activity.");
                    $("#submiterror").css("color", "red");
                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // only activity missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && a_count == 7) {
                    $("#activityerror").text("Select one or more activities before registering");
                    $("#activityerror").css("color", "red");

                    $("#submiterror").text("Please select an activity.");
                    $("#submiterror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    event.preventDefault();
                }

                // everything missing
                if (nameregex.test(thenames[thenames.length - 1]) == false && emailregex.test(theemails[theemails.length - 1]) == false && a_count == 7) {
                    $("#nameerror").text("Please enter full name");
                    $("#nameerror").css("color", "red");

                    $("#mailerror").text("Please enter email address");
                    $("#mailerror").css("color", "red");

                    $("#activityerror").text("Select one or more activities before registering");
                    $("#activityerror").css("color", "red");

                    $("button").css("backgroundColor", "red");
                    $("#submiterror").text("Please enter name, email, and select an activity.");
                    $("#submiterror").css("color", "red");
                    event.preventDefault();
                }

                // nothing missing
                if (nameregex.test(thenames[thenames.length - 1]) == true && emailregex.test(theemails[theemails.length - 1]) == true && a_count != 7) {
                    $("#submiterror").text("Thank you for your information.");
                    $("#submiterror").css("color", "white");
                    $("button").css("backgroundColor", "#083f57");
                    //event.preventDefault();
                    return;
                }
            }
            //event.preventDefault();
        });
    });
}); // END OF EVENT LISTENER FOR $(document).ready(function () {
