defmodule FivelWeb.RoomChannel do
    use FivelWeb, :channel

    alias Fivel.Rooms
    alias Fivel.Rooms.Room

    def join("rooms:" <> room_id, _params, socket) do
        room = Rooms.get_room!(room_id)

        response = %{
            room: Phoenix.View.render_one(room, FivelWeb.RoomView, "room.json"),
        }

        send(self, :after_join)
        {:ok, response, assign(socket, :room, room)}
    end

    def handle_info(:after_join, socket) do
        FivelWeb.Presence.track(socket, socket.assigns.current_user.id, %{
          user: Phoenix.View.render_one(socket.assigns.current_user, FivelWeb.UserView, "user.json")
        })
        push(socket, "presence_state", FivelWeb.Presence.list(socket))
        {:noreply, socket}
    end

    def terminate(_reason, socket) do
        {:ok, socket}
    end
end