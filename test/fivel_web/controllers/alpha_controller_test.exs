defmodule FivelWeb.AlphaControllerTest do
  use FivelWeb.ConnCase

  alias Fivel.Api.Alphas
  alias Fivel.Api.Alphas.Api.Alpha

  @create_attrs %{
    description: "some description",
    item: "some item"
  }
  @update_attrs %{
    description: "some updated description",
    item: "some updated item"
  }
  @invalid_attrs %{description: nil, item: nil}

  def fixture(:alpha) do
    {:ok, alpha} = Alphas.create_alpha(@create_attrs)
    alpha
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all alphas", %{conn: conn} do
      conn = get(conn, Routes.alpha_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create alpha" do
    test "renders alpha when data is valid", %{conn: conn} do
      conn = post(conn, Routes.alpha_path(conn, :create), alpha: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.alpha_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "item" => "some item"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.alpha_path(conn, :create), alpha: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update alpha" do
    setup [:create_alpha]

    test "renders alpha when data is valid", %{conn: conn, alpha: %Alpha{id: id} = alpha} do
      conn = put(conn, Routes.alpha_path(conn, :update, alpha), alpha: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.alpha_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "item" => "some updated item"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, alpha: alpha} do
      conn = put(conn, Routes.alpha_path(conn, :update, alpha), alpha: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete alpha" do
    setup [:create_alpha]

    test "deletes chosen alpha", %{conn: conn, alpha: alpha} do
      conn = delete(conn, Routes.alpha_path(conn, :delete, alpha))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.alpha_path(conn, :show, alpha))
      end
    end
  end

  defp create_alpha(_) do
    alpha = fixture(:alpha)
    {:ok, alpha: alpha}
  end
end
