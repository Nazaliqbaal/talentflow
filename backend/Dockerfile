# ── Stage 1: BUILD ──────────────────────────────────────────────────────────
# Use the official .NET SDK image to compile the app.
# "sdk" has the compiler. We don't ship it in production — that's the point of 2 stages.
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build

WORKDIR /src

# Copy the project file first and restore (download) dependencies.
# Doing this before copying all source files lets Docker cache this layer —
# if you only change code (not .csproj), the restore step is skipped on rebuild.
COPY TalentFlow.API.csproj .
RUN dotnet restore

# Now copy the rest of the source code and publish a release build.
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ── Stage 2: RUNTIME ────────────────────────────────────────────────────────
# Use the much smaller "aspnet" runtime image — no compiler, just what's needed to run.
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview

WORKDIR /app

# Copy only the compiled output from stage 1 into this lean image.
COPY --from=build /app/publish .

# Tell Docker this container listens on port 8080.
EXPOSE 8080

# The command that runs when the container starts.
ENTRYPOINT ["dotnet", "TalentFlow.API.dll"]
