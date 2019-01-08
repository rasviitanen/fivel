defmodule Fivel.EssenceStatesTest do
  use Fivel.DataCase

  alias Fivel.EssenceStates

  describe "essence_states" do
    alias Fivel.EssenceStates.EssenceState

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def essence_state_fixture(attrs \\ %{}) do
      {:ok, essence_state} =
        attrs
        |> Enum.into(@valid_attrs)
        |> EssenceStates.create_essence_state()

      essence_state
    end

    test "list_essence_states/0 returns all essence_states" do
      essence_state = essence_state_fixture()
      assert EssenceStates.list_essence_states() == [essence_state]
    end

    test "get_essence_state!/1 returns the essence_state with given id" do
      essence_state = essence_state_fixture()
      assert EssenceStates.get_essence_state!(essence_state.id) == essence_state
    end

    test "create_essence_state/1 with valid data creates a essence_state" do
      assert {:ok, %EssenceState{} = essence_state} = EssenceStates.create_essence_state(@valid_attrs)
      assert essence_state.description == "some description"
      assert essence_state.name == "some name"
    end

    test "create_essence_state/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = EssenceStates.create_essence_state(@invalid_attrs)
    end

    test "update_essence_state/2 with valid data updates the essence_state" do
      essence_state = essence_state_fixture()
      assert {:ok, %EssenceState{} = essence_state} = EssenceStates.update_essence_state(essence_state, @update_attrs)
      assert essence_state.description == "some updated description"
      assert essence_state.name == "some updated name"
    end

    test "update_essence_state/2 with invalid data returns error changeset" do
      essence_state = essence_state_fixture()
      assert {:error, %Ecto.Changeset{}} = EssenceStates.update_essence_state(essence_state, @invalid_attrs)
      assert essence_state == EssenceStates.get_essence_state!(essence_state.id)
    end

    test "delete_essence_state/1 deletes the essence_state" do
      essence_state = essence_state_fixture()
      assert {:ok, %EssenceState{}} = EssenceStates.delete_essence_state(essence_state)
      assert_raise Ecto.NoResultsError, fn -> EssenceStates.get_essence_state!(essence_state.id) end
    end

    test "change_essence_state/1 returns a essence_state changeset" do
      essence_state = essence_state_fixture()
      assert %Ecto.Changeset{} = EssenceStates.change_essence_state(essence_state)
    end
  end
end
