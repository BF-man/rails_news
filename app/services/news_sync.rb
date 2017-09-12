# frozen_string_literal: true

class NewsSync
  NEWS_RSS_URL = 'https://news.yandex.ru/index.rss'

  def self.sync
    article = RssReader.new(NEWS_RSS_URL).read.first
    Article.create!(title: article.title,
                    published_at: article.pubDate,
                    description: article.description)
  end
end
