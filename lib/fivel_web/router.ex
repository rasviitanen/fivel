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

  scope "/", FivelWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/board", BoardController, :index
    get "/board/:messenger", BoardController, :show

  end

  scope "/api", FivelWeb do
    pipe_through :api

    resources "/alphas", AlphaController, except: [:new, :edit]
    resources "/states", StateController, except: [:new, :edit]
  end
end
