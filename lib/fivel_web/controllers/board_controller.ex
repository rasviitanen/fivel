defmodule FivelWeb.BoardController do
    use FivelWeb, :controller

    def index(conn, _params) do
        alphas = Fivel.Alphas.list_alphas()
        render(conn, "index.html", alphas: alphas)
    end

    def show(conn, %{"messenger" => messenger}) do
        render(conn, "show.html", messenger: messenger)
    end
  end