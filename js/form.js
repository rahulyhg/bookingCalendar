"use strict";

    $(document).ready(function() {




        //Ajax JSON
        var user = {
            "role": "NGO",
            "remainingHours": 3
        }

        var bookingJSON = {
            "firstSlot": "9:00",
            "lastSlot": "20:00",
            "defaultBookingpricePerSlot": 24.00,
            "defaultMinSlotTime": 4,
            "number": 123,
            "contactPageUrl": "http://www.google.com",
            "currencySign": "<i class='fa fa-eur'></i>",
            "bookingArray": [{
                "title": "Globalsoft Booking",
                "start": "2015-02-10T10:00:00",
                "end": "2015-02-10T20:00:00",
                "roomId": "1111"
            }, {
                "title": "Opium Works Booking",
                "start": "2015-02-15T11:00:00",
                "end": "2015-02-15T12:00:00",
                "roomId": "1111"
            },{
                "title": "DRT Works Booking",
                "start": "2015-02-15T14:00:00",
                "end": "2015-02-15T16:00:00",
                "roomId": "2222"
            }, {
                "title": "Private Booking",
                "start": "2015-02-15T14:00:00",
                "end": "2015-02-15T18:00:00",
                "roomId": "2222"
            }, {
                "title": "Private Booking",
                "start": "2015-26-15T11:00:00",
                "end": "2015-26-15T15:00:00",
                "roomId": "1111"
            }],
            "bookingTypes": [{
                "bookingTypeName": "Public Booking",
                "bookingTypeDescription": "Use this for public events",
                "bookingTypeImg": "https://cdn4.iconfinder.com/data/icons/whsr-january-flaticon-set/512/rocket.png"
            }, {
                "bookingTypeName": "Private Booking",
                "bookingTypeDescription": "Use this for private events",
                "bookingTypeImg": "http://zizaza.com/cache/big_thumb/iconset/582048/582062/PNG/256/like_a_flat_part_3/key_flat_web_icon_png_key_png_key_icon.png"
            }],
            "availableRooms": [{
                "roomId": "1111",
                "roomName": "Aphrodite Room",
                "roomImg": "http://trinityriver.audubon.org/sites/default/files/photos/conference_room.jpg",
                "roomDescription": "Lorem, ipsum solor dit amet,dit amet, ",
                "roomCapacity": 90,
                "pricePerSlot": 30.00,
                "minSlotHours": 4,
                "roomAvailable": true
            }, {
                "roomId": "2222",
                "roomName": "Kostas Room",
                "roomImg": "http://trinityriver.audubon.org/sites/default/files/photos/conference_room.jpg",
                "roomDescription": "Lorem, ipsum solor dit amet,dit amet, ",
                "roomCapacity": 124,
                "pricePerSlot": 40.00,
                "minSlotHours": 4,
                "roomAvailable": false
            }],
            "bookingCategories": [{
                "bookingCategoryName": "Yoga Class"
            }, {
                "bookingCategoryName": "Project Planning"
            }, {
                "bookingCategoryName": "Wood Carving"
            }, ],
            "bookingOptions": [{
                "optionId": "87400",
                "optionName": "Projector",
                "optionPrice": 89.90
            }, {
                "optionId": "32123",
                "optionName": "Babysitting",
                "optionPrice": 59.90
            }, {
                "optionId": "65999",
                "optionName": "Translator",
                "optionPrice": 39.90
            },{
                "optionId": "44133",
                "optionName": "Catering",
                "optionPrice": 39.90
            } ],
            "calendarOptions": {
                "stepHour": 1,
                "c": "d",
                "e": "f"
            }
        }

        var stepHour = bookingJSON.calendarOptions.stepHour;
        var defaultBookingpricePerSlot = bookingJSON.defaultBookingpricePerSlot;
        var defaultMinSlotTime = bookingJSON.defaultMinSlotTime;
        //IMPORTANT NOTE FOR STEPHOUR VALUE: 
        //Only hour-intervals can be used - using minutes as step will cause this whole thing to fail. Many functions assume that hours are used.
        var firstSlot = bookingJSON.firstSlot;
        var lastSlot = bookingJSON.lastSlot;
        var currencySign = bookingJSON.currencySign;
        var bookingArray = bookingJSON.bookingArray;
        var bookingTypes = bookingJSON.bookingTypes;
        var availableRooms = bookingJSON.availableRooms;
        var bookingCategories = bookingJSON.bookingCategories;
        var bookingOptions = bookingJSON.bookingOptions;
        var contactPageUrl = bookingJSON.contactPageUrl;


        //DOM handles
        var stepForm = $("#stepForm");
        var allStates = $(".state");

        var calendar = $("#calendar");

        var formBackBtn = $("#formBackBtn");
        var nextBtn = $("#nextBtn");
        var cancelBtn = $("#cancelBtn");
        var formErrMsg = $("#formErrMsg");
        var roomNameTxt = $("#roomNameTxt");
        var headingDateLbl = $("#headingDateLbl");
        var headingArrTimeTxt = $("#headingArrTimeTxt");
        var headingDepTimeTxt = $("#headingDepTimeTxt");
        var formSpinner = document.getElementById('formSpinner'); //spin.js does not accept jQuery, using vanilla instead
        var timepicker1 = $("#timepicker1");
        var timepicker2 = $("#timepicker2");
        var roomContainer = $("#roomContainer");
        var bookingTypeContainer = $("#bookingTypeContainer");
        var bookingCategoriesDropdown = $("#bookingCategoriesDropdown");
        var bookingOptionsContainer = $("#optionsContainer");
        var selectedEventTitle = $("#bookingNameInput");
        var selectedEventDescription = $("#bookingDescInput");
        var optionsContainer = $("#optionsContainer");

        var userNameInput = $("#usernameInput");
        var userOrganizationInput = $("#userOrganizationInput");
        var userPhoneInput = $("#userPhoneInput");
        var userEmailInput = $("#userPhoneInput");

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();


        var spinnerOpts = {
            lines: 20,
            length: 0,
            width: 5,
            radius: 15,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#fff',
            speed: 3,
            trail: 0,
            shadow: false,
            hwaccel: true,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
        };

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek'
            },
            selectConstraint:{
            	start: firstSlot, // a start time (10am in this example)
   				 end: lastSlot
            },
            lang: 'en',
		    eventLimit: 2, // If you set a number it will hide the itens
		    eventLimitText: "More",
            ignoreTimezone: true,
            selectHelper: true,
            selectOverlap: true,
            allDaySlot: false,
            minTime: firstSlot,
            maxTime: lastSlot,
            slotDuration: '0' + stepHour + ':00:00',
            selectable: true,
            defaultView: 'agendaWeek',
            events: bookingArray,
            dayClick: function(date) {
                $('#calendar').fullCalendar('gotoDate', date);
                $('#calendar').fullCalendar('changeView', 'agendaWeek');
            },
            timeClick: function() {
                //alert("clicktime")
            },eventRender: function (event, element) {
			    $(element).css('pointer-events','none');
			},
            select: function(start, end, jsEvent, view) {
                if (view.name === "agendaWeek") {
                               
		            $(calendar).css({
					   'opacity' : '0.3',
					   'pointer-events' : 'none'
					});
                    form.calendarArrDate = start.format('YYYY-MM-DD');
                    form.calendarDepDate = end.format('YYYY-MM-DD');
                    form.show(null, start, end);
                }
            }
        });

        $(timepicker1).timepicker({
            template: 'dropdown',
            showSeconds: false,
            showMeridian: false,
            defaultTime: false
        });

        $(timepicker1).css('pointer-events', 'none'); //lock this since it's not user changeable

        $(timepicker2).timepicker({
            minuteStep: stepHour * 60,
            template: 'dropdown',
            showSeconds: false,
            showMeridian: false,
            defaultTime: false
        });


        $(cancelBtn).click(function() {
            $(calendar).css({
			   'opacity' : '1.0',
			   'pointer-events' : 'all'
			});
            form.hide();
        });

        $(nextBtn).click(function() {
            form.switchState('next');
        });

        $(formBackBtn).click(function() {
            form.switchState('previous');
        });


        $(confirmBookingBtn).click(function() {
            alert("Redirecting to payment form IF 'Guest' or 'NGO with no available hours'. If user is admin the booking is created now. End of booking demo");
            $("#calendar").css('opacity', '1');
            $('.stepForm').fadeOut();
        });


        $("#createBooking").click(function(){
            var start = moment('2015-02-15T11:00:00');
            var end = moment('2015-02-15T18:00:00')
            form.calendarArrDate = start.format('YYYY-MM-DD');
            form.calendarDepDate = end.format('YYYY-MM-DD');
            form.show(null, start, end);
        })

        var form = {

            //vars
            mode: "booking", //never changes for this module
            selectedBookingType: null,
            state: 1, //default state(view) of form
            calendarArrDate: null,
            calendarDepDate: null,
            arrDate: null, //arrival time - selectable on calendar - also displayed on form
            depDate: null, //departure time - selectable on form 
            steppedUpTime: null, //arr time + step -initial time of departure timepicker
            selectedRoomId: null, //currently selected room
            selectedRoomName: null,
            selectedEventCategory: null,
            selectedEventTitle: null,
            selectedEventDescription: null,
            selectedUserName: null,
            selectedUserOrganizationName: null,
            selectedUserPhoneNumber: null,
            selectedUserEmailAddress: null,
            selectedOptions: [],
            bookingPrice: null,
            optionsPrice: null,
            totalPrice: null,
            errHideDelay: 3000, //time to show err msg before hiding


            //methods

            init: function() {
                this.appendRooms();
                this.appendBookingTypes();
                this.appendBookingCategories();
                this.appendOptions();

                window.spinner = new Spinner(spinnerOpts).spin(formSpinner);
                this.waitForm(false);
                hideFormBackBtn(true);
            },

            resetForm: function() {

            	//reset object's K/V pairs
                this.state = 1;
                this.mode = "booking";
                this.selectedBookingType = null;
                this.steppedUpTime = null;
                this.selectedRoomId = null;
                this.selectedRoomName = null;
                this.selectedEventCategory = null;
                this.selectedEventTitle = null;
                this.selectedEventDescription = null;
                this.selectedUserName = null;
	            this.selectedUserOrganizationName = null;
	            this.selectedUserPhoneNumber = null;
	            this.selectedUserEmailAddress = null;
	            this.selectedOptions = [];
	            this.bookingPrice = null;
	            this.optionsPrice = null;
	            this.totalPrice = null;

	            //uncheck all checkboxes, clear all inputs
                $('#stepForm input').not(':button, :submit, :reset, #timepicker1, #timepicker2')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');

            },

            showState: function(stateNum) {
                $(allStates).css('display', 'none');
                $(".state" + stateNum).css('display', 'block');
            },

            show: function(stateNum, startDate, endDate) {


                if (stateNum === null)
                    var stateNum = "1";

                $(allStates).css('display', 'none');
                $(".state" + stateNum).css('display', 'block');
                $(stepForm).fadeIn();

				hideNext(true);

                var startTimeFormatted = startDate.format('H:mm');
                $(timepicker1).timepicker('setTime', startTimeFormatted);

                this.steppedUpTime = endDate.format('H:mm');
                $(timepicker2).timepicker('setTime', this.steppedUpTime);


                $(headingDateLbl).text(endDate.format('MMMM Do YYYY'));
                $(headingArrTimeTxt).text(startDate.format('H:mm'));
                $(headingDepTimeTxt).text(endDate.format('H:mm'));
                hideNext(true);

            },
            hide: function(){

            	this.resetForm();	

                $(stepForm).fadeOut(200, function() {
                    $(allStates).css('display', 'none');
                    $('.state' + this.state).css('display', 'block');
                });
            },

            switchState: function(direction) {

                if (direction === 'next') {
                    this.state++;
                }
                if (direction === 'previous') {
                    if (this.state > 1) {
                        this.state--;
                    } else {
                        return false;
                    }
                }


                this.waitForm(true);

                $(allStates).css('display', 'none');
                $(".state" + form.state).slideDown(300);
                switch (this.state) {

                    case 1:
                        hideFormBackBtn(true);
                        hideNext(true);
            			this.resetForm();
                        //data capture for previous state
                        //happens .on click of event-type row


                        break;

                    case 2:

                    	hideNext(false);
                        hideFormBackBtn(false);

                        break;

                    case 3:
                        hideNext(true);
                        //data capture of previous state
                        var finalArrTime = $(timepicker1).val();
                        var finalDepTime = $(timepicker2).val();

                        if (finalArrTime.split(":")[0] < 10) //timepicker.val gives 9:00 if its 9am, we need 09:00.
                            finalArrTime = "0" + finalArrTime;
                        if (finalDepTime.split(":")[0] < 10) //same as above. this doesn't look too good.
                            finalDepTime = "0" + finalDepTime;

                        this.arrDate = this.calendarArrDate + 'T' + finalArrTime + ":00"; //final save of arrTime in ISO8601
                        this.depDate = this.calendarDepDate + 'T' + finalDepTime + ":00"; //final save of depTime in ISO8601

                        $(allRoomRows).remove();
                        this.appendRooms();

                        break;

                    case 4:

                        hideFormBackBtn(false);
                        hideNext(false);

                        if (this.selectedBookingType === "Private Booking") {
                            disableBookingCatDropdown(true);
                        }
                        if (this.selectedBookingType === "Public Booking") {
                            disableBookingCatDropdown(false);
                        }

                        break;
                    case 5:
                        //data capture for previous state
                        hideNext(false);
                        this.selectedEventCategory = $(bookingCategoriesDropdown).val();
                        this.selectedEventTitle = $(selectedEventTitle).val();
                        this.selectedEventDescription = $(selectedEventDescription).val();

                        //options capture happens via their click handler - see selectedOptions array property in this object.

                        this.calculatePrice();

                        break;
                    case 6:
                        this.selectedUserName = $(userNameInput).val();
                        this.selectedUserOrganizationName = $(userOrganizationInput).val();
                        this.selectedUserPhoneNumber = $(userPhoneInput).val();
                        this.selectedUserEmailAddress = $(userEmailInput).val();
                        console.log(JSON.stringify(form));
                        hideNext(true);
                        break;
                    default:
                        console.log('switchState form. method defaulted switch case')
                }
            },

            setSelection: function(unix) {

            },

            //appends available rooms to form/room container
            appendBookingTypes: function() {
                var activeClass = ""; //used internally don't change
                if (bookingTypes.length < 1) {
                    $(bookingContainer).append("<p class='noDataPar'>An error has occured when fetching booking types. Please try again</p>");
                    return;
                }
                for (var i = 0; i < bookingTypes.length; i++) {
                    var bookingTypeName = bookingTypes[i].bookingTypeName;
                    var bookingTypeDesc = bookingTypes[i].bookingTypeDescription;
                    var bookingTypeImg = bookingTypes[i].bookingTypeImg;

                    $(bookingTypeContainer).append("<div class='listRow bookingTypeRow' data-bookingTypeName='" + bookingTypeName + "''><div class='listRowSnippet bookingTypeRowSnippet'><img class='listRowThumb bookingTypeRowThumb' src='" + bookingTypeImg + "'/><div class='listRowSnippetTxtContainer bookingTypeSnippetTxtContainer'><div class='listRowSnippetTxtTitle bookingTypeSnippetTxtTitle'>" + bookingTypeName + "</div><div class='listRowSnippetTxtDescription bookingTypeSnippetTxtDescription'>" + bookingTypeDesc + "</div></div></div></div>");
                }

                window.allBookingTypeRows = $('.bookingTypeRow');
                $('body').off("click",  '.bookingTypeRow').on('click', '.bookingTypeRow', function() { 
                    form.selectedBookingType = $(this).attr('data-bookingTypeName');
                    form.switchState('next');
                });
            },

            //appends available rooms to form/room container
            appendRooms: function() {
                var activeClass = ""; //used internally don't change
                if (availableRooms.length < 1) {
                    $(roomContainer).append("<p class='noDataPar'>No rooms available for this date</p>");
                    return;
                }
                for (var i = 0; i < availableRooms.length; i++) {
                    var roomId = availableRooms[i].roomId;
                    var roomName = availableRooms[i].roomName;
                    var roomDesc = availableRooms[i].roomDescription;
                    var roomImg = availableRooms[i].roomImg;
                    var roomCapacity = String(availableRooms[i].roomCapacity);
                    var roomAvailable = determineAvailability(roomId, this.arrDate, this.depDate);
                    var availBadgeSnippet;

                    if (roomAvailable) {
                        availBadgeSnippet = "<div class='availBadge availableBadge'><span>Available</span></div>"
                    } else {
                        availBadgeSnippet = "<div class='availBadge unavailableBadge'><a href='" + contactPageUrl + "' target='_blank'><span>Contact for availability</span></a></div>"
                    }

                    $(roomContainer).append("<div class='listRow roomRow' data-roomId='" + roomId + "' data-roomName='" + roomName + "''><div class='listRowSnippet roomSnippet' ><img class='listRowThumb roomThumb' src='" + roomImg + "'/><div class='listRowSnippetTxtContainer roomSnippetTxtContainer'><div class='listRowSnippetTxtTitle roomSnippetTxtTitle'>" + roomName + "<span class='roomCapacityLbl'>Capacity: </span><span class='roomCapacityTxt'>" + roomCapacity + "</span></div><div class='listRowSnippetTxtDescription roomSnippetTxtDescription'>" + roomDesc + "</div></div>" + availBadgeSnippet + "</div></div>");
                }

                this.selectedRoomId = availableRooms[0].roomId;
                this.selectedRoomName = availableRooms[0].roomName;

                window.allRoomRows = $('.roomRow');
                $('body').off("click",  '.roomRow').on('click', '.roomRow', function() {
                    form.selectedRoomId = $(this).attr('data-roomId');
                    form.selectedRoomName = $(this).attr('data-roomName');
                    $(roomNameTxt).text(this.selectedRoomName);

                    form.switchState('next');
                });
            },

            appendBookingCategories: function() {
                for (var i = 0; i < bookingCategories.length; i++) {
                    var bookingCategoryName = bookingCategories[i].bookingCategoryName;
                    $(bookingCategoriesDropdown).append("<option value='" + bookingCategoryName + "'>" + bookingCategoryName + "</option>");
                };
            },

            appendOptions: function() {

                for (var i = 0; i < bookingOptions.length; i++) {
                    var optionId = bookingOptions[i].optionId;
                    var optionName = bookingOptions[i].optionName;
                    var optionPrice = String(bookingOptions[i].optionPrice.toFixed(2));

                    $(bookingOptionsContainer).append("<label for='" + optionName + "'><input type='checkbox' id='" + optionId + "' class='bookOptionCheckbox' name='" + optionName + "' value='" + optionName + "' data-price='" + optionPrice + "' data-optionId='" + optionId + "'/>&nbsp;" + optionName + "<span class='optionPriceTxt'>+ " + currencySign + "" + optionPrice + "</span></label><br>");

                    $('body').on('click', '#' + optionId, function() {
                        var thisId = String($(this).attr('id'));
                        if ($(this).is(":checked")) {
                            form.selectedOptions.push(thisId);
                        } else {
                            removeItemFromArray(thisId, form.selectedOptions);
                        }

                    });
                };
            },

            showError: function(msg) {

                $(formErrMsg).text(msg);
                $(formErrMsg).css('display', 'block');

                setTimeout(function() {
                    $(formErrMsg).css('display', 'none');
                }, this.errHideDelay);


            },

            //shows/hides AJAX spinners, also interlocks the form to prevent user actions during wait
            waitForm: function(bool) {
                if (bool) {
                    $(stepForm).css('pointer-events', 'none');
                    hideNext(true);
                    $(formSpinner).fadeIn();
                    setTimeout(function() {
                        $(stepForm).css('pointer-events', 'all');
                        hideNext(false);
                        $(formSpinner).fadeOut();
                    }, 500);
                } else {
                    $(stepForm).css('pointer-events', 'all');
                    hideNext(false);
                    $(formSpinner).fadeOut();
                }
            },

            calculatePrice: function() {
                //calc duration - NOTE: Only hours can be used here.
                var pricePerSlot = defaultBookingpricePerSlot;
                var minSlotTime = defaultMinSlotTime;
                var optionsPrice = 0;
                var arrDateHoursAbs = parseInt(moment(this.arrDate).format("HH"));
                var depDateHoursAbs = parseInt(moment(this.depDate).format("HH"));

                var duration = depDateHoursAbs - arrDateHoursAbs;
                for (var i = 0; i < availableRooms.length; i++) {
                    if (availableRooms[i].roomId === form.selectedRoomId) {
                        pricePerSlot = availableRooms[i].pricePerSlot;
                        minSlotTime = defaultMinSlotTime;
                    }
                };

                for (var i = 0; i < form.selectedOptions.length; i++) {
                    var optionId = form.selectedOptions[i];
                    for (var i = 0; i < bookingOptions.length; i++) {
                        if (bookingOptions[i].optionId === optionId) {
                            optionsPrice = optionsPrice + parseFloat(bookingOptions[i].optionPrice);
                        }
                    };
                };

                var bookingPrice = null;
                if ((duration / minSlotTime) <= 1) {
                    bookingPrice = pricePerSlot;
                } else {
                    console.log("more than 4 hours", Math.ceil((duration / minSlotTime)));
                    bookingPrice = Math.ceil((duration / minSlotTime)) * pricePerSlot; //round up
                }

                this.bookingPrice = bookingPrice;
                this.optionsPrice = optionsPrice;
                this.totalPrice = bookingPrice + optionsPrice;

                console.log("Booking Price: " + this.bookingPrice.toFixed(2));
                console.log("Options Price: " + this.optionsPrice.toFixed(2));
                console.log("Total Price: " + this.totalPrice.toFixed(2));
            }

        }


        form.init();


        //watch times on timepickers - stop user from maxing it or going below arrival time
        var origColorTimepickerColor = $(timepicker2).css('color');
        $(timepicker2).bind('change', function() {

            var arrTimeAbs = absoluteTime($(timepicker1).val());
            var depTimeAbs = absoluteTime($(this).val());
            var openTimeAbs = absoluteTime(firstSlot);
            var closeTimeAbs = absoluteTime(lastSlot);

            $(headingDepTimeTxt).text($(this).val());

            if (depTimeAbs <= openTimeAbs || depTimeAbs >= (closeTimeAbs + stepHour) || depTimeAbs <= arrTimeAbs) {
                $(timepicker2).css('color', 'red');
                form.showError('Depart time is sooner than arrival');
                hideNext(true);
            } else {
                $(timepicker2).css('color', origColorTimepickerColor);
                hideNext(false);
            }

            if (depTimeAbs >= (closeTimeAbs + stepHour)) {
                form.showError("Depart time is later than last available slot");
            }


        });


        //takes a string & an array and removes that item from the array
        function removeItemFromArray(itemName, arr) {
            var itemName = String(itemName);
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i] === itemName) {
                    arr.splice(i, 1);
                }
            }
        }

        //returns true if a room is available for a specified start/end time - checks JSON.bookingArray with moment-date-range.js
        function determineAvailability(roomId, startTime, endTime) {
            var checkFlag = true;
            for (var i = 0; i < bookingArray.length; i++) {
                if (bookingArray[i].roomId === roomId) {

                    var bookingStart = String(bookingArray[i].start);
                    var bookingEnd = String(bookingArray[i].end);
                    var startTime = String(startTime);
                    var endTime = String(endTime);


                    if (i === 1) {
                        console.log(bookingStart);
                        console.log(bookingEnd);
                        console.log(startTime);
                        console.log(endTime);
                    }

                    var bookingRange = moment().range(bookingStart, bookingEnd);
                    var checkRange = moment().range(startTime, endTime);
                    if (checkRange.overlaps(bookingRange)) {
                        checkFlag = false;
                    }
                }
            };
            return true;
        }


        function disableBookingCatDropdown(bool) {
            if (bool) {
                $(bookingCategoriesDropdown).prop("disabled", true);
                $(bookingCategoriesDropdown).css("opacity", "0.5");
                $(bookingCategoriesDropdown).val(0);
            } else {
                $(bookingCategoriesDropdown).prop("disabled", false);
                $(bookingCategoriesDropdown).css("opacity", "1.0");
            }
        }


        function hideNext(bool) {
            if (bool) {
                $(nextBtn).css('visibility','hidden');
            } else {
                $(nextBtn).css('visibility','visible');
            }
        }

        function hideFormBackBtn(bool) {
            if (bool) {
                $(formBackBtn).css('visibility', 'hidden');
            } else {
                $(formBackBtn).css('visibility', 'visible');
            }
        }


        //converts times to absolute hours, e.g 08:30->8
        function absoluteTime(time) {
            var thisTime = time.split(":");
            if (thisTime[0] === "0")
                thisTime.slice(1); //if 0830 make it 830.
            var returnTime = thisTime[0];
            return parseInt(returnTime);
        }

        
        //returns true if browser is mobile
        window.mobilecheck = function() {
          var check = false;
          (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        }

        //turn off jquery effects(fadeIn/Out etc if browser is mobile)
        if(mobilecheck())
            jQuery.fx.off = true


    });