###
# Page options, layouts, aliases and proxies
###

# Assets directories
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/css/images'

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Development-specific configuration
configure :development do
  set :debug_assets, true

  compass_config do |config|
    config.sass_options = { sourcemap: true }
    # config.sass_options = { :debug_info => true}

    #open the browser
    system('open http://localhost:4567/__middleman')
  end
end

# Before build actions
before_build do |_builder|
  # delete existing (and only if existing) build folder
  dirname = File.dirname('build')
  FileUtils.remove_dir('build', true) unless File.directory?(dirname)
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
