defmodule Fivel.Repo.Migrations.CreatePatterns do
  use Ecto.Migration

  def change do
    create table(:patterns) do
      add :name, :string
      add :description, :string
      add :completed, :boolean, default: false, null: false
      add :essence_state_id, references(:essence_states, on_delete: :nothing)

      timestamps()
    end

    create index(:patterns, [:essence_state_id])
  end
end
