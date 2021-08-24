
var currentMonth = new Month(2017, 2); // March 2017
document.addEventListener("DOMContentLoaded", setUP, false); // once DOM is loaded, set up calender look
document.getElementById("popup").style.visibility = "hidden";
document.getElementById("myAddForm").style.visibility = "hidden";
document.getElementById("manageEventsCatsButton").style.visibility = "hidden";
document.getElementById("delete_Event_Button").addEventListener('click', deleteEvent);
// Change the month when the "next or previous buttons" button is pressed

document.getElementById("prevMonth").addEventListener("click", function(){
  currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
  updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);

document.getElementById("nextMonth").addEventListener("click", function(){
  currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
  updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
  
}, false);
 
 
//Sets up all the calendar days, loads all relevant events if a user is logged in etc
//it should be called whenever someone 1) logs in 2) loads the page 3) adds /edits/deletes an event 
function setUP(){
  updateCalendar();
  document.getElementById("myAddForm").style.visibility = "hidden";
  document.getElementById("myEditForm").style.visibility = "hidden";
  document.getElementById("loginForm").style.visibility = "hidden";
  document.getElementById("createUserForm").style.visibility = "hidden";
  
}
//enters all the users events into the calender (for the current month)
//also adds an edit and delete button to each item
function calenderEvents(eventJSON, i){
  var markup = "" + i;
  
  var relevantDiv = document.getElementById("date"+i);
  if(relevantDiv.className == "active" && eventJSON.titles[0] !== null)
  {
      markup = markup + "<ul>";
      var titles = eventJSON.titles;
      //var locations = eventJSON.locations;
      var times = eventJSON.times;
      var ids = eventJSON.ID;
      var colors = eventJSON.colors;
      if(titles !== null)
      {
        for(var j = 0 ; j < titles.length ; j++)
        {
          console.log(colors[j]);
          console.log(colors);
          //set style *********************************
          markup = markup + "<li style = background-color:"+colors[j] + " value = " + ids[j] + " id = " + ids[j]+"edit> <span class=" + "event" + "  >" + titles[j] +  " </span> <span class="+ "time" + ">" + times[j] + "</span>";
        }
      }
      markup = markup + "</ul>";
      relevantDiv.innerHTML = markup;
      if(ids !== null)
      {
        for(var k = 0 ; k < ids.length ; k++)
        {
          document.getElementById(ids[k]+"edit").addEventListener('click', editEvent);
          
        }
      }
  } 
}


// This updateCalendar() function only alerts the dates in the currently specified month.  You need to write
// it to modify the DOM (optionally using jQuery) to display the days and weeks in the current month.

//updateCalender currently will set up all the days of the week, and each day
// if the user has logged in, it will also load all the user's events for teh month
function updateCalendar(){
  //loads days of week
  var calenderHTML= "<tr> <td><strong>Su</strong></td> <td><strong>Mo</strong></td> <td><strong>Tu</strong></td> <td><strong>We</strong></td> <td><strong>Th</strong></td> <td><strong>Fr</strong></td> <td><strong>Sa</strong></td>";
  //gets the current month
  document.getElementById("month").innerHTML = convertNumToMonth(currentMonth.month);
  //current year
  document.getElementById("year").innerHTML = currentMonth.year;
  
  //array of weeks in month
  var weeks = currentMonth.getWeeks();
  
  //various tracker variables for aesthetic 
  var firstDayOfMonthReached = false;
  var lastDayOfMonthReached = true;
  
  //counters
  var i = 0;
  var numactiveDates = 0;
  for(var w in weeks){
    if(weeks.hasOwnProperty(w)){
      var days = weeks[w].getDates(); 
        for(var d in days){
          if (days.hasOwnProperty(d)) {
            var markup = days[d].getDate(); // the current day that is being looped on 
            if(i%7 === 0 ) //you have reached the end of a week so end a the row and start a new one
            {
                calenderHTML = calenderHTML + "</tr> <tr>"; // creates new row every 7 days 
            }
            //aesthetic
            if(days[d].getDate() == 1 && firstDayOfMonthReached === false)
            {
              firstDayOfMonthReached = true;
              lastDayOfMonthReached = false;
            }
            //aestethic
            else if(days[d].getDate() == 1 && firstDayOfMonthReached === true)
            {
              lastDayOfMonthReached = true;
            }
            //appends inactive cells ( not relevant to current month)
            if((firstDayOfMonthReached === false && lastDayOfMonthReached === true)  || (firstDayOfMonthReached === true && lastDayOfMonthReached === true))
            {
              calenderHTML = calenderHTML + "<td class = days><div  class= " + " inactive" + ">" + markup + " </div>  </td> ";
            
            }
            else if(firstDayOfMonthReached === true && lastDayOfMonthReached === false )
            {
              calenderHTML = calenderHTML + "<td class = days><div id = date" + markup + " + class= " + " active" + ">" + markup + " </div>  </td> ";
              numactiveDates ++;
            }
            i++;
          }
        }
        while(i%7 !== 0) //completes the row
        {
          calenderHTML = calenderHTML + "<td></td>";
          i++;
        }
        calenderHTML= calenderHTML + "</tr>";
        document.getElementById("calender").innerHTML= calenderHTML; // creates everthing 
        
        for(var k = 0 ; k < numactiveDates ; k++)
        {
          if(document.getElementById("isUserLoggedIn").value == "true"){
            loadEvents(k+1,currentMonth.month+1,currentMonth.year, k+1);
          }
        }
    }
  }
  
}

function convertNumToMonth(number){ // converts month number to actual dates
  switch(number){
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";  
  }
}


(function () {
  "use strict";

  /* Date.prototype.deltaDays(n)
   * 
   * Returns a Date object n days in the future.
   */
  Date.prototype.deltaDays = function (n) {
    // relies on the Date object to automatically wrap between months for us
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
  };

  /* Date.prototype.getSunday()
   * 
   * Returns the Sunday nearest in the past to this date (inclusive)
   */
  Date.prototype.getSunday = function () {
    return this.deltaDays(-1 * this.getDay());
  };
}());

/** Week
 * 
 * Represents a week.
 * 
 * Functions (Methods):
 *  .nextWeek() returns a Week object sequentially in the future
 *  .prevWeek() returns a Week object sequentially in the past
 *  .contains(date) returns true if this week's sunday is the same
 *    as date's sunday; false otherwise
 *  .getDates() returns an Array containing 7 Date objects, each representing
 *    one of the seven days in this month
 */
function Week(initial_d) {
  "use strict";

  this.sunday = initial_d.getSunday();
    
  
  this.nextWeek = function () {
    return new Week(this.sunday.deltaDays(7));
  };
  
  this.prevWeek = function () {
    return new Week(this.sunday.deltaDays(-7));
  };
  
  this.contains = function (d) {
    return (this.sunday.valueOf() === d.getSunday().valueOf());
  };
  
  this.getDates = function () {
    var dates = [];
    for(var i=0; i<7; i++){
      dates.push(this.sunday.deltaDays(i));
    }
    return dates;
  };
}

/** Month
 * 
 * Represents a month.
 * 
 * Properties:
 *  .year == the year associated with the month
 *  .month == the month number (January = 0)
 * 
 * Functions (Methods):
 *  .nextMonth() returns a Month object sequentially in the future
 *  .prevMonth() returns a Month object sequentially in the past
 *  .getDateObject(d) returns a Date object representing the date
 *    d in the month
 *  .getWeeks() returns an Array containing all weeks spanned by the
 *    month; the weeks are represented as Week objects
 */
function Month(year, month) {
  "use strict";
  
  this.year = year;
  this.month = month;
  
  this.nextMonth = function () {
    return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
  };
  
  this.prevMonth = function () {
    return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
  };
  
  this.getDateObject = function(d) {
    return new Date(this.year, this.month, d);
  };
  
  this.getWeeks = function () {
    var firstDay = this.getDateObject(1);
    var lastDay = this.nextMonth().getDateObject(0);
    
    var weeks = [];
    var currweek = new Week(firstDay);
    weeks.push(currweek);
    while(!currweek.contains(lastDay)){
      currweek = currweek.nextWeek();
      weeks.push(currweek);
    }
    return weeks;
  };
}


function showAddEventForm() {
  
    var popup = document.getElementById("myAddForm");
  if( popup.style.visibility == 'hidden')
  {
    popup.style.visibility = 'visible';
  }
  else{
    popup.style.visibility = 'hidden';
  }
}
function populateCategoryForm(eventJSON,elementID)
{
  var categorySLECETOR = document.getElementById(elementID);
  var categoryHTML = "";
  var categories = eventJSON.categories;
  var colors = eventJSON.colors;

  
  var existingCatChecks = document.getElementById("existingCategoriesCheckBoxes");
  var existingCatsChecksHTML = "<ul>";
  if(categories !== null)
  {
    for(var j = 0; j < categories.length; j++)
    {
      existingCatsChecksHTML = existingCatsChecksHTML+ "<li style= background-color:"+colors[j] +"> <input type="+" checkbox" +" value=" + categories[j] + " checked="+"checked"+">" + categories[j] + "</li>";
      categoryHTML = categoryHTML + "<option value = "+ categories[j] + ">" + categories[j] + "</option>";
  
    }
  }
  existingCatsChecksHTML= existingCatsChecksHTML + "</ul>";
  existingCatChecks.innerHTML = existingCatsChecksHTML;

  categorySLECETOR.innerHTML = categoryHTML;
  
  

  
}


function populateEventForm(eventJSON) {
  
    var popup = document.getElementById("myEditForm");

  if( popup.style.visibility == 'hidden')
  {
    popup.style.visibility = 'visible';
    
    var days = eventJSON.day;
    if(days < 10)
    {
      days = "0" + days;
    }
    var month = eventJSON.month;
    if(month <10)
    {
      month = "0" + month;
    }
    var time = eventJSON.time;
    if(time.substring(1,2) == ":")
    {
      time = "0"+ time;
    }
    document.getElementById('edit_Event_Button').value = eventJSON.ID;
    document.getElementById('editEventTitle').value = eventJSON.title;
    document.getElementById('editEventDate').value = eventJSON.year + "-" + month + "-" + days;
    document.getElementById('editEventTime').value = time;
    document.getElementById('editEventLocation').value = eventJSON.location;
    
  }
  else{
    popup.style.visibility = 'hidden';
    
  }
}


function showLoginForm() {
  if (document.getElementById("isUserLoggedIn").value == "false") {
  
    var popup = document.getElementById("loginForm");
  
    if( popup.style.visibility == 'hidden')
    {
      popup.style.visibility = 'visible';
    }
    else{
      popup.style.visibility = 'hidden';
    }
  }
  else
  {
    logOutAjax();
  }
}

function showAddUserForm(){
  var popup = document.getElementById("createUserForm");
  if( popup.style.visibility == 'hidden')
  {
    popup.style.visibility = 'visible';
  }
  else{
    popup.style.visibility = 'hidden';
  }
}

function showCategoryForm(){
  var popup = document.getElementById("manageEventCats");
  if( popup.style.visibility == 'hidden')
  {
    popup.style.visibility = 'visible';
  }
  else{
    popup.style.visibility = 'hidden';
  }
}


document.getElementById("manageEventsCatsButton").addEventListener("click", showCategoryForm,false);
document.getElementById("close_category_view").addEventListener("click", showCategoryForm,false);
document.getElementById("addUserPopUp").addEventListener("click", showAddUserForm, false); // Bind the AJAX call to button click
document.getElementById("loginPopup").addEventListener("click", showLoginForm, false); // Bind the AJAX call to button click
document.getElementById("popup").addEventListener("click", showAddEventForm, false); // Bind the AJAX call to button click
document.getElementById("close_Event_Button").addEventListener("click", showAddEventForm, false); // Bind the AJAX call to button click
document.getElementById("close_edit_Event_Button").addEventListener("click", populateEventForm, false); // Bind the AJAX call to button click




















function logOutAjax(){
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  
  xmlHttp.open("POST", "ajaxLogout.php", false); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.send();
  if (xmlHttp.status === 200) {
    
  }
  document.getElementById("loginPopup").innerHTML = "Login";
  document.getElementById("isUserLoggedIn").value = "false";
  document.getElementById("popup").style.visibility = "hidden";
  document.getElementById("manageEventsCatsButton").style.visibility = "hidden";
  setUP();
  
}

function editEvent(){
  var dataString = "eventID=" + encodeURIComponent(this.value);
  document.getElementById('edit_Event_Button').value = this.value;
  document.getElementById("delete_Event_Button").value = this.value;
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxGetEventInfo.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    var jsonData = JSON.parse(event.target.responseText);
    populateEventForm(jsonData);
    return;
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  
}

function deleteEvent(){
  var token = document.getElementById('token').value + "";
  var dataString = "token=" + encodeURIComponent(token) + "&eventID=" + encodeURIComponent(this.value);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxDeleteEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    //var jsonData = JSON.parse(event.target.responseText);
    return;
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  setUP();
}

function loadEvents(day, month, year,i){

  var dataString = "day=" + encodeURIComponent(day) + "&month=" + encodeURIComponent(month) + "&year=" + encodeURIComponent(year);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxGetEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData

      calenderEvents(jsonData,i);
      return;
      
    }else{
      alert("jsonData was not processed.  "+jsonData.message);
    }
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
}

function loginAjax(){
  
  var username = document.getElementById("username").value; // Get the username from the form
  var password = document.getElementById("password").value; // Get the password from the form
 
  // Make a URL-encoded string for passing POST data:
  var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxLogin.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      alert("You've been Logged In!");
      
      document.getElementById("loginForm").style.visibility = "hidden";
      document.getElementById("token").value = jsonData.token;
      document.getElementById("loginPopup").innerHTML = "Logout";
      document.getElementById("isUserLoggedIn").value = "true";
      document.getElementById("popup").style.visibility = "visible";
      document.getElementById("manageEventsCatsButton").style.visibility = "visible";

      findCategoryAjax();
      setUP();
      
    }else{
      alert("You were not logged in.  "+jsonData.message);
    }
  }, false); // Bind the callback to the load event
  
  xmlHttp.send(dataString); // Send the data
}

function addUserAjax(){
  var newusername = document.getElementById("newusername").value; // Get the username from the form
  var newpassword = document.getElementById("newpassword").value; // Get the password from the form
 
  // Make a URL-encoded string for passing POST data:
  var dataString = "newusername=" + encodeURIComponent(newusername) + "&newpassword=" + encodeURIComponent(newpassword);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxAddUser.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      alert("Username has been successfully added!");
      
    }else{
      alert("You were not logged in.  "+jsonData.message);
    }
  }, false); // Bind the callback to the load event
  document.getElementById("createUserForm").style.visibility = 'hidden';
  xmlHttp.send(dataString); // Send the data
  
}

function addEventAjax(){
  var token = document.getElementById('token').value;
  var categoryChooser = document.getElementById("CategoryChooser");
  var eventCategory = categoryChooser.options[categoryChooser.selectedIndex].text;
  var eventTitle = document.getElementById("eventTitle").value; // Get the username from the form
  var eventDate = document.getElementById("eventDate").value; // Get the password from the form
  var eventTime = document.getElementById("eventTime").value;
  var eventYear = eventDate.substring(0,4);
  var eventMonth = eventDate.substring(5,7);
  var eventDay = eventDate.substring(8);
  var eventLocation  = document.getElementById("eventLocation").value;
  
  // Make a URL-encoded string for passing POST data:
  var dataString = "token=" + encodeURIComponent(token) + "&eventTitle=" + encodeURIComponent(eventTitle) + "&eventYear=" + encodeURIComponent(eventYear) + "&eventMonth=" + encodeURIComponent(eventMonth)  + "&eventDay=" + encodeURIComponent(eventDay)+ "&eventTime=" + encodeURIComponent(eventTime) + "&eventLocation=" + encodeURIComponent(eventLocation) + "&eventCategory=" + encodeURIComponent(eventCategory);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxAddEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      //alert("Event has been successfully added!");
      
    }else{
      //alert("You were not logged in.  "+jsonData.message);
    }
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  setUP();
  
  document.getElementById("myAddForm").style.visibility = 'hidden';
  //maybe use loadevents instead?
}

function findCategoryAjax()
{
  var token = document.getElementById('token').value;
  var dataString = "token=" + encodeURIComponent(token);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxGetCategories.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){
    
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    
    if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData

      populateCategoryForm(jsonData,"CategoryChooser");
      populateCategoryForm(jsonData,"CategoryChooserEdit");
      return;
      
    }else{
      alert("jsonData was not processed.  "+jsonData.message);
    }
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
}

function addCategoryAjax(){
  var token = document.getElementById('token').value;
  var colorChooser = document.getElementById("categoryColor"); // Get the username from the form
  var colorChosen = colorChooser.options[colorChooser.selectedIndex].text;
  var eventCategoryName = document.getElementById("categoryName").value;
  // Make a URL-encoded string for passing POST data:
  var dataString = "token=" + encodeURIComponent(token) + "&eventCategory=" + encodeURIComponent(eventCategoryName) + "&categoryColor=" + encodeURIComponent(colorChosen);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxAddEventCategory.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(){
    findCategoryAjax();
  }, false);
  
  
  xmlHttp.send(dataString); // Send the data
  

  //maybe use loadevents instead?
}

function editEventAjax(){
  var token = document.getElementById('token').value;
  var eventID = document.getElementById('edit_Event_Button').value;

  var eventTitle = document.getElementById('editEventTitle').value;

  var eventDate = document.getElementById('editEventDate').value;
  
  var eventTime = document.getElementById('editEventTime').value ;
  
  var categoryChooser = document.getElementById("CategoryChooserEdit");
  var eventCategory = categoryChooser.options[categoryChooser.selectedIndex].text;

  var eventLocation = document.getElementById('editEventLocation').value;
  var eventYear = eventDate.substring(0,4);
  var eventMonth = eventDate.substring(5,7);
  var eventDay = eventDate.substring(8);
  
  var dataString = "token=" + encodeURIComponent(token) +"&eventID=" + encodeURIComponent(eventID) + "&eventTitle=" + encodeURIComponent(eventTitle) + "&eventYear=" + encodeURIComponent(eventYear) + "&eventMonth=" + encodeURIComponent(eventMonth)  + "&eventDay=" + encodeURIComponent(eventDay)+ "&eventTime=" + encodeURIComponent(eventTime) + "&eventLocation=" + encodeURIComponent(eventLocation)+ "&eventCategory=" + encodeURIComponent(eventCategory);
 
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "ajaxEdit.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event){

  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  setUP();
  document.getElementById("myEditForm").style.visibility = 'hidden';
}

document.getElementById("add_category_button").addEventListener("click",addCategoryAjax,false);
document.getElementById("edit_Event_Button").addEventListener("click",editEventAjax,false);
document.getElementById("add_Event_Button").addEventListener("click", addEventAjax, false); // Bind the AJAX call to button click
document.getElementById("login_button").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
document.getElementById("add_button").addEventListener("click", addUserAjax, false); // Bind the AJAX call to button click



//Resources1× 0.5× 0.25×Rerun