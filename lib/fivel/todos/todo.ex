defmodule Fivel.Todos.Todo do
  use Ecto.Schema
  import Ecto.Changeset


  schema "todos" do
    field :name, :string
    field :state, :string, default: "todo"

    belongs_to :essence_state, Fivel.EssenceStates.EssenceState


    timestamps()
  end

  @doc false
  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:name, :state])
    |> validate_required([:name, :state])
  end
end
