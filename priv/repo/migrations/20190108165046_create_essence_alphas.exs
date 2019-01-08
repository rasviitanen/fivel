defmodule Fivel.Repo.Migrations.CreateEssenceStates do
  use Ecto.Migration

  def change do
    create table(:essence_states) do
      add :name, :string
      add :description, :string
      add :essence_alpha_id, references(:essence_alphas, on_delete: :nothing)

      timestamps()
    end

    create index(:essence_states, [:essence_alpha_id])
  end
end
