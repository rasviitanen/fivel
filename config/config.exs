# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :fivel,
  ecto_repos: [Fivel.Repo]

# Configures the endpoint
config :fivel, FivelWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "h6p6Y0jxSj4PL//38QK9x1CdDIXc+eF9hj7tSdDHSgku2gvJUTHNNXtYlhE7slRv",
  render_errors: [view: FivelWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Fivel.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
