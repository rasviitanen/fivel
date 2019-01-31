defmodule Fivel.Comments.Comment do
  @derive {Jason.Encoder, only: [:id, :content, :user]}
  use Ecto.Schema
  import Ecto.Changeset


  schema "comments" do
    field :content, :string
    belongs_to :essence_state, Fivel.EssenceStates.EssenceState
    belongs_to :user, Fivel.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content])
    |> validate_required([:content])
  end
end
