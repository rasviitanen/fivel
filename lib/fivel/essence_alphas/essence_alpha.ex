defmodule Fivel.EssenceAlphas.EssenceAlpha do
  use Ecto.Schema
  import Ecto.Changeset

  alias Fivel.Rooms.Room
  alias Fivel.EssenceStates.EssenceState


  schema "essence_alphas" do
    field :description, :string
    field :name, :string
    belongs_to :room, Room
    has_many :essence_states, EssenceState

    timestamps()
  end

  @doc false
  def changeset(essence_alpha, attrs) do
    essence_alpha
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
