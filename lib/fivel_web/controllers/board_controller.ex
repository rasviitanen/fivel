defmodule FivelWeb.BoardController do
    use FivelWeb, :controller

    alias Fivel.FivelAlphas

    def index(conn, _params) do
        render(conn, "index.html")
    end

    def show(conn, %{"messenger" => messenger}) do
        render(conn, "show.html", messenger: messenger)
    end
      
  end