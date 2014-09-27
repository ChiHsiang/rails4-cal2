class EventsController < ApplicationController

  def index
    @events = Event.all 
    @event = Event.new
    respond_to do |format|
      format.html
      format.json { render json: @events}
    end
  end

  def new
    @event = Event.new 
  end

  def create
    @event = Event.create(event_params)
    redirect_to events_path
  end

  private

    def event_params
      params.require(:event).permit(:title, :description, :start, :finish, :all_day)
    end

    


end
