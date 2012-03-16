Iedu::Application.routes.draw do

	match "online-education" => "imagine#index", :as => :home
	match "demo-reel" => "imagine#demo_reel", :as => :demo_reel
	match "projects" => "imagine#projects", :as => :projects
	match "about-imagine-education" => "imagine#about", :as => :about
	match "contact-imagine-education" => "imagine#contact", :as => :contact
	match "contact-form" => "imagine#contact_submit", :as => :contact_form_path

  root :to => "imagine#index"

end
