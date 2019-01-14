defmodule Fivel.EssenceStates do
  @moduledoc """
  The EssenceStates context.
  """

  import Ecto.Query, warn: false
  alias Fivel.Repo

  alias Fivel.EssenceStates.EssenceState

  @doc """
  Returns the list of essence_states.

  ## Examples

      iex> list_essence_states()
      [%EssenceState{}, ...]

  """
  def list_essence_states do
    Repo.all(EssenceState)
  end

  @doc """
  Gets a single essence_state.

  Raises `Ecto.NoResultsError` if the Essence state does not exist.

  ## Examples

      iex> get_essence_state!(123)
      %EssenceState{}

      iex> get_essence_state!(456)
      ** (Ecto.NoResultsError)

  """
  def get_essence_state!(id), do: Repo.get!(EssenceState, id)

  @doc """
  Creates a essence_state.

  ## Examples

      iex> create_essence_state(%{field: value})
      {:ok, %EssenceState{}}

      iex> create_essence_state(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_essence_state(attrs \\ %{}) do
    %EssenceState{}
    |> EssenceState.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a essence_state.

  ## Examples

      iex> update_essence_state(essence_state, %{field: new_value})
      {:ok, %EssenceState{}}

      iex> update_essence_state(essence_state, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_essence_state(%EssenceState{} = essence_state, attrs) do
    essence_state
    |> EssenceState.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a EssenceState.

  ## Examples

      iex> delete_essence_state(essence_state)
      {:ok, %EssenceState{}}

      iex> delete_essence_state(essence_state)
      {:error, %Ecto.Changeset{}}

  """
  def delete_essence_state(%EssenceState{} = essence_state) do
    Repo.delete(essence_state)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking essence_state changes.

  ## Examples

      iex> change_essence_state(essence_state)
      %Ecto.Changeset{source: %EssenceState{}}

  """
  def change_essence_state(%EssenceState{} = essence_state) do
    EssenceState.changeset(essence_state, %{})
  end


  def add_pattern(essence_state, %{"pattern" => pattern_params}) do
    pattern = %Fivel.Patterns.Pattern{}
      |> EssenceState.changeset(pattern_params || %{})
      |> Ecto.Changeset.change
      |> Ecto.Changeset.put_assoc(:essence_state, essence_state)
      |> Repo.insert!
  end
  
  def add_patterns_opportunity_identified(state, essence_alpha_name) do
    if state.name == "Identified" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Idea behind opportunity identified", "description" => "An idea for a way of improving current ways of working, increasing market share, or applying a new or innovative software system has been identified", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "At least one investing stakeholder interested", "description" => "At least one of the stakeholders wishes to make an investment in better understanding the opportunity and the value associated with addressing it.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Other stakeholders identified", "description" => "The other stakeholders who share the opportunity have been identified.", "completed" => false }})
    end
    state
  end 
  def add_patterns_opportunity_solution_needed(state, essence_alpha_name) do
    if state.name == "Solution Needed" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Solution identified", "description" => "The stakeholders in the opportunity and the proposed solution have been identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders' needs established", "description" => "The stakeholders' needs that generate the opportunity have been established.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Problems and root causes identified", "description" => "Any underlying problems and their root causes have been identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Need for a solution confirmed", "description" => "It has been confirmed that a software-based solution is needed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "At least one solution proposed", "description" => "At least one software-based solution has been proposed.", "completed" => false }})    
    end
    state
  end

  def add_patterns_opportunity_value_established(state, essence_alpha_name) do
    if state.name == "Value Established" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Opportunity value quantified", "description" => "The value of addressing the opportunity has been quantified either in absolute terms or in returns or savings per time period (e.g., per annum).", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Solution impact understood", "description" => "The impact of the solution on the stakeholders is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System value understood", "description" => "The value that the software system offers to the stakeholders that fund and use the software system is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Success criteria clear", "description" => "The success criteria by which the deployment of the software system is to be judged are clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Outcomes clear and quantified", "description" => "The desired outcomes required of the solution are clear and quantified.", "completed" => false }})
    end
    state
  end

  def add_patterns_opportunity_viable(state, essence_alpha_name) do
    if state.name == "Viable" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Solution outlined", "description" => "A solution has been outlined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Solution possible within constraints", "description" => "The indications are that the solution can be developed and deployed within constraints.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Risks acceptable & manageable", "description" => "The risks associated with the solution are acceptable and manageable.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Solution profitable", "description" => "The indicative (ball-park) costs of the solution are less than the anticipated value of the opportunity.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Reasons to develop solution understood", "description" => "The reasons for the development of a software-based solution are understood by all members of the team.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Pursuit viable", "description" => "It is clear that the pursuit of the opportunity is viable.", "completed" => false }})
    end
    state
  end

  def add_patterns_opportunity_addressed(state, essence_alpha_name) do
    if state.name == "Addressed" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Opportunity addressed", "description" => "A usable system that demonstrably addresses the opportunity is available.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Solution worth deploying", "description" => "The stakeholders agree that the available solution is worth deploying.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders satisfied", "description" => "The stakeholders are satisfied that the solution produced addresses the opportunity.", "completed" => false }})
    end
    state
  end

  def add_patterns_opportunity_benefit_accured(state, essence_alpha_name) do
    if state.name == "Benefit Accured" and essence_alpha_name == "Opportunity" do
      add_pattern( state, %{"pattern" => %{"name" => "Solution accures benefits", "description" => "The solution has started to accrue benefits for the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "ROI acceptable", "description" => "The return-on-investment profile is at least as good as anticipated.", "completed" => false }})
    end
    state
  end
end
