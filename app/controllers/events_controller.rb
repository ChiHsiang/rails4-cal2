class EventsController < ApplicationController
  before_action :set_event, only: [:edit, :update, :desroy]

  def index
    @events = Event.all 
    @events = Event.event_obj(@events)
    @event = Event.new
    respond_to do |format|
      format.html
      format.json { render json: @events}
    end
  end

  def new
    @event = Event.new 
  end

  def edit
    
  end

  def update
    @event = JSON.parse params[:page]
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to events_path
    end
  end

  def destroy
      
  end

  private

    def set_event      
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :description, :start, :finish, :all_day)
    end

 end
