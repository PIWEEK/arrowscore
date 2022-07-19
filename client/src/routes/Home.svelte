<script>
  import { Router, Route } from "svelte-navigator"
  import NavLink from "../components/NavLink.svelte"

  import HomeSessions from './HomeSessions.svelte'
  import HomeScoreSystmes from './HomeScoreSystems.svelte'
  import HomeTournaments from './HomeTournaments.svelte'
  import HomeProfile from './HomeProfile.svelte'

  import ACLogo from "../assets/svgs/ac-icon-white.svg"
  import SessionIcon from '../assets/svgs/icon-session.svg'
  import ScoreSystemsIcon from '../assets/svgs/icon-score.svg'
  import TournamentsIcon from '../assets/svgs/icon-tournament.svg'
  import ProfileIcon from '../assets/svgs/icon-profile.svg'
</script>

<div class="home">
  <header>
    <ACLogo height="30" width="30" />
    <div class="user">
      Hi, Yamila Moreno
    </div>
  </header>
  <main>
    <Route path="sessions" component={HomeSessions} />
    <Route path="score-systems" component={HomeScoreSystmes} />
    <Route path="tournaments" component={HomeTournaments} />
    <Route path="profile" component={HomeProfile} />
  </main>
  <nav>
    <NavLink to="/home/sessions">
      <SessionIcon class="icon" height="30" width="30" />
    </NavLink>
    <NavLink to="/home/score-systems">
      <ScoreSystemsIcon class="icon" height="30" width="30" />
    </NavLink>
    <NavLink to="/home/tournaments">
      <TournamentsIcon class="icon" height="30" width="30" />
    </NavLink>
    <NavLink to="/home/profile">
      <ProfileIcon class="icon" height="30" width="30" />
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
    flex-grow: 1;
    display: flex;
    justify-content: center;
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
