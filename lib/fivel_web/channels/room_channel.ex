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

    def handle_in("create_todo", %{"state_id" => state_id, "todo" => todo_params}, socket) do
        essence_state = Fivel.EssenceStates.get_essence_state!(state_id)
        Fivel.EssenceStates.add_todo(essence_state, %{"todo" => todo_params})

        todos = Fivel.Repo.all(Ecto.assoc(essence_state, :todos))

        response = %{
            state_id: state_id,
            todos: Phoenix.View.render_many(todos, FivelWeb.TodoView, "todo.json"),
        }

        broadcast!(socket, "todo_created", response)
        
        {:reply, :ok, socket}
    end

    def handle_in("delete_todo", %{"state_id" => state_id, "todo_id" => todo_id}, socket) do
        todo = Fivel.Todos.get_todo!(todo_id)
  
        with {:ok, %Fivel.Todos.Todo{}} <- Fivel.Todos.delete_todo(todo) do
          essence_state = Fivel.EssenceStates.get_essence_state!(state_id)
          todos = Fivel.Repo.all(Ecto.assoc(essence_state, :todos))
          response = %{
              state_id: state_id,
              todos: Phoenix.View.render_many(todos, FivelWeb.TodoView, "todo.json"),
          }
  
          broadcast!(socket, "todo_deleted", response)
        end
        
        {:noreply, socket}
    end


    def handle_in("change_todo", %{"state_id" => state_id, "todo_id" => todo_id, "todo_params" => todo_params}, socket) do
        todo = Fivel.Todos.get_todo!(todo_id)

        with {:ok, %Fivel.Todos.Todo{} = todo} <- Fivel.Todos.update_todo(todo, todo_params) do
            essence_state = Fivel.EssenceStates.get_essence_state!(state_id)
            todos = Fivel.Repo.all(Ecto.assoc(essence_state, :todos))


            response = %{
                state_id: state_id,
                todos: Phoenix.View.render_many(todos, FivelWeb.TodoView, "todo.json"),
            }

            broadcast!(socket, "todo_updated", response)
        end
        
        {:noreply, socket}
    end

    def terminate(_reason, socket) do
        {:ok, socket}
    end
end