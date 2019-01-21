defmodule FivelWeb.PatternController do
  use FivelWeb, :controller

  alias Fivel.Patterns
  alias Fivel.Patterns.Pattern

  action_fallback FivelWeb.FallbackController

  def index(conn, _params) do
    patterns = Patterns.list_patterns()
    render(conn, "index.json", patterns: patterns)
  end

  def create(conn, %{"pattern" => pattern_params}) do
    with {:ok, %Pattern{} = pattern} <- Patterns.create_pattern(pattern_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.pattern_path(conn, :show, pattern))
      |> render("show.json", pattern: pattern)
    end
  end

  def show(conn, %{"id" => id}) do
    pattern = Patterns.get_pattern!(id)
    render(conn, "show.json", pattern: pattern)
  end

  def update(conn, %{"id" => id, "pattern" => pattern_params}) do
    pattern = Patterns.get_pattern!(id)

    with {:ok, %Pattern{} = pattern} <- Patterns.update_pattern(pattern, pattern_params) do
      render(conn, "show.json", pattern: pattern)
    end
  end

  def setCompleted(conn, %{"id" => id}) do
    pattern = Patterns.get_pattern!(id)

    with {:ok, %Pattern{} = pattern} <- Patterns.update_pattern(pattern, %{ "completed" => true }) do
      render(conn, "show.json", pattern: pattern)
    end
  end

  def setUncompleted(conn, %{"id" => id}) do
    pattern = Patterns.get_pattern!(id)

    with {:ok, %Pattern{} = pattern} <- Patterns.update_pattern(pattern, %{ "completed" => false }) do
      render(conn, "show.json", pattern: pattern)
    end
  end

  def delete(conn, %{"id" => id}) do
    pattern = Patterns.get_pattern!(id)

    with {:ok, %Pattern{}} <- Patterns.delete_pattern(pattern) do
      send_resp(conn, :no_content, "")
    end
  end
end
