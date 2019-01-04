defmodule Fivel.Api.Alphas.Api.Alpha do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, autogenerate: false}
  schema "alphas" do
    field :description, :string

    timestamps()
  end

  @doc false
  def changeset(alpha, attrs) do
    alpha
    |> cast(attrs, [:id, :description])
    |> validate_required([:id, :description])
  end
end
