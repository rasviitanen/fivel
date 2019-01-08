defmodule Fivel.EssenceStates do
  @moduledoc """
  The EssenceStates context.
  """

  import Ecto.Query, warn: false
  alias Fivel.Repo

  alias Fivel.EssenceStates.EssenceState

  @doc """
  Returns the list of essence_states.

  ## Examples

      iex> list_essence_states()
      [%EssenceState{}, ...]

  """
  def list_essence_states do
    Repo.all(EssenceState)
  end

  @doc """
  Gets a single essence_state.

  Raises `Ecto.NoResultsError` if the Essence state does not exist.

  ## Examples

      iex> get_essence_state!(123)
      %EssenceState{}

      iex> get_essence_state!(456)
      ** (Ecto.NoResultsError)

  """
  def get_essence_state!(id), do: Repo.get!(EssenceState, id)

  @doc """
  Creates a essence_state.

  ## Examples

      iex> create_essence_state(%{field: value})
      {:ok, %EssenceState{}}

      iex> create_essence_state(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_essence_state(attrs \\ %{}) do
    %EssenceState{}
    |> EssenceState.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a essence_state.

  ## Examples

      iex> update_essence_state(essence_state, %{field: new_value})
      {:ok, %EssenceState{}}

      iex> update_essence_state(essence_state, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_essence_state(%EssenceState{} = essence_state, attrs) do
    essence_state
    |> EssenceState.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a EssenceState.

  ## Examples

      iex> delete_essence_state(essence_state)
      {:ok, %EssenceState{}}

      iex> delete_essence_state(essence_state)
      {:error, %Ecto.Changeset{}}

  """
  def delete_essence_state(%EssenceState{} = essence_state) do
    Repo.delete(essence_state)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking essence_state changes.

  ## Examples

      iex> change_essence_state(essence_state)
      %Ecto.Changeset{source: %EssenceState{}}

  """
  def change_essence_state(%EssenceState{} = essence_state) do
    EssenceState.changeset(essence_state, %{})
  end
end
