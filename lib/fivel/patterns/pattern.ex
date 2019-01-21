defmodule Fivel.Patterns.Pattern do
  @derive {Jason.Encoder, only: [ :id, :name, :description, :completed ]}

  use Ecto.Schema
  import Ecto.Changeset


  schema "patterns" do
    field :completed, :boolean, default: false
    field :description, :string
    field :name, :string

    belongs_to :essence_state, Fivel.EssenceStates.EssenceState


    timestamps()
  end

  @doc false
  def changeset(pattern, attrs) do
    pattern
    |> cast(attrs, [:name, :description, :completed])
    |> validate_required([:name, :description, :completed])
  end
end
