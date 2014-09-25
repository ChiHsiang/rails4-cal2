namespace :fake do

  desc 'create 10 events'
  task events: :environment do
    1.times do |i|
      Event.create title: "Test Event #{i}",
                   description: "About test #{i}",
                   start: "2014-09-01",
                   :end => "2014-09-02"
    end
  end
  
end
