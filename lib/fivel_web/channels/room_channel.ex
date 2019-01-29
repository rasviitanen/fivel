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

    def handle_in("toggle_pattern_completion", %{"id" => id, "completed" => completed}, socket) do
        pattern = Fivel.Patterns.get_pattern!(id)
            
        with {:ok, %Fivel.Patterns.Pattern{} = pattern} <- Fivel.Patterns.update_pattern(pattern, %{ "completed" => !completed }) do
            response = %{
                pattern: Phoenix.View.render_one(pattern, FivelWeb.PatternView, "show.json"),
            }

            broadcast!(socket, "pattern_changed", response)
        end
        
        {:noreply, socket}
    end

    def terminate(_reason, socket) do
        {:ok, socket}
    end
end