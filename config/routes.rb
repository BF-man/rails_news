Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root to: 'articles#index'
  match '*path', to: 'articles#index', via: :all
end
