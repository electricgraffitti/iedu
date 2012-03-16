class AppMailer < ActionMailer::Base
  default :from => "support@kosjourney.com"

  def contact_mailer(params)
    @params = params
    mail(:to => "support@cube2media.com", :subject => "Imagine Education Inquiry")
  end
end
