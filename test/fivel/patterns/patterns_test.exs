defmodule Fivel.PatternsTest do
  use Fivel.DataCase

  alias Fivel.Patterns

  describe "patterns" do
    alias Fivel.Patterns.Pattern

    @valid_attrs %{completed: true, description: "some description", name: "some name"}
    @update_attrs %{completed: false, description: "some updated description", name: "some updated name"}
    @invalid_attrs %{completed: nil, description: nil, name: nil}

    def pattern_fixture(attrs \\ %{}) do
      {:ok, pattern} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Patterns.create_pattern()

      pattern
    end

    test "list_patterns/0 returns all patterns" do
      pattern = pattern_fixture()
      assert Patterns.list_patterns() == [pattern]
    end

    test "get_pattern!/1 returns the pattern with given id" do
      pattern = pattern_fixture()
      assert Patterns.get_pattern!(pattern.id) == pattern
    end

    test "create_pattern/1 with valid data creates a pattern" do
      assert {:ok, %Pattern{} = pattern} = Patterns.create_pattern(@valid_attrs)
      assert pattern.completed == true
      assert pattern.description == "some description"
      assert pattern.name == "some name"
    end

    test "create_pattern/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Patterns.create_pattern(@invalid_attrs)
    end

    test "update_pattern/2 with valid data updates the pattern" do
      pattern = pattern_fixture()
      assert {:ok, %Pattern{} = pattern} = Patterns.update_pattern(pattern, @update_attrs)
      assert pattern.completed == false
      assert pattern.description == "some updated description"
      assert pattern.name == "some updated name"
    end

    test "update_pattern/2 with invalid data returns error changeset" do
      pattern = pattern_fixture()
      assert {:error, %Ecto.Changeset{}} = Patterns.update_pattern(pattern, @invalid_attrs)
      assert pattern == Patterns.get_pattern!(pattern.id)
    end

    test "delete_pattern/1 deletes the pattern" do
      pattern = pattern_fixture()
      assert {:ok, %Pattern{}} = Patterns.delete_pattern(pattern)
      assert_raise Ecto.NoResultsError, fn -> Patterns.get_pattern!(pattern.id) end
    end

    test "change_pattern/1 returns a pattern changeset" do
      pattern = pattern_fixture()
      assert %Ecto.Changeset{} = Patterns.change_pattern(pattern)
    end
  end
end
