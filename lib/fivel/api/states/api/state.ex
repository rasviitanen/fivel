defmodule Fivel.Api.States.Api.State do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :string, autogenerate: false}
  schema "states" do
    field :description, :string

    timestamps()
  end

  @doc false
  def changeset(state, attrs) do
    state
    |> cast(attrs, [:id, :description])
    |> validate_required([:id, :description])
  end
end
