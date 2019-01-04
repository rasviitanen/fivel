defmodule Fivel.Repo.Migrations.CreateAlphas do
  use Ecto.Migration

  def change do
    create table(:alphas, primary_key: false) do
      add :id, :string, primary_key: true
      add :description, :string

      timestamps()
    end
  end
end
