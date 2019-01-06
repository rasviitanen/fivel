defmodule Fivel.Pipeline do
    use Guardian.Plug.Pipeline,
      otp_app: :fivel,
      error_handler: Fivel.AuthErrorHandler,
      module: Fivel.Guardian
  
    # If there is an authorization header, restrict it to an access token and validate it
    plug Guardian.Plug.VerifyHeader
    # Load the user if either of the verifications worked
    plug Guardian.Plug.LoadResource
  end