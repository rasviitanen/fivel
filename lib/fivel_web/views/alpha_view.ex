defmodule FivelWeb.AlphaView do
  use FivelWeb, :view
  alias FivelWeb.AlphaView

  def render("index.json", %{alphas: alphas}) do
    %{data: render_many(alphas, AlphaView, "alpha.json")}
  end

  def render("show.json", %{alpha: alpha}) do
    %{data: render_one(alpha, AlphaView, "alpha.json")}
  end

  def render("alpha.json", %{alpha: alpha}) do
    %{id: alpha.id,
      description: alpha.description}
  end
end
