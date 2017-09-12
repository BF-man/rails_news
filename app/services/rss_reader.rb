require 'rss'
require 'open-uri'

class RssReader
  def initialize(url)
    @url = url
  end

  def read
    open(@url) { |rss| parse(rss).items }
  end

  private

  def parse(rss)
    RSS::Parser.parse(rss)
  end
end
