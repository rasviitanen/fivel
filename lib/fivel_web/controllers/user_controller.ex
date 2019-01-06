defmodule FivelWeb.UserController do
  use FivelWeb, :controller

  alias Fivel.Users
  alias Fivel.Users.User
  alias Fivel.Repo
  alias Fivel.Guardian


  action_fallback FivelWeb.FallbackController

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)
    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)
  
        new_conn
        |> put_status(:created)
        |> render(FivelWeb.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(FivelWeb.ChangesetView)
        |> render("error.json", changeset: changeset)
    end
  end
end
