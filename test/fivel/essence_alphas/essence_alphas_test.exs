defmodule Fivel.EssenceAlphasTest do
  use Fivel.DataCase

  alias Fivel.EssenceAlphas

  describe "essence_alpha" do
    alias Fivel.EssenceAlphas.EssenceAlpha

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def essence_alpha_fixture(attrs \\ %{}) do
      {:ok, essence_alpha} =
        attrs
        |> Enum.into(@valid_attrs)
        |> EssenceAlphas.create_essence_alpha()

      essence_alpha
    end

    test "list_essence_alpha/0 returns all essence_alpha" do
      essence_alpha = essence_alpha_fixture()
      assert EssenceAlphas.list_essence_alpha() == [essence_alpha]
    end

    test "get_essence_alpha!/1 returns the essence_alpha with given id" do
      essence_alpha = essence_alpha_fixture()
      assert EssenceAlphas.get_essence_alpha!(essence_alpha.id) == essence_alpha
    end

    test "create_essence_alpha/1 with valid data creates a essence_alpha" do
      assert {:ok, %EssenceAlpha{} = essence_alpha} = EssenceAlphas.create_essence_alpha(@valid_attrs)
      assert essence_alpha.description == "some description"
      assert essence_alpha.name == "some name"
    end

    test "create_essence_alpha/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = EssenceAlphas.create_essence_alpha(@invalid_attrs)
    end

    test "update_essence_alpha/2 with valid data updates the essence_alpha" do
      essence_alpha = essence_alpha_fixture()
      assert {:ok, %EssenceAlpha{} = essence_alpha} = EssenceAlphas.update_essence_alpha(essence_alpha, @update_attrs)
      assert essence_alpha.description == "some updated description"
      assert essence_alpha.name == "some updated name"
    end

    test "update_essence_alpha/2 with invalid data returns error changeset" do
      essence_alpha = essence_alpha_fixture()
      assert {:error, %Ecto.Changeset{}} = EssenceAlphas.update_essence_alpha(essence_alpha, @invalid_attrs)
      assert essence_alpha == EssenceAlphas.get_essence_alpha!(essence_alpha.id)
    end

    test "delete_essence_alpha/1 deletes the essence_alpha" do
      essence_alpha = essence_alpha_fixture()
      assert {:ok, %EssenceAlpha{}} = EssenceAlphas.delete_essence_alpha(essence_alpha)
      assert_raise Ecto.NoResultsError, fn -> EssenceAlphas.get_essence_alpha!(essence_alpha.id) end
    end

    test "change_essence_alpha/1 returns a essence_alpha changeset" do
      essence_alpha = essence_alpha_fixture()
      assert %Ecto.Changeset{} = EssenceAlphas.change_essence_alpha(essence_alpha)
    end
  end

  describe "essence_alphas" do
    alias Fivel.EssenceAlphas.EssenceAlpha

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def essence_alpha_fixture(attrs \\ %{}) do
      {:ok, essence_alpha} =
        attrs
        |> Enum.into(@valid_attrs)
        |> EssenceAlphas.create_essence_alpha()

      essence_alpha
    end

    test "list_essence_alphas/0 returns all essence_alphas" do
      essence_alpha = essence_alpha_fixture()
      assert EssenceAlphas.list_essence_alphas() == [essence_alpha]
    end

    test "get_essence_alpha!/1 returns the essence_alpha with given id" do
      essence_alpha = essence_alpha_fixture()
      assert EssenceAlphas.get_essence_alpha!(essence_alpha.id) == essence_alpha
    end

    test "create_essence_alpha/1 with valid data creates a essence_alpha" do
      assert {:ok, %EssenceAlpha{} = essence_alpha} = EssenceAlphas.create_essence_alpha(@valid_attrs)
      assert essence_alpha.description == "some description"
      assert essence_alpha.name == "some name"
    end

    test "create_essence_alpha/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = EssenceAlphas.create_essence_alpha(@invalid_attrs)
    end

    test "update_essence_alpha/2 with valid data updates the essence_alpha" do
      essence_alpha = essence_alpha_fixture()
      assert {:ok, %EssenceAlpha{} = essence_alpha} = EssenceAlphas.update_essence_alpha(essence_alpha, @update_attrs)
      assert essence_alpha.description == "some updated description"
      assert essence_alpha.name == "some updated name"
    end

    test "update_essence_alpha/2 with invalid data returns error changeset" do
      essence_alpha = essence_alpha_fixture()
      assert {:error, %Ecto.Changeset{}} = EssenceAlphas.update_essence_alpha(essence_alpha, @invalid_attrs)
      assert essence_alpha == EssenceAlphas.get_essence_alpha!(essence_alpha.id)
    end

    test "delete_essence_alpha/1 deletes the essence_alpha" do
      essence_alpha = essence_alpha_fixture()
      assert {:ok, %EssenceAlpha{}} = EssenceAlphas.delete_essence_alpha(essence_alpha)
      assert_raise Ecto.NoResultsError, fn -> EssenceAlphas.get_essence_alpha!(essence_alpha.id) end
    end

    test "change_essence_alpha/1 returns a essence_alpha changeset" do
      essence_alpha = essence_alpha_fixture()
      assert %Ecto.Changeset{} = EssenceAlphas.change_essence_alpha(essence_alpha)
    end
  end
end
