/******************************************
Treehouse Techdegree: FSJS Project 3 - Interactive Form
******************************************/

$(document).ready(function () {
    /*
            (1) Put the first field in the `focus` state
            
            • Use jQuery to select the `Name` input element and place focus on it.
                

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
    $('#title').change(function () {
        if($(this).val() == 'other') {
            $('#other-title').show('slow');
        } else {
            $('#other-title').hide('slow');
        }
    });
});

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

$("#design").change(function(){
    console.log($(this));
    if($(this).val() === 'js puns'){
        $("#color option").eq(0).attr('selected');
        $("#color option:lt(4)").show();
        $("#color option").eq(4).attr('selected');
        $("#color option").eq(1).attr('selected', 'selected').show();
        $("#color option:gt(3)").hide();
        $("#color option").eq(0).hide();
    }
    if($(this).val() === 'heart js'){
        $("#color option").eq(0).attr('selected');
        $("#color option").eq(1).attr('selected');
        $("#color option").eq(4).attr('selected', 'selected').show();
        $("#color option:gt(3)").show();
        $("#color option").eq(0).hide();
        $("#color option:lt(4)").hide();
    }
});
