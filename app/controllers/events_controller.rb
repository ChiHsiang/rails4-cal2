class EventsController < ApplicationController
  before_action :set_event, only: [:edit, :update, :desroy]

  def index
    @events = Event.all 
    @events = Event.event_obj(@events)
    #@event = Event.new
    respond_to do |format|
      format.html
      format.json { render json: @events}
    end
  end

  def new
    @event = Event.new 
    respond_to do |format|
      format.json { render json: @event }
    end
  end

  def edit
    respond_to do |format|
      format.json { render json: @event }
    end
  end

  def update
   @event.update(event_params) 
   redirect_to root_path
  end

  def create
    @event = Event.new(event_params)
    @event.save
    redirect_to events_path
  end

  def destroy
    @event.destroy   
  end

  private

    def set_event      
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :description, :start, :finish, :all_day)
    end

 end
