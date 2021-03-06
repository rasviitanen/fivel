defmodule FivelWeb.UserSocket do
  use Phoenix.Socket
  
  ## Channels
  # channel "room:*", FivelWeb.RoomChannel

  channel "rooms:*", FivelWeb.RoomChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.

  def connect(%{"token" => token}, socket, _connect_info) do
    case Guardian.Phoenix.Socket.authenticate(socket, Fivel.Guardian, token) do
      {:ok, authed_socket} ->
        {:ok, authed_socket}

        user = Guardian.Phoenix.Socket.current_resource(authed_socket)
        {:ok, assign(authed_socket, :current_user, user)}

      
      {:error, _} -> :error
    end
  end

  def connect(_params, _socket, _connect_info), do: :error

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     FivelWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(socket), do: "users_socket:#{Guardian.Phoenix.Socket.current_resource(socket).id}"
end
