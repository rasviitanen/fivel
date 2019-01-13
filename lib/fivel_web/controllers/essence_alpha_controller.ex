defmodule FivelWeb.EssenceAlphaController do
  use FivelWeb, :controller

  alias Fivel.EssenceAlphas
  alias Fivel.EssenceAlphas.EssenceAlpha

  alias Fivel.EssenceStates.EssenceState

  alias Fivel.Repo

  action_fallback FivelWeb.FallbackController

  def index(conn, _params) do
    essence_alphas = EssenceAlphas.list_essence_alphas()
    render(conn, "index.json", essence_alphas: essence_alphas)
  end

  def states(conn, %{"id" => id}) do
    essence_alpha = EssenceAlphas.get_essence_alpha!(id)
      |> Repo.preload(:essence_states)

    states = Repo.all(Ecto.assoc(essence_alpha, :essence_states))

    render(conn, FivelWeb.EssenceStateView, "index.json", %{essence_states: states})
  end

  def create(conn, %{"essence_alpha" => essence_alpha_params}) do
    with {:ok, %EssenceAlpha{} = essence_alpha} <- EssenceAlphas.create_essence_alpha(essence_alpha_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.essence_alpha_path(conn, :show, essence_alpha))
      |> render("show.json", essence_alpha: essence_alpha)
    end
  end

  def show(conn, %{"id" => id}) do
    essence_alpha = EssenceAlphas.get_essence_alpha!(id)
    render(conn, "show.json", essence_alpha: essence_alpha)
  end

  def update(conn, %{"id" => id, "essence_alpha" => essence_alpha_params}) do
    essence_alpha = EssenceAlphas.get_essence_alpha!(id)

    with {:ok, %EssenceAlpha{} = essence_alpha} <- EssenceAlphas.update_essence_alpha(essence_alpha, essence_alpha_params) do
      render(conn, "show.json", essence_alpha: essence_alpha)
    end
  end

  def delete(conn, %{"id" => id}) do
    essence_alpha = EssenceAlphas.get_essence_alpha!(id)

    with {:ok, %EssenceAlpha{}} <- EssenceAlphas.delete_essence_alpha(essence_alpha) do
      send_resp(conn, :no_content, "")
    end
  end
end
