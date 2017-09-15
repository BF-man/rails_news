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
                 published_at: format_date(@article.published_at),
                 description: @article.description,
                 expires_at: expires_at)
  end

  private

  def expires_at
    return nil unless @article.expires_at
    format_date(@article.expires_at)
  end

  def format_date(date)
    date.strftime('%d.%m.%Y %H:%M')
  end
end
