defmodule FivelWeb.AlphaController do
  use FivelWeb, :controller

  alias Fivel.Api.Alphas
  alias Fivel.Api.Alphas.Api.Alpha

  action_fallback FivelWeb.FallbackController

  def index(conn, _params) do
    alphas = Alphas.list_alphas()
    render(conn, "index.json", alphas: alphas)
  end

  def create(conn, %{"alpha" => alpha_params}) do
    with {:ok, %Alpha{} = alpha} <- Alphas.create_alpha(alpha_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.alpha_path(conn, :show, alpha))
      |> render("show.json", alpha: alpha)
    end
  end

  def show(conn, %{"id" => id}) do
    alpha = Alphas.get_alpha!(id)
    render(conn, "show.json", alpha: alpha)
  end

  def update(conn, %{"id" => id, "alpha" => alpha_params}) do
    alpha = Alphas.get_alpha!(id)

    with {:ok, %Alpha{} = alpha} <- Alphas.update_alpha(alpha, alpha_params) do
      render(conn, "show.json", alpha: alpha)
    end
  end

  def delete(conn, %{"id" => id}) do
    alpha = Alphas.get_alpha!(id)

    with {:ok, %Alpha{}} <- Alphas.delete_alpha(alpha) do
      send_resp(conn, :no_content, "")
    end
  end
end
