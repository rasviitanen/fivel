defmodule Fivel.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :name, :string
      add :state, :string
      add :essence_state_id, references(:essence_states, on_delete: :nothing)

      timestamps()
    end

    create index(:todos, [:essence_state_id])
  end
end
