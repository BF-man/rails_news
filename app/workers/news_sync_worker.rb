require 'sidekiq-scheduler'

class NewsSyncWorker
  include Sidekiq::Worker

  def perform
    NewsSync.sync
  end
end
