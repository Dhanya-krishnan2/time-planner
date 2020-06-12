//here we are declaring all the variables and assignjing values to them
var plannedMessage = "";
var plannedTime = "";
var currentDate;
var currentTime;
var currentContainer;
var localArray = [];
var savedPlans;
var returnedPlanss;



$(window).on("load", function () {
    currentDate = moment().format("dddd MMM Do YYYY, h:mm a");
    $("#currentDay").append(currentDate);
    currentTime = moment().format("H");

    //we are creating a function which is used to store our appointments in the local storage by using JASON
    function ShowPlans() {
        savedPlans = JSON.parse(localStorage.getItem("appointments"));
        //we are using if loops here to check our plans if is not empty we are looping it through all the appt and we are saving that plans in an array
        if (savedPlans !== null) {
            for (i = 0; i < savedPlans.length; i++) {
                returnedPlanss = savedPlans[i];
                details = returnedPlanss.details;
                timeIndex = returnedPlanss.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }

    //we are calling the function here and looping through all the hours then we will check whether it is future, present, or past
    ShowPlans();

    for (i = 0; i <= 23; i++) {
        CurrentContainer = i;
        if (currentTime == i) {
            $('#' + CurrentContainer).addClass("present");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + CurrentContainer).addClass("past");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + CurrentContainer).addClass("future");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("future");
        }
    }
})

//here we are jQury event click to listen for a saving event

$(".saveBtn").click(function () {
    plannedMessage = $(this).parent('div').children('div').children('textarea').val();
    plannedTime = $(this).parent('div').parent().attr("id");
    appointment = {
        time: plannedTime,
        details: plannedMessage
    }
    // we are adding all the plans in the local storage
    localArray = JSON.parse(localStorage.getItem("appointments"));
    if (localArray === null) {
       localStorage.setItem('appointments', JSON.stringify([{ time: plannedTime, details: plannedMessage }]));
    }
    else {
        localArray.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(localArray));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + plannedMessage.addClass("textarea") + '</textarea>'));
})