defmodule FivelWeb.RoomController do
  use FivelWeb, :controller

  alias Fivel.Repo
  alias Fivel.Rooms
  alias Fivel.Rooms.Room
  
  plug Guardian.Plug.EnsureAuthenticated, handler: FivelWeb.SessionController
  
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
end
