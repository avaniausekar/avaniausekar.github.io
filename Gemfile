# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll-theme-chirpy", "~> 7.6"

# Keeps URLs from the old Minimal Mistakes site working (see `redirect_from` in posts and /redirects).
gem "jekyll-redirect-from", "~> 0.16"

gem "html-proofer", "~> 5.0", group: :test

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
