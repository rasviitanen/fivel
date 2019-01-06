defmodule FivelWeb.UserView do
  use FivelWeb, :view
  alias FivelWeb.UserView

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
    }
  end
end
