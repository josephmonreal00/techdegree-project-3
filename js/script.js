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

    if ($("#design option").eq(0)[0]["selected"] == true) {
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

    // T SHIRT SECTION - HIDING COLOR LABEL TILL T-SHIRT DESIGN IS SELECTED

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


        for (let i = startIndex; i <= intoString.length - 1; i++) {
            if (Number.isInteger(parseInt(intoString[i]))) {
                createInt.push(parseInt(intoString[i]));
                lastNumInd = i;
            }
        }


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
    });

    // SECTION 5 - FORM VALIDATION

    const nameregex0 = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const nameregex1 = /^[a-z ,.'-]+$/i;
    const emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const ccnumregex13 = /^\d{13}$/;
    const ccnumregex14 = /^\d{14}$/;
    const ccnumregex15 = /^\d{15}$/;
    const ccnumregex16 = /^\d{16}$/;
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

    $.each(inputs, function (index, element) {
        element.focusout(function () {

            // Name
            if (index == 0) {
                if (nameregex0.test(element[0]["value"]) == false || nameregex1.test(element[0]["value"]) == false) {
                    $("#nameerror").text("Please enter your name.");
                    $("#nameerror").css("color", "red");
                    element[0].style.borderColor = "#5e97b0";
                }
                if (nameregex0.test(element[0]["value"]) == true || nameregex1.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#nameerror").text("");
                }
            }

            // Email
            if (index == 1) {
                if (emailregex.test(element[0]["value"]) == false) {
                    $("#mailerror").text("Please enter email address.");
                    $("#mailerror").css("color", "red");
                    element[0].style.borderColor = "#5e97b0";
                }
                if (emailregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#mailerror").text("");
                }
            }

            // Credit Card
            if (index == 2) {
                if (ccnumregex13.test(element[0]["value"]) == false || ccnumregex14.test(element[0]["value"]) == false || ccnumregex15.test(element[0]["value"]) == false || ccnumregex16.test(element[0]["value"]) == false) {
                    $("#ccerror").text("Please enter credit number 13 - 16 digits long.");
                    $("#ccerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                }

                if (ccnumregex13.test(element[0]["value"]) == true || ccnumregex14.test(element[0]["value"]) == true || ccnumregex15.test(element[0]["value"]) == true || ccnumregex16.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#ccerror").text("");
                }
            }

            // Zip Code
            if (index == 3) {
                if (zipregex.test(element[0]["value"]) == false) {
                    element[0].style.borderColor = "#CD5C5C";
                    $("#ziperror").text("Enter 5 digit number.");
                    $("#ziperror").css("color", "red");
                }

                if (zipregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#ziperror").text("");
                }
            }

            // CVV
            if (index == 4) {
                if (cvvregex.test(element[0]["value"]) == false) {
                    element[0].style.borderColor = "#CD5C5C";
                    $("#cvverror").text("Enter 3 digit number.");
                    $("#cvverror").css("color", "red");
                }

                if (cvvregex.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#cvverror").text("");
                }
            }
        });
    });

    let submitForm = () => {
        $("form").submit();
    }

    let dontSubmitForm = () => {
        $("form").submit(function () {
            $("button").css("backgroundColor", "red");
            $("#submiterror").text("Please complete form.");
            $("#submiterror").css("color", "red");
            event.preventDefault();
        });
    }

    $("button").click(function () {

        const checkVals = [$("#name"), $("#mail"), $("#cc-num"), $("#zip"), $("#cvv")];

        let cVals = {
            name: "",
            email: "",
            cc: "",
            zip: "",
            cvv: ""
        };

        // EC - REAL TIME ERROR MESSAGES

        //--------------------------------------------------------
        if (nameregex0.test($("#name")[0]["value"]) == false) {
            $("#nameerror").text("Please enter your name.");
            $("#nameerror").css("color", "red");
        }
        if (emailregex.test($("#mail")[0]["value"]) == false) {
            $("#mailerror").text("Please enter email address.");
            $("#mailerror").css("color", "red");
        }
        if (ccnumregex13.test($("#cc-num")[0]["value"]) == false) {
            $("#ccerror").text("Please enter credit number 13 - 16 digits long.");
            $("#ccerror").css("color", "red");
        }
        if (ccnumregex14.test($("#cc-num")[0]["value"]) == false) {
            $("#ccerror").text("Please enter credit number 13 - 16 digits long.");
            $("#ccerror").css("color", "red");
        }
        if (ccnumregex15.test($("#cc-num")[0]["value"]) == false) {
            $("#ccerror").text("Please enter credit number 13 - 16 digits long.");
            $("#ccerror").css("color", "red");
        }
        if (ccnumregex16.test($("#cc-num")[0]["value"]) == false) {
            $("#ccerror").text("Please enter credit number 13 - 16 digits long.");
            $("#ccerror").css("color", "red");
        }
        if (zipregex.test($("#zip")[0]["value"]) == false) {
            $("#ziperror").text("Enter 5 digit number.");
            $("#ziperror").css("color", "red");
        }
        if (cvvregex.test($("#cvv")[0]["value"]) == false) {
            $("#cvverror").text("Enter 3 digit number.");
            $("#cvverror").css("color", "red");
        }
        //----------------------------------------------------------

        if (nameregex0.test($("#name")[0]["value"]) == true) {
            $("#nameerror").text("");
            cVals.name = $("#name")[0]["value"];
        }
        if (emailregex.test($("#mail")[0]["value"]) == true) {
            $("#mailerror").text("");
            cVals.email = $("#mail")[0]["value"];
        }
        if (ccnumregex13.test($("#cc-num")[0]["value"]) == true) {
            $("#ccerror").text("");
            cVals.cc = $("#cc-num")[0]["value"];
        }
        if (ccnumregex14.test($("#cc-num")[0]["value"]) == true) {
            $("#ccerror").text("");
            cVals.cc = $("#cc-num")[0]["value"];
        }
        if (ccnumregex15.test($("#cc-num")[0]["value"]) == true) {
            $("#ccerror").text("");
            cVals.cc = $("#cc-num")[0]["value"];
        }
        if (ccnumregex16.test($("#cc-num")[0]["value"]) == true) {
            $("#ccerror").text("");
            cVals.cc = $("#cc-num")[0]["value"];
        }
        if (zipregex.test($("#zip")[0]["value"]) == true) {
            $("#ziperror").text("");
            cVals.zip = $("#zip")[0]["value"];
        }
        if (cvvregex.test($("#cvv")[0]["value"]) == true) {
            $("#cvverror").text("");
            cVals.cvv = $("#cvv")[0]["value"];
        }

        if ($("#payment")[0][1]["selected"] == true || selectedPayment[selectedPayment.length - 1] == "credit card") {
            if (nameregex0.test(cVals.name) == true && emailregex.test(cVals.email) == true && ccnumregex13.test(cVals.cc) == true && zipregex.test(cVals.zip) == true && cvvregex.test(cVals.cvv) == true && a_count < 7) {
                submitForm();
            } else if (nameregex0.test(cVals.name) == true && emailregex.test(cVals.email) == true && ccnumregex14.test(cVals.cc) == true && zipregex.test(cVals.zip) == true && cvvregex.test(cVals.cvv) == true && a_count < 7) {
                submitForm();
            } else if (nameregex0.test(cVals.name) == true && emailregex.test(cVals.email) == true && ccnumregex15.test(cVals.cc) == true && zipregex.test(cVals.zip) == true && cvvregex.test(cVals.cvv) == true && a_count < 7) {
                submitForm();
            } else if (nameregex0.test(cVals.name) == true && emailregex.test(cVals.email) == true && ccnumregex16.test(cVals.cc) == true && zipregex.test(cVals.zip) == true && cvvregex.test(cVals.cvv) == true && a_count < 7) {
                submitForm();
            } else {
                dontSubmitForm();
            }
        }

        if (selectedPayment.length != 0 && selectedPayment[selectedPayment.length - 1] == "paypal" || selectedPayment.length != 0 && selectedPayment[selectedPayment.length - 1] == "bitcoin") {
            if (nameregex0.test(cVals.name) == true && emailregex.test(cVals.email) == true && a_count < 7) {
                submitForm();
            } else {
                dontSubmitForm();
            }
        }
    });

}); // END OF EVENT LISTENER FOR $(document).ready(function () {
