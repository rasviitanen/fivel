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

    pipe_through :auth

    resources "/alphas", AlphaController, except: [:new, :edit]
    resources "/states", StateController, except: [:new, :edit]

    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
  end
end
