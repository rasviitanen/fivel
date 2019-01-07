defmodule Fivel.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :topic, :string, default: ""

      timestamps()
    end

    create index(:rooms, [:name])
  end
end
