defmodule FivelWeb.UserChannel do
    use FivelWeb, :channel

    def join("users:" <> user_id, _params, socket) do
        {:ok, socket}
    end
end


