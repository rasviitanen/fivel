defmodule FivelWeb.PageController do
  use FivelWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
