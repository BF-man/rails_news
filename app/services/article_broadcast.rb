# frozen_string_literal: true

class ArticleBroadcast
  CHANNEL = 'article_channel'

  def initialize(article)
    @article = article
  end

  def broadcast
    ActionCable
      .server
      .broadcast(CHANNEL,
                 title: @article.title,
                 published_at: @article.published_at,
                 description: @article.description,
                 expires_at: @article.expires_at)
  end
end
