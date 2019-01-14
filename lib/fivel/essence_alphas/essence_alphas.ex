defmodule Fivel.EssenceAlphas do
  @moduledoc """
  The EssenceAlphas context.
  """

  import Ecto.Query, warn: false
  alias Fivel.Repo

  alias Fivel.EssenceAlphas.EssenceAlpha

  alias Fivel.EssenceStates.EssenceState

  @doc """
  Returns the list of essence_alpha.

  ## Examples

      iex> list_essence_alpha()
      [%EssenceAlpha{}, ...]

  """
  def list_essence_alphas do
    Repo.all(EssenceAlpha)
  end

  @doc """
  Gets a single essence_alpha.

  Raises `Ecto.NoResultsError` if the Essence alpha does not exist.

  ## Examples

      iex> get_essence_alpha!(123)
      %EssenceAlpha{}

      iex> get_essence_alpha!(456)
      ** (Ecto.NoResultsError)

  """
  def get_essence_alpha!(id), do: Repo.get!(EssenceAlpha, id)

  @doc """
  Creates a essence_alpha.

  ## Examples

      iex> create_essence_alpha(%{field: value})
      {:ok, %EssenceAlpha{}}

      iex> create_essence_alpha(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_essence_alpha(attrs \\ %{}) do
    %EssenceAlpha{}
    |> EssenceAlpha.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a essence_alpha.

  ## Examples

      iex> update_essence_alpha(essence_alpha, %{field: new_value})
      {:ok, %EssenceAlpha{}}

      iex> update_essence_alpha(essence_alpha, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_essence_alpha(%EssenceAlpha{} = essence_alpha, attrs) do
    essence_alpha
    |> EssenceAlpha.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a EssenceAlpha.

  ## Examples

      iex> delete_essence_alpha(essence_alpha)
      {:ok, %EssenceAlpha{}}

      iex> delete_essence_alpha(essence_alpha)
      {:error, %Ecto.Changeset{}}

  """
  def delete_essence_alpha(%EssenceAlpha{} = essence_alpha) do
    Repo.delete(essence_alpha)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking essence_alpha changes.

  ## Examples

      iex> change_essence_alpha(essence_alpha)
      %Ecto.Changeset{source: %EssenceAlpha{}}

  """
  def change_essence_alpha(%EssenceAlpha{} = essence_alpha) do
    EssenceAlpha.changeset(essence_alpha, %{})
  end

  def add_essence_state(alpha, %{"essence_state" => essence_state_params}) do
    essence_state = %EssenceState{}
      |> EssenceState.changeset(essence_state_params || %{})
      |> Ecto.Changeset.change
      |> Ecto.Changeset.put_assoc(:essence_alpha, alpha)
      |> Repo.insert!

    # Addning patterns (checklist) using chain of responsibility
    essence_state
      |> Fivel.EssenceStates.add_patterns_opportunity_identified(alpha.name)
      |> Fivel.EssenceStates.add_patterns_opportunity_solution_needed(alpha.name)
      |> Fivel.EssenceStates.add_patterns_opportunity_value_established(alpha.name)
      |> Fivel.EssenceStates.add_patterns_opportunity_viable(alpha.name)
      |> Fivel.EssenceStates.add_patterns_opportunity_addressed(alpha.name)
      |> Fivel.EssenceStates.add_patterns_opportunity_benefit_accured(alpha.name)
  end

  def add_essence_states_opportunity(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Identified", "description" => "A commercial, social or business opportunity has been identified that could be addressed by a software-based solution." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Solution Needed", "description" => "The need for a software-based solution has been confirmed." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Value Established", "description" => "The value of a successful solution has been established." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Viable", "description" => "It is agreed that a solution can be produced quickly and cheaply enough to successfully address the opportunity." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Addressed", "description" => "A solution has been produced that demonstrably addresses the opportunity." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Benefit Accured", "description" => "The operational useor sale of the solution is creating tangible benefits." }})
  end

  def add_essence_states_stakeholders(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Recognized", "description" => "Stakeholders have been identified." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Represented", "description" => "The mechanisms for involving the stakeholders are agreed and the stakeholder representatives have been appointed." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Involved", "description" => "The stakeholder representatives are actively involved in the work and fulfilling their responsibilities." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "In Agreement", "description" => "The stakeholder representatives are in agreement." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Satisfied for Deployment", "description" => "The minimal expectations of the stakeholder representatives have been achieved." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Satisfied in Use", "description" => "The system has met or exceeds the minimal stakeholder expectations." }})
  end
  def add_essence_states_requirements(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Conceived", "description" => "The need for a new system has been agreed." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Bounded", "description" => "The purpose and extent of the new system are clear." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Coherent", "description" => "The requirements provide a consistent description of the essential characteristics of the new system." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Acceptable", "description" => "The requirements describe a system that is acceptable to the stakeholders." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Addressed", "description" => "Enough of the requirements have been addressed to satisfy the need for a new system in a way that is acceptable to the stakeholders." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Fulfilled", "description" => "The requirements that have been addressed fully satisfy the need for a new system." }})
  end
  def add_essence_states_software_system(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Architecture Selected", "description" => "An architecture has been selected that addresses the key technical risks and any applicable organizational constraints." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Demonstrable", "description" => "An executable version of the system is available that demonstrates the architecture is fit for purpose and supports testing." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Usable", "description" => "The system is usable and demonstrates all of the quality characteristics of an operational system." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Ready", "description" => "The system (as a whole) has been accepted for deployment in a live environment." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Operational", "description" => "The system is in use in an operational environment." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Retired", "description" => "The system is no longer supported." }})

  end
  def add_essence_states_team(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Seeded", "description" => "The team’s mission is clear and the know-how needed to grow the team is in place." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Formed", "description" => "The team has been populated with enough committed people to start to pursue the team mission." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Collaborating", "description" => "The team members are working together as one unit." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Performing", "description" => "The team is working effectively and efficiently." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Adjourned", "description" => "The team is no longer accountable for carrying out its mission." }})
  end
  def add_essence_states_work(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Initiated", "description" => "The work has been requested." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Prepared", "description" => "All pre-conditions for starting the work have been met." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Started", "description" => "The work is proceeding." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Under Control", "description" => "The work is going well, risks are under control, and productivity levels are sufficient to achieve a satisfactory result." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Concluded", "description" => "The work to produce the results has been concluded." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Closed", "description" => "All remaining housekeeping tasks have been completed and the work has been officially closed." }})
  end
  def add_essence_states_way_of_working(alpha) do
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Principles Established", "description" => "The principles, and constraints, that shape the way-of-working are established." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Foundation Established", "description" => "The key practices, and tools, that form the foundation of the way of working are selected and ready for use." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "In Use", "description" => "Some members of the team are using, and adapting, the way-of-working." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "In Place", "description" => "All team members are using the way of working to accomplish their work." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Working Well", "description" => "The team's way of working is working well for the team." }})
    add_essence_state( alpha, %{"essence_state" => %{"name" => "Retired", "description" => "The way of working is no longer in use by the team." }})
  end

end
