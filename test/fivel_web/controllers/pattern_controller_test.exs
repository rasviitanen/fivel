defmodule FivelWeb.PatternControllerTest do
  use FivelWeb.ConnCase

  alias Fivel.Patterns
  alias Fivel.Patterns.Pattern

  @create_attrs %{
    completed: true,
    description: "some description",
    name: "some name"
  }
  @update_attrs %{
    completed: false,
    description: "some updated description",
    name: "some updated name"
  }
  @invalid_attrs %{completed: nil, description: nil, name: nil}

  def fixture(:pattern) do
    {:ok, pattern} = Patterns.create_pattern(@create_attrs)
    pattern
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all patterns", %{conn: conn} do
      conn = get(conn, Routes.pattern_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create pattern" do
    test "renders pattern when data is valid", %{conn: conn} do
      conn = post(conn, Routes.pattern_path(conn, :create), pattern: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.pattern_path(conn, :show, id))

      assert %{
               "id" => id,
               "completed" => true,
               "description" => "some description",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.pattern_path(conn, :create), pattern: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update pattern" do
    setup [:create_pattern]

    test "renders pattern when data is valid", %{conn: conn, pattern: %Pattern{id: id} = pattern} do
      conn = put(conn, Routes.pattern_path(conn, :update, pattern), pattern: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.pattern_path(conn, :show, id))

      assert %{
               "id" => id,
               "completed" => false,
               "description" => "some updated description",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, pattern: pattern} do
      conn = put(conn, Routes.pattern_path(conn, :update, pattern), pattern: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete pattern" do
    setup [:create_pattern]

    test "deletes chosen pattern", %{conn: conn, pattern: pattern} do
      conn = delete(conn, Routes.pattern_path(conn, :delete, pattern))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.pattern_path(conn, :show, pattern))
      end
    end
  end

  defp create_pattern(_) do
    pattern = fixture(:pattern)
    {:ok, pattern: pattern}
  end
end
