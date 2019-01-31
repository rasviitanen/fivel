defmodule FivelWeb.CommentView do
  use FivelWeb, :view
  alias FivelWeb.CommentView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      content: comment.content,
      user: comment.user.username
    }
  end
end
