<script>
  import { Router, Route, navigate } from "svelte-navigator"
  import NavLink from "../components/NavLink.svelte"

  import HomeSessions from "./HomeSessions.svelte"
  import HomeScoreSystmes from "./HomeScoreSystems.svelte"
  import HomeTournaments from "./HomeTournaments.svelte"
  import HomeTournamentSessions from "./HomeTournamentSessions.svelte"
  import HomeSettings from "./HomeSettings.svelte"

  import ACLogo from "../assets/svgs/ac-icon-white.svg"
  import SessionIcon from "../assets/svgs/icon-session.svg"
  import ScoreSystemsIcon from "../assets/svgs/icon-scoresystem.svg"
  import TournamentIcon from "../assets/svgs/icon-tournament.svg"
  import TournamentSessionIcon from "../assets/svgs/icon-tournamentsession.svg"
  import SettingsIcon from "../assets/svgs/icon-profile.svg"
  import ASLogo from "../assets/svgs/ac-icon-black.svg"


  import { localStorage } from "../services/storages"
  import HomeTournamentSession from "./HomeTournamentSessions.svelte";

  const user = localStorage.get("user")
  navigate("/home/sessions")
</script>

<div class="home">
  <header>
    <ACLogo height="30" width="30" />
    <div class="user">
      Hi, {user? user.username || user.email : "unknown"}
    </div>
  </header>
  <main>
    <Route path="sessions">
      <HomeSessions />
    </Route>
    <Route path="tournamentSessions">
      <HomeTournamentSessions />
    </Route>
    <Route path="tournaments">
      <HomeTournaments />
    </Route>
    <Route path="settings">
      <HomeSettings />
    </Route>
  </main>
  <nav>
    <NavLink to="/home/sessions">
      <SessionIcon class="icon" height="31" width="30" />
    </NavLink>
    <NavLink to="/home/tournamentSessions">
      <TournamentSessionIcon class="icon" height="31" width="31" />
    </NavLink>
    <NavLink to="/home/tournaments">
      <TournamentIcon class="icon" height="31" width="31" />
    </NavLink>
    <NavLink to="/home/settings">
      <SettingsIcon class="icon" height="31" width="31" />
    </NavLink>
  </nav>
</div>

<style lang="postcss">

.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1.25rem;
}
header {
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  & .user{
    font-family: 'Manrope', serif;
    flex-grow: 1;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    margin-left: -30px;
  }
}

main {
  flex-grow: 1;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & :global(.nav-link) {
    display: block;
    padding: 6px;
  }

  & :global(.active) {
    border-bottom: 4px solid var(--color-black);
  }
}
</style>
