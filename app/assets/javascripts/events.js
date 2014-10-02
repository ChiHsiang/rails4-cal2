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

      eventClick: function(event,a,b) {

        $('#myModal').modal('show');
        $('input#id').remove();
        var input = $('<input id="id" type="hidden" />');
        $('#event_form').append(input);
        calendar_event_clicked(event);
        get_edit_event(event);
        var update_btn = $('#commit').attr('type','button');
        $('#delete').attr('style', 'display:inline');
        $('#commit').addClass('btn-warning');
      }
    });
    
    
    $('#create-event').bind('click', function(){
      clear_form();
      get_new_event();
      $('#delete').attr('style', 'display:none');
      var create_form = $('#event_form').attr('method', 'post');
      var create_btn = $('#commit').text('Create Event')
                       .val('create').removeClass('btn-warning');
    });

    $('#commit').bind('click', function(){
      var commit_val = $('#commit').val();
      if (commit_val === 'update') {
        var id = $('input#id').val();
        update_event(id, $('#event_form').serialize());
      }
    });

    $('#delete').bind('click', function(){
      var id = $('input#id').val();
      delete_event(id);
    });

});

function calendar_event_clicked(cal_event, js_event, view) {
  set_event_generation_values(cal_event.id, cal_event.title, cal_event.description,
                              cal_event.start, cal_event.end, cal_event.all_day);
}

function set_event_generation_values(event_id, title, description, start, end, all_day) {

  $('input#id').val(event_id);
  $('#event_title').val(title);
  $('#event_description').val(description);
  $('#event_start').val(start);
  $('#event_finish').val(end);
  $('#commit').val('update').text('Update Event');
}

function clear_form() {
  $('#event_title').val('');
  $('#event_description').val('');
  $('#event_start').val('');
  $('#event_finish').val('');
  $('#commit').val('create');
}

function update_event(id , params) {
  var path = "/events/" + id ;
  $.ajax({
      type: "PUT",
      url: path,
      data:params,
      success: function(data){
        location.reload();
      }
  });
}

function get_new_event() {
  var url = "/events/new.json";
  $.get(url, function( data ){
  });
}

function get_edit_event(cal_event) {
  var url = "/events/" + cal_event.id + "/edit.json";
  $.get(url, function( data ){
  });
}

function delete_event(id) {
  var path = "/events/" + id;
  $.ajax({
    type: "DELETE",
    url: path,
    data: id,
    success: function(data) {
      location.reload();
    }
  });
}

