defmodule Fivel.Api.Alphas do
  @moduledoc """
  The Api.Alphas context.
  """

  import Ecto.Query, warn: false
  alias Fivel.Repo

  alias Fivel.Api.Alphas.Api.Alpha

  @doc """
  Returns the list of alphas.

  ## Examples

      iex> list_alphas()
      [%Alpha{}, ...]

  """
  def list_alphas do
    Repo.all(Alpha)
  end

  @doc """
  Gets a single alpha.

  Raises `Ecto.NoResultsError` if the Alpha does not exist.

  ## Examples

      iex> get_alpha!(123)
      %Alpha{}

      iex> get_alpha!(456)
      ** (Ecto.NoResultsError)

  """
  def get_alpha!(id), do: Repo.get!(Alpha, id)

  @doc """
  Creates a alpha.

  ## Examples

      iex> create_alpha(%{field: value})
      {:ok, %Alpha{}}

      iex> create_alpha(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_alpha(attrs \\ %{}) do
    %Alpha{}
    |> Alpha.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a alpha.

  ## Examples

      iex> update_alpha(alpha, %{field: new_value})
      {:ok, %Alpha{}}

      iex> update_alpha(alpha, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_alpha(%Alpha{} = alpha, attrs) do
    alpha
    |> Alpha.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Alpha.

  ## Examples

      iex> delete_alpha(alpha)
      {:ok, %Alpha{}}

      iex> delete_alpha(alpha)
      {:error, %Ecto.Changeset{}}

  """
  def delete_alpha(%Alpha{} = alpha) do
    Repo.delete(alpha)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking alpha changes.

  ## Examples

      iex> change_alpha(alpha)
      %Ecto.Changeset{source: %Alpha{}}

  """
  def change_alpha(%Alpha{} = alpha) do
    Alpha.changeset(alpha, %{})
  end
end
