defmodule Fivel.Guardian do
  use Guardian, otp_app: :fivel

  alias Fivel.Users.User
  alias Fivel.Users

  alias Fivel.Repo

  def subject_for_token(resource, _claims) do
    {:ok, to_string(resource.id)}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(claims) do
    resource = Users.get_user!(claims["sub"])
    {:ok,  resource}
  end
  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end
end