class AppMailer < ActionMailer::Base
  default :from => "support@kosjourney.com"

  def contact_mailer(params)
    @params = params
    mail(:to => "jennifer@imagineeducation.org", :subject => "Imagine Education Inquiry")
  end
end
