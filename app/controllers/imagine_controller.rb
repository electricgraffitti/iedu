class ImagineController < ApplicationController
	
  def index
  end

  def demo_reel
  	
  end

  def projects
  	
  end
  
  def consulting
    
  end

  def about
  	
  end

  def contact
  	
  end

  def contact_submit
    AppMailer.contact_mailer(params).deliver
    redirect_to(:back, :notice => "Your inquiry has been sent. Thank you.")
  end

end
