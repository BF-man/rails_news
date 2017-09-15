class ArticleCreationEventBroadcast
  def self.check_and_broadcast(article_id)
    article = Article.find(article_id)
    return if article.remote? && Article.custom.not_expired.exists?
    ArticleBroadcast.new(article).broadcast
  end
end
