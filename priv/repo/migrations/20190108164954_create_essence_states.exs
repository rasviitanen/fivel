defmodule Fivel.Repo.Migrations.CreateEssenceAlphas do
  use Ecto.Migration

  def change do
    create table(:essence_alphas) do
      add :name, :string
      add :description, :string
      add :room_id, references(:rooms, on_delete: :nothing)

      timestamps()
    end

    create index(:essence_alphas, [:room_id])
  end
end