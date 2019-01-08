defmodule FivelWeb.EssenceStateController do
  use FivelWeb, :controller

  alias Fivel.EssenceStates
  alias Fivel.EssenceStates.EssenceState

  action_fallback FivelWeb.FallbackController

  def index(conn, _params) do
    essence_states = EssenceStates.list_essence_states()
    render(conn, "index.json", essence_states: essence_states)
  end

  def create(conn, %{"essence_state" => essence_state_params}) do
    with {:ok, %EssenceState{} = essence_state} <- EssenceStates.create_essence_state(essence_state_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.essence_state_path(conn, :show, essence_state))
      |> render("show.json", essence_state: essence_state)
    end
  end

  def show(conn, %{"id" => id}) do
    essence_state = EssenceStates.get_essence_state!(id)
    render(conn, "show.json", essence_state: essence_state)
  end

  def update(conn, %{"id" => id, "essence_state" => essence_state_params}) do
    essence_state = EssenceStates.get_essence_state!(id)

    with {:ok, %EssenceState{} = essence_state} <- EssenceStates.update_essence_state(essence_state, essence_state_params) do
      render(conn, "show.json", essence_state: essence_state)
    end
  end

  def delete(conn, %{"id" => id}) do
    essence_state = EssenceStates.get_essence_state!(id)

    with {:ok, %EssenceState{}} <- EssenceStates.delete_essence_state(essence_state) do
      send_resp(conn, :no_content, "")
    end
  end
end
