class Article < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :published_at, presence: true

  scope :custom, -> { where.not(expires_at: nil).order(:published_at) }
  scope :not_expired, -> { where('expires_at > ?', Time.now).order(:published_at) }
  scope :remote, -> { where(expires_at: nil).order(:published_at) }

  def self.last_active
    custom.not_expired.last || remote.last
  end

  def remote?
    expires_at.blank?
  end

  after_create_commit do
    ArticleCreationEventBroadcastWorker.perform_async(id)
  end
end
