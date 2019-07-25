/******************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
******************************************/

//EVENT-LISTENER
$(document).ready(function () {
    /* SECTION 1 -  PUT THE FIRST FIELD IN FOCUS STATE
    • Use jQuery to select the `Name` input element and place focus on it.
    */
    $('#name').focus();

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

        // ** THIS CODE MUST EXIST WITHIN THIS LISTENER **
        let checkedCheckboxes = [];
        let uncheckedCheckboxes = [];


        // EACH LOOP
        $(".activities label").each(function (index, element) {
            if ($(this)[0]["firstChild"]["checked"]) {
                checkedCheckboxes.push($(this)[0]);
            } else {
                uncheckedCheckboxes.push($(this)[0]);
            }
        }); // END OF EACH LOOP

        //for(let i = 0; i < checkedCheckboxes.length; i++) {
        // console.log("checked",checkedCheckboxes[i]/*.textContent.substr(0,5)*/);
        //}

        //for(let i = 0; i < uncheckedCheckboxes.length; i++) {
        // console.log("unchecked",uncheckedCheckboxes[i]/*.textContent.substr(0,5)*/);
        //}

        // ** THIS CODE MUST EXIST WITHIN THIS LISTENER **

        // SECTION 4 - FINDING THE DAY AND TIME AND FIXING CONFLICTING ACTIVITIES

        // FOR LOOP FOR CHECKED ACTIVITIES
        let checkedDays = [];
        let checked_time = [];

        $.each(checkedCheckboxes, function (index, element) {
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

            checkedDays.push(checkedDay);

            for (let i = comma_index - 1; i > index_for_day; i--) {
                if ($(element).text()[i] != " ") {
                    time_in_chars.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            //for(let i = 0; i < letTimeArray.length; i++) {
            // checkedTime += time_in_chars[i];
            //}

            checkedTime = time_in_chars.reverse().join("");
            checked_time.push(checkedTime);
            //console.log($(element));

        }); // FOR LOOP FOR CHECKED ACTIVITIES

        // FOR LOOP FOR UNCHECKED ACTIVITIES
        let uncheckedDays = [];
        let unchecked_time = [];

        $.each(uncheckedCheckboxes, function (index, element) {
            //checkedDays.push();
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

            uncheckedDays.push(unchecked_day);

            for (let i = comma_index_ - 1; i > index_for_day_un; i--) {
                if ($(element).text()[i] != " ") {
                    time_in_chars_un.push($(element).text()[i]);
                } else {
                    break;
                }
            }

            //for(let i = 0; i < letTimeArray.length; i++) {
            // checkedTime += time_in_chars[i];
            //}

            uncheckedTime = time_in_chars_un.reverse().join("");
            unchecked_time.push(uncheckedTime);
            //console.log($(element));
        }); // FOR LOOP FOR UNCHECKED ACTIVITIES

        //$.each(checkedDays, function(index,element) {
        // console.log(element);
        //});
        //console.log(checkedDays);
        //console.log(checked_time);

        console.log(uncheckedDays);




    }); // END OF EVENT LISTENER FOR $(".activities label").change(function(event) {

}); // END OF EVENT LISTENER FOR $(document).ready(function () {
