class ArticleCreationEventBroadcastWorker
  include Sidekiq::Worker

  def perform(article_id)
    ArticleCreationEventBroadcast.check_and_broadcast(article_id)
  end
end
