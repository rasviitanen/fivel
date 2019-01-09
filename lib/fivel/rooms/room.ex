defmodule Fivel.Rooms.Room do
  use Ecto.Schema
  import Ecto.Changeset


  schema "rooms" do
    field :name, :string
    field :topic, :string

    many_to_many :users, Fivel.Users.User, join_through: "user_rooms"
    has_many :essence_alphas, Fivel.EssenceAlphas.EssenceAlpha, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :topic])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
