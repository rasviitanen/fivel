defmodule FivelWeb.EssenceAlphaView do
  use FivelWeb, :view
  alias FivelWeb.EssenceAlphaView

  def render("index.json", %{essence_alphas: essence_alphas}) do
    %{data: render_many(essence_alphas, EssenceAlphaView, "essence_alpha.json")}
  end

  def render("show.json", %{essence_alpha: essence_alpha}) do
    %{data: render_one(essence_alpha, EssenceAlphaView, "essence_alpha.json")}
  end

  def render("essence_alpha.json", %{essence_alpha: essence_alpha}) do
    %{id: essence_alpha.id,
      name: essence_alpha.name,
      description: essence_alpha.description}
  end
end
