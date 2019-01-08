defmodule Fivel.EssenceAlphas do
  @moduledoc """
  The EssenceAlphas context.
  """

  import Ecto.Query, warn: false
  alias Fivel.Repo

  alias Fivel.EssenceAlphas.EssenceAlpha

  @doc """
  Returns the list of essence_alpha.

  ## Examples

      iex> list_essence_alpha()
      [%EssenceAlpha{}, ...]

  """
  def list_essence_alphas do
    Repo.all(EssenceAlpha)
  end

  @doc """
  Gets a single essence_alpha.

  Raises `Ecto.NoResultsError` if the Essence alpha does not exist.

  ## Examples

      iex> get_essence_alpha!(123)
      %EssenceAlpha{}

      iex> get_essence_alpha!(456)
      ** (Ecto.NoResultsError)

  """
  def get_essence_alpha!(id), do: Repo.get!(EssenceAlpha, id)

  @doc """
  Creates a essence_alpha.

  ## Examples

      iex> create_essence_alpha(%{field: value})
      {:ok, %EssenceAlpha{}}

      iex> create_essence_alpha(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_essence_alpha(attrs \\ %{}) do
    %EssenceAlpha{}
    |> EssenceAlpha.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a essence_alpha.

  ## Examples

      iex> update_essence_alpha(essence_alpha, %{field: new_value})
      {:ok, %EssenceAlpha{}}

      iex> update_essence_alpha(essence_alpha, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_essence_alpha(%EssenceAlpha{} = essence_alpha, attrs) do
    essence_alpha
    |> EssenceAlpha.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a EssenceAlpha.

  ## Examples

      iex> delete_essence_alpha(essence_alpha)
      {:ok, %EssenceAlpha{}}

      iex> delete_essence_alpha(essence_alpha)
      {:error, %Ecto.Changeset{}}

  """
  def delete_essence_alpha(%EssenceAlpha{} = essence_alpha) do
    Repo.delete(essence_alpha)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking essence_alpha changes.

  ## Examples

      iex> change_essence_alpha(essence_alpha)
      %Ecto.Changeset{source: %EssenceAlpha{}}

  """
  def change_essence_alpha(%EssenceAlpha{} = essence_alpha) do
    EssenceAlpha.changeset(essence_alpha, %{})
  end
end
