class EventsController < ApplicationController

  def index
    @events = Event.all 
    respond_to do |format|
      format.html
      format.json { render json: @events}
    end
  end


end
