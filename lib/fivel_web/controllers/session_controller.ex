defmodule FivelWeb.SessionController do
    use FivelWeb, :controller
  
    alias Fivel.Repo
    alias Fivel.Users
    alias Fivel.Users.User

    alias Fivel.Guardian
    
    def create(conn, params) do
      case authenticate(params) do
        {:ok, user} ->
          new_conn = Guardian.Plug.sign_in(conn, user)
          jwt = Guardian.Plug.current_token(new_conn)

          new_conn
          |> put_status(:created)
          |> render("show.json", user: user, jwt: jwt)
        :error ->
          conn
          |> put_status(:unauthorized)
          |> render("error.json")
      end
    end
  
    def delete(conn, _) do
      jwt = Guardian.Plug.current_token(conn)
      Guardian.revoke(jwt, [])
  
      conn
      |> put_status(:ok)
      |> render("delete.json")
    end
  
    def refresh(conn, _params) do
      user = Guardian.Plug.current_resource(conn)
      jwt = Guardian.Plug.current_token(conn)

      case Guardian.refresh(jwt, ttl: {30, :days}) do
        {:ok, _, {new_jwt, _new_claims}} ->
          conn
          |> put_status(:ok)
          |> render("show.json", user: user, jwt: new_jwt)
        {:error, _reason} ->
          conn
          |> put_status(:unauthorized)
          |> render("forbidden.json", error: "Not authenticated")
      end
    end
  
    def unauthenticated(conn, _params) do
      conn
      |> put_status(:forbidden)
      |> put_view(FivelWeb.SessionView)      
      |> render("forbidden.json", error: "Not Authenticated")
    end
  
    defp authenticate(%{"email" => email, "password" => password}) do
      user = Fivel.Users.get_user_by(email: String.downcase(email));
  
      case check_password(user, password) do
        true -> {:ok, user}
        _ -> :error
      end
    end
  
    defp check_password(user, password) do
      case user do
        nil -> Comeonin.Bcrypt.dummy_checkpw()
        _ -> Comeonin.Bcrypt.checkpw(password, user.password_hash)
      end
    end
  end