defmodule FivelWeb.Router do
  use FivelWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug Fivel.Pipeline
  end

  scope "/", FivelWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/board", BoardController, :index
    get "/board/:messenger", BoardController, :show

  end

  scope "/api", FivelWeb do
    pipe_through :api
    post "/sessions", SessionController, :create
    resources "/users", UserController, only: [:create]

    resources "/essence_alphas", EssenceAlphaController, except: [:new, :edit]
    resources "/essence_states", EssenceStateController, except: [:new, :edit]
    post "/essence_alphas/:id/add", RoomController, :add_alpha
    
    pipe_through :auth
    
    resources "/alphas", AlphaController, except: [:new, :edit]
    resources "/states", StateController, except: [:new, :edit]
    
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    
    get "/users/:id/rooms", UserController, :rooms
    resources "/rooms", RoomController, only: [:index, :create]
    post "/rooms/:id/join", RoomController, :join
    post "/rooms/:id/alphas", RoomController, :alphas
  end
end
