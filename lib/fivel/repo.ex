defmodule Fivel.Repo do
  use Ecto.Repo,
    otp_app: :fivel,
    adapter: Ecto.Adapters.Postgres
end
