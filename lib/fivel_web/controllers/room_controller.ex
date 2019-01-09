defmodule FivelWeb.RoomController do
  use FivelWeb, :controller

  alias Fivel.Repo
  alias Fivel.Rooms
  alias Fivel.Rooms.Room

  alias Fivel.EssenceAlphas
  alias Fivel.EssenceAlphas.EssenceAlpha
  
  
  action_fallback FivelWeb.FallbackController
  

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    current_user = Fivel.Guardian.Plug.current_resource(conn)
    changeset = Room.changeset(%Room{}, params)

    case Repo.insert(changeset) do
      {:ok, room} ->
        assoc_changeset = Fivel.UserRooms.UserRoom.changeset(
          %Fivel.UserRooms.UserRoom{},
          %{user_id: current_user.id, room_id: room.id}
        )
        Repo.insert(assoc_changeset)

        conn
        |> put_status(:created)
        |> render("show.json", room: room)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(FivelWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def join(conn, %{"id" => room_id}) do
    current_user = Fivel.Guardian.Plug.current_resource(conn)
    room = Repo.get(Room, room_id)

    changeset = Fivel.UserRooms.UserRoom.changeset(
      %Fivel.UserRooms.UserRoom{},
      %{room_id: room.id, user_id: current_user.id}
    )

    case Repo.insert(changeset) do
      {:ok, _user_room} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{room: room})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(FivelWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def add_alpha(conn, %{"id" => room_id, "essence_alpha" => essence_alpha_params}) do
    with {:ok, %EssenceAlpha{} = essence_alpha} <- EssenceAlphas.create_essence_alpha(essence_alpha_params) do
      room = Repo.get(Fivel.Rooms.Room, room_id)
        |> Repo.preload(:essence_alphas)
        |> Room.changeset(%{})
        |> Ecto.Changeset.put_assoc(:essence_alphas, [essence_alpha])
        |> Repo.update!

      conn
        |> put_status(:created)
      
      render(conn, FivelWeb.EssenceAlphaView,"show.json", %{essence_alpha: essence_alpha})
    end
  end

  def alphas(conn, %{"id" => room_id}) do
    room = Repo.get(Room, room_id)
      |> Repo.preload(:essence_alphas)

    alphas = Repo.all(Ecto.assoc(room, :essence_alphas))

    render(conn, FivelWeb.EssenceAlphaView, "index.json", %{essence_alphas: alphas})
  end
end
