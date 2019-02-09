defmodule FivelWeb.RoomController do
  use FivelWeb, :controller

  alias Fivel.Repo
  alias Fivel.Rooms
  alias Fivel.Rooms.Room

  alias Fivel.EssenceAlphas
  alias Fivel.EssenceAlphas.EssenceAlpha

  plug Guardian.Plug.EnsureAuthenticated, handler: FivelWeb.SessionController
  action_fallback FivelWeb.FallbackController
  

  def index(conn, _params) do
    rooms = Rooms.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def add_kernel_alpha(%{"id" => room_id, "essence_alpha" => essence_alpha_params}) do
    room = Repo.get(Fivel.Rooms.Room, room_id)
      
    essence_alpha = %EssenceAlpha{}
      |> EssenceAlpha.changeset(essence_alpha_params || %{})
      |> Ecto.Changeset.change
      |> Ecto.Changeset.put_assoc(:room, room)
      |> Repo.insert!
    
    IO.puts("Alpha is:")
    IO.puts(essence_alpha.name)
    case essence_alpha.name do
      "Opportunity" -> Fivel.EssenceAlphas.add_essence_states_opportunity(essence_alpha)
      "Stakeholders" -> Fivel.EssenceAlphas.add_essence_states_stakeholders(essence_alpha)
      "Requirements" -> Fivel.EssenceAlphas.add_essence_states_requirements(essence_alpha)
      "Software System" -> Fivel.EssenceAlphas.add_essence_states_software_system(essence_alpha)
      "Work" -> Fivel.EssenceAlphas.add_essence_states_work(essence_alpha)
      "Team" -> Fivel.EssenceAlphas.add_essence_states_team(essence_alpha)
      "Way-of-Working" -> Fivel.EssenceAlphas.add_essence_states_way_of_working(essence_alpha)
      _ -> IO.puts("No states to add for alpha")
    end
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
        
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Opportunity", "description" => "The set of circumstances that makes it appropriate to develop or change a software system."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Stakeholders", "description" => "The people, groups, or organizations who affect or are affected by a software system."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Requirements", "description" => "What the software system must do to address the opportunity and satisfy the stakeholders."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Software System", "description" => "A system made up of software, hardware, and data that provides its primary value by the execution of the software."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Work", "description" => "Activity involving mental or physical effort done in order to achieve a result."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Team", "description" => " A group of people actively engaged in the development, maintenance, delivery, or support of a specific software system."}})
        add_kernel_alpha( %{"id" => room.id, "essence_alpha" => %{"name" => "Way-of-Working", "description" => "The tailored set of practices and tools used by a team to guide and support their work."}})

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
      room = Repo.get(Fivel.Rooms.Room, room_id)
      
      essence_alpha = %EssenceAlpha{}
        |> EssenceAlpha.changeset(essence_alpha_params || %{})
        |> Ecto.Changeset.change
        |> Ecto.Changeset.put_assoc(:room, room)
        |> Repo.insert!

      conn
        |> put_status(:created)
      
      render(conn, FivelWeb.EssenceAlphaView,"show.json", %{essence_alpha: essence_alpha})
  end

  def alphas(conn, %{"id" => room_id}) do
    current_user = Fivel.Guardian.Plug.current_resource(conn)

    room = Repo.get(Room, room_id)
      |> Repo.preload(:essence_alphas)

    alphas = Repo.all(Ecto.assoc(room, :essence_alphas))
      |>Repo.preload([essence_states: [:patterns, :todos]])    

    render(conn, FivelWeb.EssenceAlphaView, "index.json", %{essence_alphas: alphas})
  end
end
