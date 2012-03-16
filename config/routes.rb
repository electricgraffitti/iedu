Iedu::Application.routes.draw do

	match "online-education" => "imagine#index", :as => :home
	match "demo-reel" => "imagine#demo_reel", :as => :demo_reel
	match "projects" => "imagine#projects", :as => :projects
	match "about-imagine-education" => "imagine#about", :as => :about
	match "contact-imagine-education" => "imagine#contact", :as => :contact

  root :to => "imagine#index"

end
