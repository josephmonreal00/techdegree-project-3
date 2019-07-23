/******************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
******************************************/
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function () {
    /*
            (1) Put the first field in the `focus` state

            • Use jQuery to select the `Name` input element and place focus on it.


    */
    $('#name').focus();

    /*
            (2) Add an "Other" option to the Job Role section

            • In the `index.html` file, just below the `Job Role` select element, create a text input element, set its `name` attribute to "job_role_other", set its `placeholder` attribute to "Your Job Role", and give it an "id" attribute of "other-title"
            so you can easily target this element in your JS file.

            • In your JavaScript file, target the 'Other' input field, and hide it initially, so that it will display if JavaScript is disabled, but be hidden initially with JS.

    */

    $('#other-title').hide();
    let lastValue = $('#title option:last-child').val();
    //************************************************************************************************************************************************
    $('#title').change(function () {
        if ($(this).val() == 'other') {
            $('#other-title').show('slow');
        } else {
            $('#other-title').hide('slow');
        }
    });
    //************************************************************************************************************************************************
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    /*
             (3) T-Shirt Section

             • The goal for the t-shirt section is to filter the available "Color" options by the selected theme in the "Design" field. Doing this ensures that the user cannot select an invalid combination of values for the "Design" and "Color" fields.

             • When the form is intially loaded, we need to update the "Design" and "Color" field so that it's clear to the user that they need to select a theme before selecting a color.

                 • Hide the "Select Theme" `option` element in the "Design" menu.
                 • Update the “Color” field to read “Please select a T-shirt theme”.
                 • Hide the colors in the “Color” drop down menu.

             • Then, when one of the two themes is selected, only the appropriate colors should show in the "Color" drop down menu, and the "Color" field should update to the first available color. You'll use a `change` event listener on the "Design" menu `select` element to listen for changes. And inside the event listener, you'll use a conditional to determine what to hide, show and update.

                 • If "js puns" is selected, hide the three "heart js" option element in the "Color" drop down menu, show the three "js puns" option elements, and update the "Color" field to the first available color.

                 • If "heart js" is selected, hide the three "js puns" option elements in the "Color" drop down menu, show the three "heart js" option elements, and update the "Color" field to the first available color.


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

    //************************************************************************************************************************************************
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
    });
    //************************************************************************************************************************************************

    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    (4) Activity Section

     - Initialize variable to store cost of activities
       let activityCost = 0

     - Created DOM Element and stored into global totalCost variable

       let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");

     - Appended global totalCost varible to the `activity` section

       $(".activities").append(totalCost);
    */

    // .prop('attributeName') -- returns a boolean, true or false
    let activityCost = 0;
    let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");
    $(".activities").append(totalCost);
    //$(".activities").append(globalCost);

    /*
     Add an event listener using jQuery to the label container within the element with class name of `activities`

      $(".activities label").change(function(event) {

    */
    //************************************************************************************************************************************************
    $(".activities label").change(function (event) {
        //let activityPrice = parseInt(event.currentTarget.textContent.substr(event.currentTarget.textContent.length -3, event.currentTarget.textContent.length));

        /*
         Retrieving the index of the $ sign. This will help us inside the for loop on where to start iterating the text.

          let startIndex = $(this).text().indexOf("$");

         When the change event occurs retrieve the text of that element and cast it as a String just in case

          let intoString = String($(this).text());


         Create a global variable that will store the index of the last number that occurs within the text

          let lastNumInd = 0;

         Create a global variable that will store the numbers that are still text into theNumber

          let theNumber = '';

         let theNumber will store the number as text create a for loop that will iterate through each index and
         parse each element into an integer and store each number into the createInt array.

          let createInt = []

        */

        let startIndex = $(this).text().indexOf("$");
        console.log($(this).text().indexOf("$"));
        let intoString = String($(this).text());
        let lastNumInd = 0;
        let theNumber = '';
        let createInt = [];

        /*
         This for loop will start from the dollar sign index within the string. For example if we click on the activity that
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
         This for loop will iterate through the array createInt which contains the integers of the activity cost
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

        /*
         These two if statements are checking if the element has been checked
        */
        if ($(this)[0]["firstChild"]["checked"] == true) {
            activityCost += parseInt(theNumber);
        }

        if ($(this)[0]["firstChild"]["checked"] == false) {
            activityCost -= parseInt(theNumber);
        }
        //console.log($("#updateCost").text(activityCost));

        /*
         This is setting the text for the appended element and the span element within with id set as updateCost.

             let totalCost = $("<h2>Total Cost: <span id='updateCost'></span> </h2>");

            The user will now be able too see the cost of the activities selected.
        */

        $("#updateCost").text(activityCost)


        //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        // CONFLICTING ACTIVITIES
        //for(let i = 0; i < $(this).text().length; i++) {
        // console.log($(this).text()[i]);
        //}
        //console.log($(this).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]));
        //console.log($(this).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]) + 2);

        // This variable will store the day that exists within the text
        let theDay = '';

        // This variable will store the time stored within the text
        let tiempo = '';

        /*  EDITTT
         This variable will store the index of the first char for the time inside the text.
         For example: JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100
         9am-12pm, $100 is at index 33
        */
        let startOfIndexForTime = '';

        /*  This variable will store the index of the first char for the day inside the text.
         For example: JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100
                    ^
                    +2
                      ^
         T for Tuesday is at index 33
        */
        let dayForActivityIndex = $(this).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]) + 2;

        /*
         This variable will store the characters for the day found within the selected activity
        */
        let turnTheDayIntoArray = [];

        /*
         This for loop will start at the first letter of the day for that particular activity. It will then iterate
         as long as its a character and not a space. If not a space the character will pushed to `turnTheDayIntoArray`
         else the loop will break.

         For example: Express Workshop — Tuesday 9am-12pm, $100
                 ^
                     ^ (will break out of loop)
        */
        for (let i = dayForActivityIndex; i < $(this).text().length; i++) {
            if ($(this).text()[i] != " ") {
                turnTheDayIntoArray.push($(this).text()[i]);
            } else {
                break;
            }
        }

        /*
         This for loop iterates the characters existing inside the turnTheDayIntoArray and
         concatenates each and every character to theDay variable.

         For Example:

          turnTheDayIntoArray = ['T','u','e','s','d','a','y']

          theDay += T
          theDay += Tu
          theDay += Tue
          theDay += Tues
          theDay += Tuesd
          theDay += Tuesda
          theDay += Tuesday

          theDay == "Tuesday"

                   ^
        */
        for (let i = 0; i < turnTheDayIntoArray.length; i++) {
            theDay += turnTheDayIntoArray[i];
        }

        //This for loop is only printing out the characters stored into the turnTheDayIntoArray
        for (let i = 0; i < turnTheDayIntoArray.length; i++) {
            console.log(turnTheDayIntoArray[i]);
        }
        console.log(String(theDay));

        /*__________________________________________________________________________________________________________________

        Within this section we are looking for the day for each activity.
        ____________________________________________________________________________________________________________________*/
        console.log($(this).text().indexOf(","));

        /*
        letTimeArray will store time for the activity checked.
        */
        let letTimeArray = [];

        /* commanIndex stores the index of the first comma found which is right before the price
           For example: Build tools Workshop — Wednesday 9am-12pm, $100
                                                                 ^
                                                                 41
        */
        let commaIndex = $(this).text().indexOf(",");

        /*
        This for loop is starting at the index stores in the variable commaIndex minus one index before
        which will actually start at the index where m exists and this will hold true for each and every
        activity.

        For Example: Node.js Workshop — Tuesday 1pm-4pm, $100
            0                                ^
                                             34 (commaIndex - 1)
                               ^
                               19 (dayForActivityIndex = $(this).text().indexOf(jQuery.parseHTML("&mdash;")[0]["textContent"]) + 2;)



        */
        for (let i = commaIndex - 1; i > dayForActivityIndex; i--) {
            if ($(this).text()[i] != " ") {
                letTimeArray.push($(this).text()[i]);
            } else {
                break;
            }
        }

        for (let i = 0; i < letTimeArray.length; i++) {
            console.log(letTimeArray[i]);
            tiempo += letTimeArray[i];
        }

        let reverseTheString = letTimeArray.reverse().join("");


        console.log("The string reversed: ", reverseTheString);
        //console.log($(this).text().charAt(dayForActivityIndex));



        /*______________________________________________________________________________
        When an activity  is checked, disable any activity that occurs at the same day and time
        (i.e. "conflicting activities") without disabling the activity that occurs at the same day and time

        And when an activity is unchecked you want to enable any conflicting activities


        ______________________________________________________________________________*/
        console.log("first section");
        console.log("^");
        console.log("|");
        console.log("|");
        console.log("|");
        console.log("|");
        console.log("|");


        console.log("|");
        console.log("|");
        console.log("|");
        console.log("|");
        console.log("|");
        console.log("|");
        console.log("second section");

        let checkedCheckboxes = [];
        let uncheckedCheckboxes = [];
        let checkedDayName = [];
        let uncheckedDayNames = [];

        //************************************************************************************************************************************************

        /* FUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTOINFUNCTIONFUNCTION
         Description: This function will receive an activity element and will look for the day within the text.

         Function: getDayChars

         Parameters: element will take in
        FUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTIONFUNCTOINFUNCTIONFUNCTION*/
        let getDayChars = (element) => {
            //console.log("inside getDayChars");
            if (element[0]["firstChild"]["checked"]) {
                console.log("checked");
                console.log(element);
            } else {
                console.log("unchecked");
                console.log(element);
            }

        }
        //.each for loop....
        // with this for loop we're iterating through the label elements
        // each time an activity is selected the .each for loop will run to check and see which
        // activity elements have been selected and which ones have not.
        $(".activities label").each(function (index, element) {
            if ($(this)[0]["firstChild"]["checked"]) {
                checkedCheckboxes.push($(this)[0]);
            } else {
                uncheckedCheckboxes.push($(this)[0]);
            }
        });
        //************************************************************************************************************************************************

        for (let i = 0; i < checkedCheckboxes.length; i++) {
            //console.log("checked",checkedCheckboxes[i]/*.textContent.substr(0,5)*/);
            //console.log("Checked");
            getDayChars($(checkedCheckboxes[i]));


        }

        for (let i = 0; i < uncheckedCheckboxes.length; i++) {
            //console.log("unchecked",uncheckedCheckboxes[i]/*.textContent.substr(0,5)*/);
            //console.log("Unchecked");
            getDayChars($(uncheckedCheckboxes[i]));
        }









        //console.log("&mdash;");
        /*
        let indexesBlankSpace = [];
        for(let i = 0; i < $(this).text().length; i++) {
         if($(this).text()[i] == " ") {
          indexesBlankSpace.push(i);
          console.log(i);
         }
        }
        */
        //console.log($(this).text().substr(indexesBlankSpace[indexesBlankSpace.length - 3], indexesBlankSpace[indexesBlankSpace.length - 1]));
        /*
        for(let i = 0; i < indexesBlankSpace.length; i++) {
         console.log("Inside Array");
         console.log(indexesBlankSpace[i]);
        }
        */

        //indexesBlankSpace = [];

    });
    //console.log(jQuery.parseHTML("&mdash;")[0]["textContent"]);

    /*
    (5)
    */

    //************************************************************************************************************************************************
});
