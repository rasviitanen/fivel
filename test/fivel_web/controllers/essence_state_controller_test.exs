defmodule FivelWeb.EssenceStateControllerTest do
  use FivelWeb.ConnCase

  alias Fivel.EssenceStates
  alias Fivel.EssenceStates.EssenceState

  @create_attrs %{
    description: "some description",
    name: "some name"
  }
  @update_attrs %{
    description: "some updated description",
    name: "some updated name"
  }
  @invalid_attrs %{description: nil, name: nil}

  def fixture(:essence_state) do
    {:ok, essence_state} = EssenceStates.create_essence_state(@create_attrs)
    essence_state
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all essence_states", %{conn: conn} do
      conn = get(conn, Routes.essence_state_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create essence_state" do
    test "renders essence_state when data is valid", %{conn: conn} do
      conn = post(conn, Routes.essence_state_path(conn, :create), essence_state: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.essence_state_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.essence_state_path(conn, :create), essence_state: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update essence_state" do
    setup [:create_essence_state]

    test "renders essence_state when data is valid", %{conn: conn, essence_state: %EssenceState{id: id} = essence_state} do
      conn = put(conn, Routes.essence_state_path(conn, :update, essence_state), essence_state: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.essence_state_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, essence_state: essence_state} do
      conn = put(conn, Routes.essence_state_path(conn, :update, essence_state), essence_state: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete essence_state" do
    setup [:create_essence_state]

    test "deletes chosen essence_state", %{conn: conn, essence_state: essence_state} do
      conn = delete(conn, Routes.essence_state_path(conn, :delete, essence_state))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.essence_state_path(conn, :show, essence_state))
      end
    end
  end

  defp create_essence_state(_) do
    essence_state = fixture(:essence_state)
    {:ok, essence_state: essence_state}
  end
end
