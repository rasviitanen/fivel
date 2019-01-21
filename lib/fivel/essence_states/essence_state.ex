defmodule Fivel.EssenceStates.EssenceState do
  @derive {Jason.Encoder, only: [ :id, :name, :description, :patterns ]}

  use Ecto.Schema
  import Ecto.Changeset

  alias Fivel.EssenceAlphas.EssenceAlpha

  schema "essence_states" do
    field :description, :string
    field :name, :string
    belongs_to :essence_alpha, EssenceAlpha

    has_many :patterns, Fivel.Patterns.Pattern, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(essence_state, attrs) do
    essence_state
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
