class ArticleChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'article_channel'
  end

  def get_article
    ArticleBroadcast.new(Article.last_active).broadcast
  end

  def create_admin_article(params)
    permitted_params = permit_params(params)
    article_attributes = permitted_params.merge(published_at: Time.now,
                                                expires_at: parse_date(permitted_params[:expires_at]))
    Article.create!(article_attributes)
  end

  private

  def parse_date(date)
    DateTime.strptime(date, '%d.%m.%Y %H:%M')
  end

  def permit_params(params)
    [:title, :description, :expires_at].each_with_object({}) { |key, memo| memo[key] = params[key.to_s] }
  end
end
