defmodule Fivel.Api.AlphasTest do
  use Fivel.DataCase

  alias Fivel.Api.Alphas

  describe "alphas" do
    alias Fivel.Api.Alphas.Api.Alpha

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def alpha_fixture(attrs \\ %{}) do
      {:ok, alpha} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Alphas.create_alpha()

      alpha
    end

    test "list_alphas/0 returns all alphas" do
      alpha = alpha_fixture()
      assert Alphas.list_alphas() == [alpha]
    end

    test "get_alpha!/1 returns the alpha with given id" do
      alpha = alpha_fixture()
      assert Alphas.get_alpha!(alpha.id) == alpha
    end

    test "create_alpha/1 with valid data creates a alpha" do
      assert {:ok, %Alpha{} = alpha} = Alphas.create_alpha(@valid_attrs)
    end

    test "create_alpha/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Alphas.create_alpha(@invalid_attrs)
    end

    test "update_alpha/2 with valid data updates the alpha" do
      alpha = alpha_fixture()
      assert {:ok, %Alpha{} = alpha} = Alphas.update_alpha(alpha, @update_attrs)
    end

    test "update_alpha/2 with invalid data returns error changeset" do
      alpha = alpha_fixture()
      assert {:error, %Ecto.Changeset{}} = Alphas.update_alpha(alpha, @invalid_attrs)
      assert alpha == Alphas.get_alpha!(alpha.id)
    end

    test "delete_alpha/1 deletes the alpha" do
      alpha = alpha_fixture()
      assert {:ok, %Alpha{}} = Alphas.delete_alpha(alpha)
      assert_raise Ecto.NoResultsError, fn -> Alphas.get_alpha!(alpha.id) end
    end

    test "change_alpha/1 returns a alpha changeset" do
      alpha = alpha_fixture()
      assert %Ecto.Changeset{} = Alphas.change_alpha(alpha)
    end
  end

  describe "alphas" do
    alias Fivel.Api.Alphas.Api.Alpha

    @valid_attrs %{description: "some description", item: "some item"}
    @update_attrs %{description: "some updated description", item: "some updated item"}
    @invalid_attrs %{description: nil, item: nil}

    def alpha_fixture(attrs \\ %{}) do
      {:ok, alpha} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Alphas.create_alpha()

      alpha
    end

    test "list_alphas/0 returns all alphas" do
      alpha = alpha_fixture()
      assert Alphas.list_alphas() == [alpha]
    end

    test "get_alpha!/1 returns the alpha with given id" do
      alpha = alpha_fixture()
      assert Alphas.get_alpha!(alpha.id) == alpha
    end

    test "create_alpha/1 with valid data creates a alpha" do
      assert {:ok, %Alpha{} = alpha} = Alphas.create_alpha(@valid_attrs)
      assert alpha.description == "some description"
      assert alpha.item == "some item"
    end

    test "create_alpha/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Alphas.create_alpha(@invalid_attrs)
    end

    test "update_alpha/2 with valid data updates the alpha" do
      alpha = alpha_fixture()
      assert {:ok, %Alpha{} = alpha} = Alphas.update_alpha(alpha, @update_attrs)
      assert alpha.description == "some updated description"
      assert alpha.item == "some updated item"
    end

    test "update_alpha/2 with invalid data returns error changeset" do
      alpha = alpha_fixture()
      assert {:error, %Ecto.Changeset{}} = Alphas.update_alpha(alpha, @invalid_attrs)
      assert alpha == Alphas.get_alpha!(alpha.id)
    end

    test "delete_alpha/1 deletes the alpha" do
      alpha = alpha_fixture()
      assert {:ok, %Alpha{}} = Alphas.delete_alpha(alpha)
      assert_raise Ecto.NoResultsError, fn -> Alphas.get_alpha!(alpha.id) end
    end

    test "change_alpha/1 returns a alpha changeset" do
      alpha = alpha_fixture()
      assert %Ecto.Changeset{} = Alphas.change_alpha(alpha)
    end
  end
end
