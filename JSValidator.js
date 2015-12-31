/*
JSValidator
DeSean Ellis
ELLISSOL Limited
Start: December 1 2015

Version 1: Complete - December 13 2015 [90 revisions]
Version 1.1 - Use CSS Styles to show success and error messages. December 29th, 2015
*/
var errorState = 0; // Global Variable [errorState], used to determine if validation error has already been caught.

// main validation object
var validate = {
    // Start: required function: see documentation
    required: function(id, options, placeholder) {

        //Start: Declaration of [options] Variables
        var successMessage = options["successMessage"]; // Message to display if no errors found.
        var errorMessage = options["errorMessage"]; // Message to display if error found.
        //End: Declaration of [options] Variables

        // Before error checking begins, remove all errors states, error message containers and error styles
        errorState = 0;
        $.fn.prepMsg(id);

        //Start: Placeholder substitution
        if (!!placeholder || placeholder === '') { // check if placeholder parameter has been passed.
            var custom = placeholder;
            errorMessage = $.fn.addPlaceholder(errorMessage, custom); //Replace [placeholder] in message with parameter passed.
            successMessage = $.fn.addPlaceholder(successMessage, custom); //Replace [placeholder] in message with parameter passed.
        }
        //End: Placeholder substitution

        //Start: Validation - Required

        //Start: Error checking
        var content = $(id).val(); // Store input field value.
        var contentSize = $.trim(content).length; // Calculate input field length against trimmed content.

        if (contentSize == 0) { // Determine if field value is null

            if (errorState != 1) {
                errorState = 1; // Set error state as true
                //Add error styles and message
                $(id).addClass("errorInput");
                $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                if ($(id).parents().hasClass("input-group")) {
                    $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                } else {
                    $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                }

            } else {
                if (errorState != 1) {
                    errorState = 0; // If no errors are found, set error state as false;
                    $.fn.prepMsg(id); //Remove all message states, prep for new message
                }
            } //End: Error checking
        } //End: Validation - Required
        $.fn.stateCheck(errorState, "#frm-err");
        return errorState; // return errorState variable to function
    }, // End: required function


    // Start: email function: see documentation
    email: function(id, options, placeholder) {

        //Start: Declaration of [options] Variables
        var successMessage = options["successMessage"]; // Message to display if no errors found.
        var errorMessage = options["errorMessage"]; // Message to display if error found.
        //End: Declaration of [options] Variables

        // Before error checking begins, remove all errors states, error message containers and error styles
        errorState = 0;
        $.fn.prepMsg(id);

        //Start: Placeholder substitution
        if (!!placeholder || placeholder === '') { // check if placeholder parameter has been passed.
            var custom = placeholder;
            errorMessage = $.fn.addPlaceholder(errorMessage, custom); //Replace [placeholder] in message with parameter passed.
            successMessage = $.fn.addPlaceholder(successMessage, custom); //Replace [placeholder] in message with parameter passed.
        }
        //End: Placeholder substitution

        //Start: Validation - E-Mail

        // Start: Error checking
        var content = $(id).val(); // Store input field value.
        if (content == "") { // Don't perform e-mail address validation if field is null
            return;
        }
        //var regex_str = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'; // Declaration of regular expression used to validate e-mail address
        //regex = new RegExp(regex_str, "i"); // Creation of regular expression object (RXO) based on regex variable. "i" - defines first match only
        regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        regex = regex.test(content); // Validate content against RXO

        if (!regex) { // Determine if e-mail is not valid and no errors have been caught thus far

            if (errorState != 1) {
                errorState = 1; //Set error state as true
                $.fn.prepMsg(id);
                $(id).addClass("errorInput");
                $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                if ($(id).parents().hasClass("input-group")) {
                    $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                } else {
                    $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                }
            }
        }

        if (regex == true) { // Determine if e-mail is valid

            if (errorState != 1) {
                errorState = 0; //Set error state as false
                $.fn.prepMsg(id); //Remove all message states, prep for new message
                if (successMessage != "") { // If successMessage defined in validation function options
                    $(id).addClass("successInput");
                    $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                    if ($(id).parents().hasClass("input-group")) {
                        $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                    } else {
                        $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                    }
                    //$(formGroup).addClass("has-success has-feedback"); //If true, add bootstrap classes
                    //$(messageContainer).html(successMessage); // Display error message
                    //$(id).after("<i style=\"right:30px;\" class=\"glyphicon glyphicon-ok form-control-feedback\"></i>");
                }

            } //End: Error checking
        } //End: Validation - E-Mail
        $.fn.stateCheck(errorState, "#frm-err");
        return errorState; // Return errorState to be used in function
    }, // End: email function

    //Start: general function: see documentation
    general: function(id, options, placeholder) {

        //Start: Declaration of [options] Variables
        var successMessage = options["successMessage"]; // Message to display if no errors found.
        var errorMessage = options["errorMessage"]; // Message to display if error found.
        var symbolsAllowed = options["characters"]["symbolsAllowed"];
        var symbolsDisallowed = options["characters"]["symbolsDisallowed"];
        //End: Declaration of [options] Variables

        // Before error checking begins, remove all errors states, error message containers and error styles
        errorState = 0;
        $.fn.prepMsg(id);

        // Start: Error checking
        var content = $(id).val(); // Store input field value.
        content = $.trim(content); // Trim input field value of spaces.
        if (content == "" && options["confirm"]["check"] != true) { // Don't perform general validation if field is null
            return;
        }

        //Start: Length Validation
        if (options["length"]["check"]) { //Check if length validation is required
            var contentSize = $.trim(content).length; //Determine content size
            var min = options["length"]["min"]; // Set min variable based on options 
            var max = options["length"]["max"]; // Set max variable based on options

            if (options["length"]["errorMessage"] != "") { // If errorMessage has been set for [length] then use it.
                errorMessage = options["length"]["errorMessage"];
                //Start: Placeholder substitution
                if (!!placeholder || placeholder === '') { // check if placeholder parameter has been passed.
                    var custom = placeholder;
                    errorMessage = $.fn.addPlaceholder(errorMessage, custom); //Replace [placeholder] in message with parameter passed.
                    successMessage = $.fn.addPlaceholder(successMessage, custom); //Replace [placeholder] in message with parameter passed.
                }
                //End: Placeholder substitution
            }

            // Start: Error checking (content size)
            if ((contentSize <= min || contentSize > max)) { // Check if content is lesss than min or greater than max

                if (errorState != 1) {
                    errorState = 1; //Set error state as true
                    $.fn.prepMsg(id);
                    $(id).addClass("errorInput");
                    $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                    if ($(id).parents().hasClass("input-group")) {
                        $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                    } else {
                        $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                    }

                }
            } else {
                if (errorState != 1) {
                    errorState = 0; //Set error state as false
                    $.fn.prepMsg(id); //Remove all message states, prep for new message
                    if (successMessage != "") {
                        $(id).addClass("successInput");
                        $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                        if ($(id).parents().hasClass("input-group")) {
                            $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                        } else {
                            $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                        }
                    }
                }
            } // End: Error checking (content size)
        } //End: Length Validation

        //Start: Confirm Validation
        if (options["confirm"]["check"]) { //Check if confirm validation is required
            var confirmContent = $(options["confirm"]["fieldId"]).val();
            //confirmContent = $.trim(confirmContent);
            if (options["confirm"]["errorMessage"] != "") { // If errorMessage has been set for [length] then use it.
                errorMessage = options["confirm"]["errorMessage"];
                //Start: Placeholder substitution
                if (!!placeholder || placeholder === '') { // check if placeholder parameter has been passed.
                    var custom = placeholder;
                    errorMessage = $.fn.addPlaceholder(errorMessage, custom); //Replace [placeholder] in message with parameter passed.
                    successMessage = $.fn.addPlaceholder(successMessage, custom); //Replace [placeholder] in message with parameter passed.
                }
                //End: Placeholder substitution
            }

            // Start: Error checking (confirm fields are equal)
            if (content != confirmContent) {

                if (errorState != 1) {
                    errorState = 1; //Set error state as true
                    $.fn.prepMsg(id);
                    $(id).addClass("errorInput");
                    $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                    if ($(id).parents().hasClass("input-group")) {
                        $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                    } else {
                        $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                    }
                }
            } else {
                if (errorState != 1) {
                    errorState = 0; //Set error state as true
                    $.fn.prepMsg(id); //Remove all message states, prep for new message
                    if (successMessage != "") {
                        $(id).addClass("successInput");
                        $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                        if ($(id).parents().hasClass("input-group")) {
                            $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                        } else {
                            $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                        }
                    }
                }
            } // End: Error checking (confirm fields are equal)
        } // End: Confirm Validation

        //Start: Characters Validation
        if (options["characters"]["check"]) { //Check if character validation is required

            var commonLetters = content.replace(/[^a-z]/g, "").length;
            var capitalLetters = content.replace(/[^A-Z]/g, "").length;
            var numbers = content.replace(/[^0-9]/g, "").length;
            var symbols = content.replace(/[A-Z]|[a-z]|[0-9]/g, "").length;

            if (options["characters"]["errorMessage"] != "") { // If errorMessage has been set for [characters] then use it.
                //Start: Placeholder substitution
                if (!!placeholder || placeholder === '') { // check if placeholder parameter has been passed.
                    var custom = placeholder;
                    errorMessage = options["characters"]["errorMessage"];
                    errorMessage = $.fn.addPlaceholder(errorMessage, custom); //Replace [placeholder] in message with parameter passed.
                    successMessage = $.fn.addPlaceholder(successMessage, custom); //Replace [placeholder] in message with parameter passed.
                }
                //End: Placeholder substitution
            }

            //Start: Error checking
            var specialCharacters = new RegExp('[\\\^\$\.\|\?\*\+\(\)\[\{]', "g");
            var symbolsListRegex = "(";
            for (i = 0; i < options["characters"]["symbolsList"].length; i++) {
                if (specialCharacters.test(options["characters"]["symbolsList"][i])) {
                    symbolsListRegex += "\\";
                }
                symbolsListRegex += options["characters"]["symbolsList"][i] + "|";
                //$("#symbolList").html("hi");
            }

            symbolsListRegex = symbolsListRegex.substring(0, symbolsListRegex.length - 1);
            symbolsListRegex += ")";

            symbolsListRegexAllowed = new RegExp(symbolsListRegex, "g");
            symbolsListRegexDisallowed = new RegExp(symbolsListRegex, "i");
            var symbolsListDisallowed = symbolsListRegexDisallowed.test(content);
            var symbolsListAllowed = content.replace(/[A-Z]|[a-z]|[0-9]/g, "");
            symbolsListAllowed = symbolsListAllowed.replace(symbolsListRegexAllowed, "").length;

            if (options["characters"]["check"]) { //Check if character validation is required
                var commonLetters = content.replace(/[^a-z]/g, "").length;
                var capitalLetters = content.replace(/[^A-Z]/g, "").length;
                var numbers = content.replace(/[^0-9]/g, "").length;
                var symbols = content.replace(/[A-Z]|[a-z]|[0-9]/g, "").length;

                if (((commonLetters < options["characters"]["commonLetters"][0] || commonLetters > options["characters"]["commonLetters"][1]) || (capitalLetters < options["characters"]["capitalLetters"][0] || capitalLetters > options["characters"]["capitalLetters"][1]) || (numbers < options["characters"]["numbers"][0] || numbers > options["characters"]["numbers"][1]) || (symbols < options["characters"]["symbols"][0] || symbols > options["characters"]["symbols"][1])) && errorState == 0) {

                    if (errorState != 1) {
                        errorState = 1; //Set error state as true
                        $.fn.prepMsg(id);
                        $(id).addClass("errorInput");
                        $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                        if ($(id).parents().hasClass("input-group")) {
                            $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        } else {
                            $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        }
                    }
                } else {
                    if (errorState != 1) {
                        errorState = 0; //Set error state as true
                        $.fn.prepMsg(id); //Remove all message states, prep for new message
                        if (successMessage != "") {
                            $(id).addClass("successInput");
                            $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                            if ($(id).parents().hasClass("input-group")) {
                                $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            } else {
                                $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            }
                        }
                    }

                }

                if ((symbolsAllowed == true && symbolsListAllowed > 0) && errorState == 0) {
                    if (errorState != 1) {
                        errorState = 1; //Set error state as true
                        $.fn.prepMsg(id);
                        $(id).addClass("errorInput");
                        $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                        if ($(id).parents().hasClass("input-group")) {
                            $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        } else {
                            $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        }
                    }

                } else {
                    if (errorState != 1) {
                        errorState = 0; //Set error state as true
                        $.fn.prepMsg(id); //Remove all message states, prep for new message
                        if (successMessage != "") {
                            $(id).addClass("successInput");
                            $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                            if ($(id).parents().hasClass("input-group")) {
                                $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            } else {
                                $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            }
                        }
                    }
                }

                if ((symbolsDisallowed == true && symbolsListDisallowed == true) && errorState == 0) {

                    if (errorState != 1) {
                        errorState = 1; //Set error state as true
                        $.fn.prepMsg(id);
                        $(id).addClass("errorInput");
                        $("label[for=" + $.fn.labelName(id) + "]").addClass("errorLabel");
                        if ($(id).parents().hasClass("input-group")) {
                            $(id).parent().parent().after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        } else {
                            $(id).after("<span class=\"returnMsg errorBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-warning-sign errorIcon\"></span>" + " " + errorMessage + "</span>");
                        }
                    }
                } else {
                    if (errorState != 1) {
                        errorState = 0; //Set error state as true
                        $.fn.prepMsg(id); //Remove all message states, prep for new message
                        if (successMessage != "") {
                            $(id).addClass("successInput");
                            $("label[for=" + $.fn.labelName(id) + "]").addClass("successLabel");
                            if ($(id).parents().hasClass("input-group")) {
                                $(id).parent().parent().after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            } else {
                                $(id).after("<span class=\"returnMsg successBlock\"><span id=\"returnIcon\" class=\"glyphicon glyphicon-ok successIcon\"></span>" + " " + successMessage + "</span>");
                            }
                        }
                    }
                } // End: Error checking
            }

        }
        $.fn.stateCheck(errorState, "#frm-err");
        return errorState;
    }, //End: Characters Validation
    version: "Version #1.1 - December 30th 2015"
};

$.fn.prepMsg = function(fieldId) {
    $(fieldId).removeClass("errorInput successInput");
    $("label[for=" + $.fn.labelName(fieldId) + "]").removeClass("errorLabel successLabel");
    if ($(fieldId).parents().hasClass("input-group")) {
        $(fieldId).parent().parent().siblings(".returnMsg").remove();
    } else {
        $(fieldId).siblings(".returnMsg").remove();
    }
    $('div div.inputWrapper').find(fieldId).unwrap();
    $(fieldId).wrap("<div class=\"inputWrapper\"></div>");
}

$.fn.addPlaceholder = function(errorMessage, placeholder) {
    var str = errorMessage;
    var result = str.replace("[placeholder]", placeholder);
    return result;
}

$.fn.stateCheck = function(currentState, container) {
    if (currentState == 1) {
        $(container).html("<span class=\"glyphicon glyphicon-exclamation-sign\"></span> There are errors with your submission, please review highlighted field(s) below.");
        $(container).addClass("alert alert-danger");
    } else {
        $(container).html("");
        $(container).removeClass("alert alert-danger");
    }
}

$.fn.labelName = function(fieldId) {
    return fieldId.replace("#", "");
}