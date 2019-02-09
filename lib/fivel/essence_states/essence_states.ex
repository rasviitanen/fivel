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

  def add_todo(essence_state, %{"todo" => todo_params}) do
    todo = %Fivel.Todos.Todo{} 
      |> Fivel.Todos.Todo.changeset(todo_params || %{})
      |> Ecto.Changeset.change
      |> Ecto.Changeset.put_assoc(:essence_state, essence_state)
      |> Repo.insert!
  end

  def add_comment(essence_state, user, %{"comment" => comment_params}) do
    comment = %Fivel.Comments.Comment{} 
      |> Fivel.Comments.Comment.changeset(comment_params || %{})
      |> Ecto.Changeset.change
      |> Ecto.Changeset.put_assoc(:essence_state, essence_state)
      |> Ecto.Changeset.put_assoc(:user, user)
      |> Repo.insert!
  end
  
  def add_pattern(essence_state, %{"pattern" => pattern_params}) do
    pattern = %Fivel.Patterns.Pattern{}
      |> Fivel.Patterns.Pattern.changeset(pattern_params || %{})
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

  

  def add_patterns_stakeholders_recognized(state, essence_alpha_name) do
    if state.name == "Recognized" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholder groups identified", "description" => "All the different groups of stakeholders that are, or will be, affected by the development and operation of the software system are identified", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Key stakeholder groups represented", "description" => "There is agreement on the stakeholder groups to be represented. At a minimum, the stakeholders groups that fund, use, support, and maintain the system have been considered.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Responsibilities defined", "description" => "The responsibilities of the stakeholder representatives have been defined.", "completed" => false }})
    end
    state
  end 

  def add_patterns_stakeholders_represented(state, essence_alpha_name) do
    if state.name == "Represented" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Responsibilities agreed", "description" => "The stakeholder representatives have agreed to take on their responsibilities", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Representatives authorized", "description" => "The stakeholder representatives are authorized to carry out their responsibilities.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Collaboration approach agreed", "description" => "The collaboration approach among the stakeholder representatives has been agreed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Way of working supported & respected", "description" => "The stakeholder representatives support and respect the team's way of working.", "completed" => false }})
    end
    state
  end 
  def add_patterns_stakeholders_involved(state, essence_alpha_name) do
    if state.name == "Involved" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Representatives assist the team", "description" => "The stakeholder representatives assist the team in accordance with their responsibilities.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Timely feedback and decisions provided", "description" => "The stakeholder representatives provide feedback and take part in decision making in a timely manner.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Changes promptly communicated", "description" => "The stakeholder representatives promptly communicate changes that are relevant for their stakeholder groups.", "completed" => false }})
    end
    state
  end 

  def add_patterns_stakeholders_in_agreement(state, essence_alpha_name) do
    if state.name == "In Agreement" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Minimal expectations agreed", "description" => "The stakeholder representatives have agreed upon their minimal expectations for the next deployment of the new system.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Rep's happy with their involvement", "description" => "The stakeholder representatives are happy with their involvement in the work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Rep's input valued", "description" => "The stakeholder representatives agree that their input is valued by the team and treated with respect.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Team's input valued", "description" => "The team members agree that their input is valued by the stakeholder representatives and treated with respect.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Priorities clear & perspectives balanced", "description" => "The stakeholder representatives agree with how their different priorities and perspectives are being balanced to provide a clear direction for the team.", "completed" => false }})
    end
    state
  end 

  def add_patterns_stakeholders_satisfied_for_deployment(state, essence_alpha_name) do
    if state.name == "Satisfied for Deployment" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholder feedback provided", "description" => "The stakeholder representatives provide feedback on the system from their stakeholder group perspective.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System ready for deployment", "description" => "The stakeholder representatives confirm that they agree that the system is ready for deployment.", "completed" => false }})
    end
    state
  end 

  def add_patterns_stakeholders_satisfied_in_use(state, essence_alpha_name) do
    if state.name == "Satisfied in Use" and essence_alpha_name == "Stakeholders" do
      add_pattern( state, %{"pattern" => %{"name" => "Feedback on system use available", "description" => "Stakeholders are using the new system and providing feedback on their experiences.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System meets expectations", "description" => "The stakeholders confirm that the new system meets their expectations.", "completed" => false }})
    end
    state
  end 

  def add_patterns_requirements_conceived(state, essence_alpha_name) do
    if state.name == "Conceived" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders agree system is to be produced", "description" => "The initial set of stakeholders agrees that a system is to be produced.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Users Identified", "description" => "The stakeholders that will use the new system are identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Funding stakeholders identified", "description" => "The stakeholders that will fund the initial work on the new system are identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Opportunity Clear", "description" => "There is a clear opportunity for the new system to address.", "completed" => false }})
    end
    state
  end 

  def add_patterns_requirements_bounded(state, essence_alpha_name) do
    if state.name == "Bounded" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Development stakeholder identified", "description" => "The stakeholders involved in developing the new system are identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System purpose agreed", "description" => "The stakeholders agree on the purpose of the new system.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System success clear", "description" => "It is clear what success is for the new system.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Shared solution understanding exists", "description" => "The stakeholders have a shared understanding of the extent of the proposed solution.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Requirement's format agreed", "description" => "The way the requirements will be described is agreed upon.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Requirements management in place", "description" => "The mechanisms for managing the requirements are in place.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Prioritization scheme clear", "description" => "The prioritization scheme is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Constraints identified & considered", "description" => "Constraints are identified and considered.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Assumptions clear", "description" => "Assumptions are clearly stated.", "completed" => false }})
    end
    state
  end 
  def add_patterns_requirements_coherent(state, essence_alpha_name) do
    if state.name == "Coherent" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Requirements shared", "description" => "The requirements are captured and shared with the team and the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Requirement's origin clear", "description" => "The origin of the requirements is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Rationale clear", "description" => "The rationale behind the requirements is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Conflicts addressed", "description" => "Conflicting requirements are identified and attended to.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Essential characteristics clear", "description" => "The requirements communicate the essential characteristics of the system to be delivered.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Key usage scenarios explained", "description" => "The most important usage scenarios for the system can be explained.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Priorities clear", "description" => "The priority of the requirements is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Impact understood", "description" => "The impact of implementing the requirements is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Team knows & agrees on what to deliver", "description" => "The team understands what has to be delivered and agrees to deliver it.", "completed" => false }})
    
    end
    state
  end 
  def add_patterns_requirements_acceptable(state, essence_alpha_name) do
    if state.name == "Acceptable" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Aceeptable solution described", "description" => "The stakeholders accept that the requirements describe an acceptable solution.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Change under control", "description" => "The rate of change to the agreed requirements is relatively low and under control.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Value to be realized clear", "description" => "The value provided by implementing the requirements is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Clear how opportunity addressed", "description" => "The parts of the opportunity satisfied by the requirements are clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Testable", "description" => "The requirements are testable.", "completed" => false }})
    end
    state
  end 
  def add_patterns_requirements_addressed(state, essence_alpha_name) do
    if state.name == "Addressed" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Enough addressed to be acceptable", "description" => "Enough of the requirements are addressed for the resulting system to be acceptable to the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Requirements and system match", "description" => "The stakeholders accept the requirements as accurately reflecting what the system does and does not do.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Value realized clear", "description" => "The set of requirement items implemented provide clear value to the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System worth making operational", "description" => "The system implementing the requirements is accepted by the stakeholders as worth making operational.", "completed" => false }})
    end
    state
  end 
  def add_patterns_requirements_fulfilled(state, essence_alpha_name) do
    if state.name == "Fulfilled" and essence_alpha_name == "Requirements" do
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders accept requirements", "description" => "The stakeholders accept the requirements as accurately capturing what they require to fully satisfy the need for a new system.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "No hindering requirements", "description" => "There are no outstanding requirement items preventing the system from being accepted as fully satisfying the requirements.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Requirements fully satisfied", "description" => "The system is accepted by the stakeholders as fully satisfying the requirements.", "completed" => false }})
    end
    state
  end



  def add_patterns_software_system_architecture_selected(state, essence_alpha_name) do
    if state.name == "Architecture Selected" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "Architecture selection criteria agreed", "description" => "The criteria to be used when selecting the architecture have been agreed on.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "HW platforms identified", "description" => "Hardware platforms have been identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Technologies selected", "description" => "Programming languages and technologies to be used have been selected.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System boundary known", "description" => "System boundary is known.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Decisions on system organization made", "description" => "Significant decisions about the organization of the system have been made.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Buy, build, reuse decisions made", "description" => "Buy, build, and reuse decisions have been made.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Key technical risks agreed to", "description" => "Key technical risks agreed to.", "completed" => false }})
    end
    state
  end 

  def add_patterns_software_system_demonstrable(state, essence_alpha_name) do
    if state.name == "Demonstrable" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "Key architectural characteristics demonstrated", "description" => "Key architectural characteristics have been demonstrated.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System exercised & performance measured", "description" => "The system can be exercised and its performance can be measured.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Critical HW configurations demonstrated", "description" => "Critical hardware configurations have been demonstrated.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Critical interfaces demonstrated", "description" => "Critical interfaces have been demonstrated.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Integration with environment demonstrated", "description" => "The integration with other existing systems has been demonstrated.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Architecture accepted as fit-for-purpose", "description" => "The relevant stakeholders agree that the demonstrated architecture is appropriate.", "completed" => false }})
    end
    state
  end 
  def add_patterns_software_system_usable(state, essence_alpha_name) do
    if state.name == "Usable" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "System can be operated", "description" => "The system can be operated by stakeholders who use it.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System functionally tested", "description" => "The functionality provided by the system has been tested.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System performance acceptable", "description" => "The performance of the system is acceptable to the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Defect levels acceptable", "description" => "Defect levels are acceptable to the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System fully documented", "description" => "The system is fully documented.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Release content known", "description" => "Release content is known.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Added value clear", "description" => "The added value provided by the system is clear.", "completed" => false }})
    end
    state
  end 
  def add_patterns_software_system_ready(state, essence_alpha_name) do
    if state.name == "Ready" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "User documentation available", "description" => "Installation and other user documentation are available.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System accepted as fit-for-purpose", "description" => "The stakeholder representatives accept the system as fit-for-purpose.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders want the system", "description" => "The stakeholder representatives want to make the system operational.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Operational support in place", "description" => "Operational support is in place.", "completed" => false }})
    end
    state
  end 
  def add_patterns_software_system_operational(state, essence_alpha_name) do
    if state.name == "Operational" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "System available for use", "description" => "The system has been made available to the stakeholders intended to use it.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "System live", "description" => "At least one example of the system is fully operational.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Agreed service levels supported", "description" => "The system is fully supported to the agreed service levels.", "completed" => false }})
    end
    state
  end 
  def add_patterns_software_system_retired(state, essence_alpha_name) do
    if state.name == "Retired" and essence_alpha_name == "Software System" do
      add_pattern( state, %{"pattern" => %{"name" => "Replaced or discontinued", "description" => "The system has been replaced or discontinued.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "No longer supported", "description" => "The system is no longer supported.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "No authorized users", "description" => "There are no “official” stakeholders who still use the system.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Updates stopped", "description" => "Updates to the system will no longer be produced.", "completed" => false }})
    end
    state
  end 



  def add_patterns_team_seeded(state, essence_alpha_name) do
    if state.name == "Seeded" and essence_alpha_name == "Team" do
      add_pattern( state, %{"pattern" => %{"name" => "Mission defined", "description" => "The team mission has been defined in terms of the opportunities and outcomes.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Operational constraints known and defined", "description" => "Constraints on the team's operation are known.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Growth mechanisms in place", "description" => "Mechanisms to grow the team are in place.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Composition defined", "description" => "The composition of the team is defined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Work constraints defined", "description" => "Any constraints on where and how the work is carried out are defined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Responsibilities outlined", "description" => "The team's responsibilities are outlined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Required commitment level clear", "description" => "The level of team commitment is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Required competencies identified", "description" => "Required competencies are identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Size determined", "description" => "The team size is determined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Governance rules defined", "description" => "Governance rules are defined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Leadershiop model selected", "description" => "Leadership model is determined.", "completed" => false }})
    end
    state
  end 

  def add_patterns_team_formed(state, essence_alpha_name) do
    if state.name == "Formed" and essence_alpha_name == "Team" do
      add_pattern( state, %{"pattern" => %{"name" => "Individual responsibilities understood", "description" => "Individual responsibilities are understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Enough members recruited", "description" => "Enough team members have been recruited to enable the work to progress.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Roles understood", "description" => "Every team member understands how the team is organized and what their individual role is.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "How to work understood", "description" => "All team members understand how to perform their work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Members introduced", "description" => "The team members have met (perhaps virtually) and are beginning to get to know each other.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Individual responsibilities accepted and aligned to competencies", "description" => "The team members understand their responsibilities and how they align with their competencies.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Members accepting work", "description" => "Team members are accepting work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "External collaborators identified", "description" => "Any external collaborators (organizations, teams and individuals) are identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Communication mechanisms defined", "description" => "Team communication mechanisms have been defined.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Members commit to learn", "description" => "Each team member commits to working on the team as defined.", "completed" => false }})
    end
    state
  end 

  def add_patterns_team_collaborating(state, essence_alpha_name) do
    if state.name == "Collaborating" and essence_alpha_name == "Team" do
      add_pattern( state, %{"pattern" => %{"name" => "Works as one unit", "description" => "The team is working as one cohesive unit.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Communication open and honest", "description" => "Communication within the team is open and honest.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Focused on mission", "description" => "The team is focused on achieving the team mission.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Members know each other", "description" => "The team members knowand trusteach other.", "completed" => false }})
    end
    state
  end  

  def add_patterns_team_performing(state, essence_alpha_name) do
    if state.name == "Performing" and essence_alpha_name == "Team" do
      add_pattern( state, %{"pattern" => %{"name" => "Consistently meeting commitments", "description" => "The team consistently meets its commitments.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Continuously adapting to change", "description" => "The team continuously adapts to the changing context.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Addresses problems", "description" => "The team identifies and addresses problems without outside help.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Rework and backtracking minimized", "description" => "Effective progress is being achieved with minimal avoidable backtracking and reworking.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Waste continuously eliminated", "description" => "Wasted work and the potential for wasted work are continuously identified andeliminated.", "completed" => false }})
    end
    state
  end  

  def add_patterns_team_adjourned(state, essence_alpha_name) do
    if state.name == "Adjourned" and essence_alpha_name == "Team" do
      add_pattern( state, %{"pattern" => %{"name" => "Responsibilities fulfilled", "description" => "The team responsibilities have been handed over or fulfilled.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Members available to other teams", "description" => "The team members are available for assignment to other teams.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Mission concluded", "description" => "No further effort is being put in by the team to complete the mission.", "completed" => false }})
    end
    state
  end  



  def add_patterns_work_initiated(state, essence_alpha_name) do
    if state.name == "Initiated" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Required result clear", "description" => "The result required of the work being initiated is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Constraints clear", "description" => "Any constraints on the work’s performance are clearly identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Funding stakeholders known", "description" => "The stakeholders that will fund the work are known.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Initiator defined", "description" => "The initiator of the work is clearly identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Accepting stakeholders known", "description" => "The stakeholders that will accept the results are known.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Source of funding clear", "description" => "The source of funding is clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Priority clear", "description" => "The priority of the work is clear.", "completed" => false }})
    end
    state
  end  
  def add_patterns_work_prepared(state, essence_alpha_name) do
    if state.name == "Prepared" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Commitment made", "description" => "Commitment is made.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Resource availability understood", "description" => "Resource availability is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Governance policies & procedures clear", "description" => "Governance policies and procedures are clear.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Risk exposure understood", "description" => "Risk exposure is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Acceptance criteria established", "description" => "Acceptance criteria are defined and agreed with client.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Sufficiently broken down to start", "description" => "The work is broken down sufficiently for productive work to start.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Tasks identified and prioritized", "description" => "Tasks have been identified and prioritized by the team and stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Credible plan in place", "description" => "A credible plan is in place.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Funding in place", "description" => "Funding to start the work is in place.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "At least one team member ready", "description" => "The team or at least some of the team members are ready to start the work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Integration points defined", "description" => "Integration and delivery points are defined", "completed" => false }})
    end
    state
  end  
  def add_patterns_work_started(state, essence_alpha_name) do
    if state.name == "Started" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Development started", "description" => "Development work has been started.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Progress monitored", "description" => "Work progress is monitored.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Definition of done in place", "description" => "The work is being broken down into actionable work items with clear definitions of done.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Tasks being progressed", "description" => "Team members are accepting and progressing tasks.", "completed" => false }})
    end
    state
  end  
  def add_patterns_work_under_control(state, essence_alpha_name) do
    if state.name == "Under Control" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Tasks being completed", "description" => "Tasks are being completed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Unplanned work under control", "description" => "Unplanned work is under control.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Risks under control", "description" => "Risks are under control as the impact if they occur and the likelihood of them occurring have been reduced to acceptable levels.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Estimates revised to reflect performance", "description" => "Estimates are revised to reflect the team’s performance.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Progress measured", "description" => "Measures are available to show progress and velocity.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Re-work under control", "description" => "Re-work is under control.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Commitments consistenly met", "description" => "Tasks are consistently completed on time and within their estimates.", "completed" => false }})
    end
    state
  end  
  def add_patterns_work_concluded(state, essence_alpha_name) do
    if state.name == "Concluded" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Only admin tasks left", "description" => "All outstanding tasks are administrative housekeeping or related to preparing the next piece of work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Results achieved", "description" => "Work results have been achieved.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Resulting system accepted", "description" => "The stakeholder(s) has accepted the resulting software system.", "completed" => false }})
    end
    state
  end  
  def add_patterns_work_closed(state, essence_alpha_name) do
    if state.name == "Closed" and essence_alpha_name == "Work" do
      add_pattern( state, %{"pattern" => %{"name" => "Lessons learned", "description" => "Lessons learned have been itemized, recorded and discussed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Metrics available", "description" => "Metrics have been made available.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Everything achieved", "description" => "Everything has been archived.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Budget reconciled & closed", "description" => "The budget has been reconciled and closed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Team released", "description" => "The team has been released.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "No outstanding, uncompleted tasks", "description" => "There are no outstanding, uncompleted tasks.", "completed" => false }})
    end
    state
  end  

  def add_patterns_way_of_working_principles_established(state, essence_alpha_name) do
    if state.name == "Principles Established" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "Team actively support principles", "description" => "Principles and constraints are committed to by the team.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Stakeholders agree with principles", "description" => "Principles and constraints are agreed to by the stakeholders.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Tool needs agreed", "description" => "The tool needs of the work and its stakeholders are agreed.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Approach recommended", "description" => "A recommendation for the approach to be taken is available.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Operational context understood", "description" => "The context within which the team will operate is understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Practice & tool constraints known", "description" => "The constraints that apply to the selection, acquisition, and use of practices and tools are known.", "completed" => false }})
    end
    state
  end  
  def add_patterns_way_of_working_foundation_established(state, essence_alpha_name) do
    if state.name == "Foundation Established" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "Key practices & tools selected", "description" => "The key practices and tools that form the foundation of the way-of-working are selected.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Practices needed to start work agreed", "description" => "Enough practices for work to start are agreed to by the team.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Non-negotiable practices & tools identified", "description" => "All non-negotiable practices and tools have been identified.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Gaps between available and needed way of working understood", "description" => "The gaps that exist between the practices and tools that are needed and the practices and tools that are available have been analyzed and understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Gaps in capability understood", "description" => "The capability gaps that exist between what is needed to execute the desired way of working and the capability levels of the team have been analyzed and understood.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Integrated way of working available", "description" => "The selected practices and tools have been integrated to form a usable way-of-working.", "completed" => false }})
    end
    state
  end  
  def add_patterns_way_of_working_in_use(state, essence_alpha_name) do
    if state.name == "In Use" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "Practices & tools in use", "description" => "The practices and tools are being used to do real work", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Regularly inspected", "description" => "The use of the practices and tools selected are regularly inspected.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Adapted to context", "description" => "The practices and tools are being adapted to the team’s context.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Supported by team", "description" => "The use of the practices and tools is supported by the team.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Feedback mechanisms in place", "description" => "Procedures are in place to handle feedback on the team’s way of working.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Practices & tools support collaboration", "description" => "The practices and tools support team communication and collaboration.", "completed" => false }})
    end
    state
  end  
  def add_patterns_way_of_working_in_place(state, essence_alpha_name) do
    if state.name == "In Place" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "Used by whole team", "description" => "The practices and tools are being used by the whole team to perform their work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Accessible to whole team", "description" => "All team members have access to the practices and tools required to do their work.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Inspected and adapted by whole team", "description" => "The whole team is involved in the inspection and adaptation of the way-of-working.", "completed" => false }})
    end
    state
  end  
  def add_patterns_way_of_working_working_well(state, essence_alpha_name) do
    if state.name == "Working Well" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "Predictable progress being made", "description" => "Team members are making progress as planned by using and adapting the way-of-working to suit their current context.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Practices naturally applied", "description" => "The team naturally applies the practices without thinking about them.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Tools naturally support way-of-working", "description" => "The tools naturally support the way that the team works.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Continually turned", "description" => "The team continually tunes their use of the practices and tools.", "completed" => false }})
    end
    state
  end  
  def add_patterns_way_of_working_retired(state, essence_alpha_name) do
    if state.name == "Retired" and essence_alpha_name == "Way-of-Working" do
      add_pattern( state, %{"pattern" => %{"name" => "No longer in use", "description" => "The team's way of working is no longer being used.", "completed" => false }})
      add_pattern( state, %{"pattern" => %{"name" => "Lessons learned shared", "description" => "Lessons learned are shared for future use.", "completed" => false }})
    end
    state
  end  
end
