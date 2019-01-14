defmodule FivelWeb.EssenceStateView do
  use FivelWeb, :view
  alias FivelWeb.EssenceStateView

  def render("index.json", %{essence_states: essence_states}) do
    %{data: render_many(essence_states, EssenceStateView, "essence_state.json")}
  end

  def render("show.json", %{essence_state: essence_state}) do
    %{data: render_one(essence_state, EssenceStateView, "essence_state.json")}
  end

  def render("essence_state.json", %{essence_state: essence_state}) do
    %{id: essence_state.id,
      name: essence_state.name,
      description: essence_state.description,
      patterns: essence_state.patterns
    }
  end
end
