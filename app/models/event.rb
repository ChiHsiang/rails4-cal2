class Event < ActiveRecord::Base

  validate :finish_cannot_be_earlier_than_start

  validates :title, presence: true, length: { in: 2..100 }
  validates :description, presence: true, length: { in: 2..1000 }
  validates :start, presence: true
  validates :finish, presence: true

  def self.event_obj(event)
    source = []
    event.each do |e|
      e_one = {}
      e_one[:id] = e.id
      e_one[:title] = e.title
      e_one[:description] = e.description 
      e_one[:start] = e.start
      e_one[:end] = e.finish
      e_one[:allDay] = e.all_day
      source.push(e_one)
    end
    return source
  end


  private

    def finish_cannot_be_earlier_than_start
      unless start.nil? || finish.nil?
        time_error if finish < start
      end
    end

    def time_error
      errors.add(:time_error, 'The fundamental laws of nature prevent time travel')
    end
  
end
