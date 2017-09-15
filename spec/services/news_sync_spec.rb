require 'rails_helper'
require 'ostruct'

RSpec.describe NewsSync do
  describe 'self.sync' do
    it 'syncs last rss article' do
      fake_article = fake_article_rss_item

      allow_any_instance_of(RssReader).to receive(:read).and_return([fake_article])

      expect(Article.count).to eq(0)
      NewsSync.sync
      expect(Article.count).to eq(1)
      article = Article.first
      expect(article.guid).to eq(fake_article.guid.content)
      expect(article.title).to eq(fake_article.title)
      expect(article.description).to eq(fake_article.description)
      expect(article.published_at).to eq(fake_article.pubDate)
      expect(article.expires_at).to eq(nil)
    end
  end

  it 'does not syncs article with presented guid' do
    fake_article = fake_article_rss_item

    allow_any_instance_of(RssReader).to receive(:read).and_return([fake_article])
    Article.create! title: 'test1',
                    description: 'test1',
                    published_at: Time.now,
                    guid: fake_article.guid.content

    expect(Article.count).to eq(1)
    NewsSync.sync
    expect(Article.count).to eq(1)
  end
end

def fake_article_rss_item
  guid = OpenStruct.new
  guid.content = 'test guid'
  fake_item = OpenStruct.new
  fake_item.title = 'Test title'
  fake_item.description = 'Test title'
  fake_item.pubDate = Time.now
  fake_item.guid = guid
  fake_item
end
