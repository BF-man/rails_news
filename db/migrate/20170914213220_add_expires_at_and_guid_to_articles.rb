class AddExpiresAtAndGuidToArticles < ActiveRecord::Migration[5.1]
  def change
    change_table(:articles) do |t|
      t.column :expires_at, :datetime
      t.column :guid, :string
      t.index :guid, unique: true
    end
  end
end
