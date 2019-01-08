defmodule FivelWeb.EssenceAlphaControllerTest do
  use FivelWeb.ConnCase

  alias Fivel.EssenceAlphas
  alias Fivel.EssenceAlphas.EssenceAlpha

  @create_attrs %{
    description: "some description",
    name: "some name"
  }
  @update_attrs %{
    description: "some updated description",
    name: "some updated name"
  }
  @invalid_attrs %{description: nil, name: nil}

  def fixture(:essence_alpha) do
    {:ok, essence_alpha} = EssenceAlphas.create_essence_alpha(@create_attrs)
    essence_alpha
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all essence_alphas", %{conn: conn} do
      conn = get(conn, Routes.essence_alpha_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create essence_alpha" do
    test "renders essence_alpha when data is valid", %{conn: conn} do
      conn = post(conn, Routes.essence_alpha_path(conn, :create), essence_alpha: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.essence_alpha_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.essence_alpha_path(conn, :create), essence_alpha: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update essence_alpha" do
    setup [:create_essence_alpha]

    test "renders essence_alpha when data is valid", %{conn: conn, essence_alpha: %EssenceAlpha{id: id} = essence_alpha} do
      conn = put(conn, Routes.essence_alpha_path(conn, :update, essence_alpha), essence_alpha: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.essence_alpha_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, essence_alpha: essence_alpha} do
      conn = put(conn, Routes.essence_alpha_path(conn, :update, essence_alpha), essence_alpha: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete essence_alpha" do
    setup [:create_essence_alpha]

    test "deletes chosen essence_alpha", %{conn: conn, essence_alpha: essence_alpha} do
      conn = delete(conn, Routes.essence_alpha_path(conn, :delete, essence_alpha))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.essence_alpha_path(conn, :show, essence_alpha))
      end
    end
  end

  defp create_essence_alpha(_) do
    essence_alpha = fixture(:essence_alpha)
    {:ok, essence_alpha: essence_alpha}
  end
end
