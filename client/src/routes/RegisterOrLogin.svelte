<script>
  import { navigate } from "svelte-navigator";
  import Button from "../components/Button.svelte"
  import ACLogo from "../assets/svgs/ac-icon-white.svg"
  import backgroundImage from "../assets/imgs/bg-targets.png"

  const navigateToLogin = () => {
    navigate("/auth/login")
  }

  const navigateToRegister = () => {
    navigate("/auth/register")
  }
</script>


<div class="register-or-login" style:background-image={`url(${backgroundImage})`}>
  <header>
    <ACLogo height="130" width="130" />
    <h1>ArrowScore</h1>
  </header>
  <main>
    <Button
      disabled={false}
      on:click|once={navigateToRegister}>
      Create account
    </Button>
    <Button
      theme="secondary"
      on:click|once={navigateToLogin}>
      Log in
    </Button>
  </main>
</div>


<style lang="postcss">
.register-or-login{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 100vh;
  width: 100vw;
  padding: 70px 22px 20px 22px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  & header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h1 {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }
  & main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.4rem;
    width: 100%;
  }
}
</style>
