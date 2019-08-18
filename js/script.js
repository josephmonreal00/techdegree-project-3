/******************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
******************************************/

//EVENT-LISTENER
$(document).ready(function () {

    /* SECTION 1 -  PUT THE FIRST FIELD IN FOCUS STATE
    • Use jQuery to select the `Name` input element and place focus on it.
    */
    $("#name").focus();

    /* SECTION 2 - ADD AN "OTHER" OPTION TO THE JOB ROLE SECTION
    •  In the `index.html` file, just below the `Job Role` select element, create a text input element, set its `name` attribute to "job_role_other",
      set its `placeholder` attribute to "Your Job Role", and give it an "id" attribute of "other-title" so you can easily target this element in your JS file.
    •  In your JavaScript file, target the 'Other' input field, and hide it initially, so that it will display if JavaScript is disabled, but be hidden initially with JS.
    */

    $('#other-title').hide();

    let lastValue = $('#title option:last-child').val();

    //EVENT-LISTENER
    $('#title').change(function () {
        if ($(this).val() == 'other') {
            $('#other-title').show('slow');
        } else {
            $('#other-title').hide('slow');
        }
    }); //END OF EVENT-LISTENER


    /* SECTION 3 - T-Shirt
    •  The goal for the t-shirt section is to filter the available "Color" options by the selected theme in the "Design" field.
     Doing this ensures that the user cannot select an invalid combination of values for the "Design" and "Color" fields.
    •  When the form is intially loaded, we need to update the "Design" and "Color" field so that it's clear to the user that they need to select a theme before selecting a color.
     •  Hide the "Select Theme" `option` element in the "Design" menu.
     •  Update the “Color” field to read “Please select a T-shirt theme”.
     •  Hide the colors in the “Color” drop down menu.
    •  Then, when one of the two themes is selected, only the appropriate colors should show in the "Color" drop down menu, and
     the "Color" field should update to the first available color. You'll use a `change` event listener on the "Design" menu `select` element to listen for changes.
     And inside the event listener, you'll use a conditional to determine what to hide, show and update.
     •  If "js puns" is selected, hide the three "heart js" option element in the "Color" drop down menu, show the three
      "js puns" option elements, and update the "Color" field to the first available color.
     •  If "heart js" is selected, hide the three "js puns" option elements in the "Color" drop down menu, show the three "heart js" option elements,
      and update the "Color" field to the first available color.
    */
    $("#design option").eq(0).hide();
    //console.log($("#design option").eq(0));
    $("#color").prepend($('<option>Please select a T-shirt theme</option>'));
    $("#color option").eq(0).attr('data-brackets-id', '449');
    $("#color option").eq(0).attr('style', 'display: none;');
    $("#color option").eq(0).attr('selected', 'selected');
    $("#color option:not(:eq(0))").hide();

    /*
    $("#color option").each(function(index, element) {
        console.log(element);
    });
    */

    //EVENT-LISTENER
    $("#design").on("change", function () {

        if ($(this).val() === 'js puns') {
            //$("#color option").eq(0).attr('selected');
            //$("#color option").eq(4).attr('selected');
            $("#color option:lt(4)").show();
            $("#color option").eq(1).attr('selected', 'selected');
            $("#color option:gt(3)").hide();
            $("#color option").eq(0).hide();

        }
        if ($(this).val() === 'heart js') {
            //$("#color option").eq(0).attr('selected');
            //$("#color option").eq(1).attr('selected');
            $("#color option").eq(4).attr('selected', 'selected');
            $("#color option:gt(3)").show();
            $("#color option").eq(0).hide();
            $("#color option:lt(4)").hide();
        }
    }); //END OF EVENT-LISTENER

    /* SECTION 4 - ACTIVITY SECTION - PRICE

    • Initialize variable to store cost of activities
      let activityCost = 0
    • Created DOM Element and stored into global totalCost variable
      let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");
    •  Appended global totalCost varible to the `activity` section
      $(".activities").append(totalCost);
    • let activityPrice
      parseInt(event.currentTarget.textContent.substr(event.currentTarget.textContent.length -3, event.currentTarget.textContent.length));
    • Retrieving the index of the $ sign. This will help us inside the for loop on where to start iterating the text.
      let startIndex = $(this).text().indexOf("$");
    • When the change event occurs retrieve the text of that element and cast it as a String just in case
      let intoString = String($(this).text());
    • Create a global variable that will store the index of the last number that occurs within the text
      let lastNumInd = 0;
    • Create a global variable that will store the numbers that are still text into theNumber
      let theNumber = '';
      let theNumber will store the number as text create a for loop that will iterate through each index and
      parse each element into an integer and store each number into the createInt array.

    • let createInt = []

    */
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
            //console.log("element");
            //console.log(createInt[i]);
            theNumber += createInt[i].toString();
            //createInt.join().replace(',', '')
        }
        //console.log(theNumber);
        //console.log(parseInt(theNumber));
        //console.log($(this)[0]["firstChild"]["checked"]);

        // This if statement is checking if element has been checked and if so will add to variable activityCost
        if ($(this)[0]["firstChild"]["checked"] == true) {
            activityCost += parseInt(theNumber);
        }

        // This if statement is checking if element has been checked and if so will substract from variable activityCost
        if ($(this)[0]["firstChild"]["checked"] == false) {
            activityCost -= parseInt(theNumber);
        }
        //console.log($("#updateCost").text(activityCost));

        /*
        $("#updateCost").text(activityCost)

        This is setting the text for the appended element and the span element within with id set as updateCost.
            let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");
        The user will now be able too see the cost of the activities selected.
        */

        $("#updateCost").text(activityCost)

        // EACH LOOP
        $(".activities label").each(function (index, element) {
            if ($(element)[0]["firstChild"]["checked"]) {
                activity_obj["input_multi"][0].push($(element));
            } else {
                activity_obj["input_multi"][1].push($(element));
            }
        }); // END OF EACH LOOP


        // ** THIS CODE MUST EXIST WITHIN THIS LISTENER **

        // SECTION 4 - FINDING THE DAY AND TIME AND FIXING CONFLICTING ACTIVITIES

        // FOR LOOP FOR CHECKED ACTIVITIES


        $.each(activity_obj["input_multi"][0], function (index, element) {
            //checkedDays.push();
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


        // Working :)
        if (activity_obj["tuesdayelements"][0].length == 2) {
            $.each(activity_obj["tuesdayelements"][0], function (ind, elem) {
                activity_obj["tuesdayelements"][3][ind][0]["firstChild"]["disabled"] = true;
            });
        }

        // Working :)
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


        // Working :)
        if (activity_obj["tuesdayelements"][0].length == 0) {
            $.each(activity_obj["tuesdayelements"][3], function (ind, elem) {
                activity_obj["tuesdayelements"][3][ind][0]["firstChild"]["disabled"] = false;
            });
        }

        //console.log(activity_obj["tuesdayelements"][4]);
        //console.log(activity_obj["tuesdayelements"][0]);
        //console.log(activity_obj["tuesdayelements"][1]);
        //console.log(activity_obj["tuesdayelements"][3]);
    }); // END OF EVENT LISTENER FOR $(".activities label").change(function(event) {






    // PAYMENT INFO SECTION
    /*
     Initially, the credit card section should be selected and displayed in the form, and the other two
     payment options should be hidden. The user should be able to change payment options at any time, but shouldn't
     be able to select the "Select Payment Method" option. So you'll need to check the currently selected payment
     option, and hide and show the payment sections in the form accordingly.

      -  Hide the "Select Payment Method" 'option' so it doesn't show up in the drop down menu. (Done)

      - Get the value of the payment select element, and if it's equal to 'credit card', set the credit card
       payment section in the form to show, and set the other two options to hide.

      - Repeat the above step with the PayPal and BitCoin options so that the selected payment is shown and the
       others are hidden.
    */

    // 1. MAKE THE CREDIT CARD PAYMENT THE DEFAULT OPTION TO BE SHOWN WHEN PAGE IS LOADED.


    let values = $("#payment option");
    values[0]["hidden"] = true;
    values[0]["selected"] = false;
    values[1]["selected"] = true;

    let allDivs = $("div");
    $(allDivs[allDivs.length - 1])[0]["hidden"] = true;
    $(allDivs[allDivs.length - 2])[0]["hidden"] = true;
    $("#payment").change(function (e) {
        if (e.target.value == "paypal" || e.target.value == "bitcoin") {
            $(allDivs[allDivs.length - 1])[0]["hidden"] = false;
            $(allDivs[allDivs.length - 2])[0]["hidden"] = false;
            $("#credit-card").hide("slow");
        }
        if (e.target.value == "credit card") {
            $(allDivs[allDivs.length - 1])[0]["hidden"] = true;
            $(allDivs[allDivs.length - 2])[0]["hidden"] = true;
            $("#credit-card").show("slow");
        }
    });




    // FORM VALIDATION
    /*
     If any of the following validation errors exist, prevent the user form submitting the form:
      - Name field can't be blank
      - Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address,
        just that it's formatted like one: dave@teamtreehouse.com for example
      - User must select at least one checkbox under the "Register for Activities" section of the form.
      - If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number,
        a zip code, and a 3 number CVV value before the form can be submitted
       - Credit Card field should accept a 5-digit number
       - The Zip Code field should accept a 5-digit number
       - The CVV should only accept a number that is exactly 3 digits long
    */

    /* FORM VALIDATION MESSAGES
     - Provide some kind of indicatoin when there's a validation error. The field's border could turn red, for example,
       or even better for the user would be if a red text message appeared near the field.
     - The following fields should have some obvious form of an error indication:
      - Name Field
      - Email Field
      - Register for Activities checkboxes (at least one must be selected)
      - Credit Card number (only if Credit Card payment method is selected)
      - Zip Code(only if Credit Card payment method is selected)
      - CVV (Only if Credit Card payment method is selected)

    */
    
    //const nameregex = //;
    //const emailregex = //;
    const ccnumregex = /^\d{16}$/;
    const ccnumregex2 = /^\d{4}[-]\d{4}[-]\d{4}[-]\d{4}$/;
    const zipregex = /^\d{5}$/;
    const cvvregex = /^\d{3}$/;
    
    console.log(ccnumregex2.test("2222-2222-2222-2222"));
    console.log(ccnumregex.test(2222222222222222));
    //console.log(parseInt(d33));
    


    let inputs = [$("#name"), $("#mail"), $("#cc-num"), $("#zip"), $("#cvv")];
    
    $("#cc-num").after("<small id='ccerror'></small>");
    $("#zip").after("<small id='ziperror'></small>");
    $("#cvv").after("<small id='cvverror'></small>");
    
    $.each(inputs, function (index, element) { 
        element.focusout(function () {
            
            // Name 
            if(index == 0) {
                if(element[0]["value"]["length"] == 0) {
                    element[0].style.borderColor = "#CD5C5C";
                }
                else {
                    element[0].style.borderColor = "#5e97b0";
                }
            }
            
            // Email
            if(index == 1) {
                if(element[0]["value"]["length"] == 0) {
                    element[0].style.borderColor = "#CD5C5C";
                }
                else {
                    element[0].style.borderColor = "#5e97b0";
                }
            }
            
            // Credit Card
            if(index == 2) {
                console.log("value", typeof element[0]["value"]);
                
                
                if(element[0]["value"]["length"] == 0) {
                    element[0].style.borderColor = "#CD5C5C";
                }
                
                /*
                let getNumsCC = "";
                let dashcount = 0;
                
                for(let i = 0; i < element[0]["value"]["length"]; i++) {
                    //console.log(i, isNaN(element[0]["value"][i]));
                    if(element[0]["value"][i] != "-" && isNaN(element[0]["value"][i]) == false){
                       getNumsCC += parseInt(element[0]["value"][i]); 
                    }
                    if(element[0]["value"][i] == "-"){
                       dashcount += 1;
                    }
                }
                */
   
                if(element[0]["value"]["length"] != 0 && ccnumregex2.test(element[0]["value"]) == false){
                    // concat int values to variable
                    // then compare that int value with the regex above     
                    $("#ccerror").text("Please enter as xxxx-xxxx-xxxx-xxxx");
                    $("#ccerror").css("color", "red");
                    element[0].style.borderColor = "#CD5C5C";
                    console.log("Please insert a 16 digit cc num.");
                    console.log("Your cc number should only be numbers");
                }
                
                if(element[0]["value"]["length"] != 0 && ccnumregex2.test(element[0]["value"]) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    console.log(element[0]["value"]);
                    console.log("Thank you for your credit card number.");
                    $("#ccerror").text("");
                }
            }
            
            // Zip Code
            if(index == 3) {
                if(element[0]["value"]["length"] == 0) {
                    element[0].style.borderColor = "#CD5C5C";
                }
                if(element[0]["value"]["length"] != 0 && zipregex.test(parseInt(element[0]["value"])) == false){
                    element[0].style.borderColor = "#CD5C5C";
                    console.log("Please insert a 5 digit zip code.");
                    console.log("Your zip should only be numbers and 5 digits long");
                }
                
                if(element[0]["value"]["length"] != 0 && zipregex.test(parseInt(element[0]["value"])) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    console.log(element[0]["value"]);
                    console.log("Thank you for your 5 digit zip code.");
                }
            }
            
            // CVV 
            if(index == 4) {
                if(element[0]["value"]["length"] == 0) {
                    element[0].style.borderColor = "#CD5C5C";
                }
            
                if(element[0]["value"]["length"] != 0 && cvvregex.test(parseInt(element[0]["value"])) == false){
                    element[0].style.borderColor = "#CD5C5C";
                    //$("#cvv").after("<small id='error'>3 Digit Number</small>");
                    $("#cvverror").text("3 Digit Number");
                    $("#cvverror").css("color", "red");
                    console.log("Please insert only integers and make sure CVV is only 3 integers long.");
                    console.log("Your CVV should only be numbers");
                }
                
                if(element[0]["value"]["length"] != 0 && cvvregex.test(parseInt(element[0]["value"])) == true) {
                    element[0].style.borderColor = "#5e97b0";
                    $("#cvverror").text("");
                    console.log(element[0]["value"]);
                    console.log("Thank you for inserting an int for cvv that is 3 integers long");
                }
            }
            
        });
    });
    
    
    // NEED AN EVENT FOR THE SUBMIT REGISTER BUTTON
    
    
    // I want to keep the register button disabled until everything is correct. 


}); // END OF EVENT LISTENER FOR $(document).ready(function () {
