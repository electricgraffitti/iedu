config_options = YAML.load_file("#{Rails.root}/config/smtp_gmail.yml") 
ActionMailer::Base.smtp_settings = {
  :domain => "*.imagineeducation.org",
  :address => "smtp.gmail.com",
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}.merge(config_options) # Configuration options override default options

ActionMailer::Base.default_url_options[:host] = "www.imagineeducation.org"