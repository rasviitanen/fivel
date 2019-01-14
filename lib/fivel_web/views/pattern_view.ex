defmodule FivelWeb.PatternView do
  use FivelWeb, :view
  alias FivelWeb.PatternView

  def render("index.json", %{patterns: patterns}) do
    %{data: render_many(patterns, PatternView, "pattern.json")}
  end

  def render("show.json", %{pattern: pattern}) do
    %{data: render_one(pattern, PatternView, "pattern.json")}
  end

  def render("pattern.json", %{pattern: pattern}) do
    %{id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      completed: pattern.completed}
  end
end
