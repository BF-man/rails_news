# Rails news app

## Prerequirements

- use [Ruby](https://www.ruby-lang.org) 2.4.1
- use [Node](https://nodejs.org) 6.9.0
- use SQLite3 (Required in Gemfile)
- use [Redis](https://redis.io) 3.0+
- install [eslint](http://eslint.org), [stylelint](https://stylelint.io) linters support plugins for your IDE/Editor
- [install yarn](https://yarnpkg.com/en/docs/install)
- install ruby dependencies `bundle install`
- install javascript dependencies: `yarn`
- configure `database.yml` (see example `./config/database.yml.example`)
- create database - manually or just run `bundle exec rails db:create`
- run database migrations `bundle exec rails db:migrate`


## Development
  - run
    ```foreman start```
  - go to ```localhost:5000```
