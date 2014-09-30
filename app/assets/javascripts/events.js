// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      resizable: true,
      events: 'events.json',

      eventClick: function(event) {
        
        $('#myModal').modal('show');
        calendar_event_clicked(event);
      }

    });

    $('#create-event').bind('click', function(){
      clear_form();
    });

});

function calendar_event_clicked(cal_event, js_event, view) {
  set_event_generation_values(cal_event.id, cal_event.title, cal_event.description,
                              cal_event.start, cal_event.end, cal_event.all_day);
}

function set_event_generation_values(event_id, title, description, start, end, all_day) {
 
  $('#event_title').val(title);
  $('#event_description').val(description);
  $('#event_start').val(start);
  $('#event_finish').val(end);
  $('#submit-btn').val('Update Event');
}

function clear_form() {
  $('#event_title').val('');
  $('#event_description').val('');
  $('#event_start').val('');
  $('#event_finish').val('');
  $('#submit-btn').val('Create Event');
}

function update_event() {

  $.ajax({
      type: "POST",
      url: '/events.update',
      data: { page: JSON.stringify({
        })
      },
      contentType: 'application/json', // format of request payload
      dataType: 'json' // format of the response
  });
}
