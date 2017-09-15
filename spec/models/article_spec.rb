require 'rails_helper'
require 'sidekiq/testing'
Sidekiq::Testing.fake!

RSpec.describe Article, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:published_at) }
  it { should_not validate_presence_of(:expires_at) }

  it 'is valid with valid attributes' do
    expect(Article.new(title: 'test', description: 'test', published_at: Time.now)).to be_valid
  end

  describe '#remote?' do
    it 'returns true for remote article' do
      article = Article.new title: 'test', description: 'test', published_at: Time.now
      expect(article.remote?).to eq(true)
    end

    it 'returns false for custom article' do
      article = Article.new title: 'test',
                            description: 'test',
                            published_at: Time.now,
                            expires_at: Time.now
      expect(article.remote?).to eq(false)
    end
  end

  describe '#self.last_active' do
    it 'returns last active custom article' do
      Article.create! title: 'test1', description: 'test1', published_at: Time.now
      Article.create! title: 'test2',
                      description: 'test2',
                      published_at: Time.now,
                      expires_at: Time.now + 1.day
      article = Article.create! title: 'test3',
                                description: 'test3',
                                published_at: Time.now,
                                expires_at: Time.now + 1.day
      Article.create! title: 'test4', description: 'test4', published_at: Time.now
      expect(Article.last_active).to eq(article)
    end

    it 'returns last article if there is no active custom articles' do
      Article.create! title: 'test1', description: 'test1', published_at: Time.now
      Article.create! title: 'test2',
                      description: 'test2',
                      published_at: Time.now,
                      expires_at: Time.now - 1.day
      Article.create! title: 'test3',
                      description: 'test3',
                      published_at: Time.now,
                      expires_at: Time.now - 1.day
      article = Article.create! title: 'test4', description: 'test4', published_at: Time.now
      expect(Article.last_active).to eq(article)
    end
  end

  it 'schedules ArticleCreationEventBroadcastWorker job after create commit' do
    expect {
      Article.create! title: 'test1', description: 'test1', published_at: Time.now
    }.to change(ArticleCreationEventBroadcastWorker.jobs, :size).by(1)
  end
end
