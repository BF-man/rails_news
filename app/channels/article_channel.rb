class ArticleChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'article_channel'
  end

  def get_article
    ArticleBroadcast.new(Article.last_active).broadcast
  end

  def create_admin_article(params)
    permitted_params = permit_params(params)
    article_attributes = permitted_params.merge(published_at: Time.now)
    Article.create!(article_attributes)
  end

  private

  def permit_params(params)
    params.slice('title', 'description', 'expires_at')
  end
end
