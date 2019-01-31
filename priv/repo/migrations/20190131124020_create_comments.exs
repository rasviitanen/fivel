defmodule Fivel.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :content, :string
      add :essence_state_id, references(:essence_states, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:comments, [:essence_state_id, :user_id])
  end
end
