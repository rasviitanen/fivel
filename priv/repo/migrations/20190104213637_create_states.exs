defmodule Fivel.Repo.Migrations.CreateStates do
  use Ecto.Migration

  def change do
    create table(:states, primary_key: false) do
      add :id, :string, primary_key: true
      add :description, :string

      timestamps()
    end
  end
end