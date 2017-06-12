let jobSelection = $("#title");
// When the page loads, give focus to the first text field.
window.onload = function() {
    $("#name").focus()
  }
  //**********************************
  //selecting the title job options
  //*********************************
  $('#other-title').hide();
  $('.basicinfo').append('<input type="text" id="other-field" placeholder="Your Job Role" name="otherjob">');
   $('#other-field').hide();
    // selecting the value of other

    $('#title').change(function(){
   if ($('#title option:selected').val() === "other") {
     $('#other-field').show();
   } else {
     $('#other-field').hide();
   }
 });

  //**************************
  // shirt selection colors
  // *************************
  let colors = $("#colors-js-puns");
  colors.hide();
  $('#design').change(function(){
    // if the option they select is js Puns
  if($("#design option:selected").val() === "js puns"){
    colors.show();
    // options for them to select colors
    $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
  }else if ($("#design option:selected").val() === "heart js") {
    colors.show();
    $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
  }


});
//***************************
//”Register for Activities
//***************************
var jsFrameworks = $(".js-frameworks");
	var jsLibraries = $(".js-libs");
	var express = $(".express");
	var nodeJS = $(".node");

  	// Add total cost of activities
	var totalCost = 0;
	$('.activities').append('<div id="total"></div>');

	var updateCost = function(cost) {
		totalCost += cost;
		document.getElementById("total").innerHTML = "Total: $" + totalCost;
	};
  // if main conference is checked 200 will be added otherwise the total will be 0;
	$("input[name='all']").change(function () {
		if ($(this).prop("checked")) {
			updateCost(200);
		} else {
			updateCost(-200);
		}
	});
  //if jsFrameworks is checked then disable the express beacuse they have the same time.
	jsFrameworks.change(function () {
		if ($(this).prop("checked")) {
			express.prop("disabled", true);

			express.parent().addClass("disabled");
			express.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');
			updateCost(100);
		} else {
			express.prop("disabled", false);

			express.parent().removeClass("disabled");
			express.parent().find('.unavailable').remove();
			updateCost(-100);
		}
	});

// if jsLibraries is checked then disable node beacuse of same time.
	jsLibraries.change(function () {
		if ($(this).prop("checked")) {
			nodeJS.prop("disabled", true);

			nodeJS.parent().addClass("disabled");
			nodeJS.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');
			updateCost(100);
		} else {
			nodeJS.prop("disabled", false);

			nodeJS.parent().removeClass("disabled");
			nodeJS.parent().find('.unavailable').remove();
			updateCost(-100);
		}
	});
//if express is checked disable jsFrameworks beacuse they have same time.
	express.change(function () {
		if ($(this).prop("checked")) {
			jsFrameworks.prop("disabled", true);

			jsFrameworks.parent().addClass("disabled");
			jsFrameworks.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');
			updateCost(100);
		} else {
			jsFrameworks.prop("disabled", false);

			jsFrameworks.parent().removeClass("disabled");
			jsFrameworks.parent().find('.unavailable').remove();
			updateCost(-100);
		}
	});
// if node is checked then disable jsLibraries due to same time .
	nodeJS.change(function () {
		if ($(this).prop("checked")) {
			jsLibraries.prop("disabled", true);

			jsLibraries.parent().addClass("disabled");
			jsLibraries.parent().append('<span class="unavailable">&nbsp;&nbsp;&nbsp;&nbsp;Unavailable</span>');
			updateCost(100);
		} else {
			jsLibraries.prop("disabled", false);

			jsLibraries.parent().removeClass("disabled");
			jsLibraries.parent().find('.unavailable').remove();
			updateCost(-100);
		}
	});
  // if they want to do  build tools is checked then 100 will be checked.
	$("input[name='build-tools']").change(function () {
		if ($(this).prop("checked")) {
			updateCost(100);
		} else {
			updateCost(-100);
		}
	});
// npm is selected 100 will be added.
	$("input[name='npm']").change(function () {
		if ($(this).prop("checked")) {

			updateCost(100);
		} else {

			updateCost(-100);
		}
	});
//********************
// PAYMENT INFO
//*********************
// hide paypal and bitcoin
$("#paypal, #bitcoin").hide();
//Set credit card as default method
$('#payment').val("credit card");

$('#payment').change(function(){
	if ($('#payment option:selected').val() === "paypal") {
    // hide credit card form and bitcoin info when paypal is selected.
		$('#credit-card, #bitcoin').hide();
		$('#paypal').show();
	} else if ($('#payment option:selected').val() === "bitcoin") {
    // hide credit card an paypal when bitcoin is selected.
		$('#credit-card, #paypal').hide();
		$('#bitcoin').show();
	} else {
    // else just credit card form .
		$('#credit-card').show();
		$('#paypal, #bitcoin').hide();
	}
});
//*****************
// form valdition
//****************
$('#name, #mail, #cc-num, #zip, #cvv, #other-field').keyup(function (){
	if ( $(this).val() === "")  {
		$(this).removeClass('success');
		$(this).addClass('error');
	} else {
		$(this).removeClass('error');
		$(this).addClass('success');
	}
});

var emailAddress = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
var creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
var zipCode = /^\d{5}(?:[-\s]\d{4})?$/;
var errorMessage ="";

$('form').prepend('<p id="error-message"></p>');
$('#error-message').hide();
$('form').submit(function (e){
	e.preventDefault();

	if ( $('#name').val() === "" ) {
		console.log("Error!");
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please ensure you have entered all required fields.";
		$('#name').addClass('error');
		$('#name').focus();
	} else if ( !emailAddress.test($('#mail').val()) ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please enter a valid email.";
		$('#mail').focus();
	} else if ( $(".activities > label > input:checked").length === 0 ) {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2> Please select at least one activity.";
		$('.activities').focus();
	} else if ( $("#payment").val() === "select_method" )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please select a payment method.";
		$('#payment').focus();
	} else if ( $("#payment").val() === "credit card" && !creditCard.test($("#cc-num").val()) )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a valid credit card number.";
		$('#cc-num').focus();
	} else if ( $("#payment").val() === "credit card" && !zipCode.test($("#zip").val()) )  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter your zip code.";
		$('#zip').focus();
	} else if ( $("#payment").val() === "credit card" && $("#cvv").val().length < 3)  {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "<h2>Error!</h2>Please enter a 3 digit CVV";
		$('#cvv').focus();
	} else {
		$("html, body").animate({scrollTop: 0}, "slow");
		errorMessage = "";
		alert("Thanks for registering! We'll see you at the Con!");
	}
	document.getElementById('error-message').innerHTML = errorMessage;
	$('#error-message').show();
});
