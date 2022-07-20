<script>

	let email = '';
	let password = '';

    let user = '';
    let message = '';

    let scoresystems = [];
    let sessions = [];

	async function login() {
		const res = await fetch('http://10.10.105.95:1337/api/auth/local', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({ identifier: email, password })
		})
		if (res.ok) {
			const data = await res.json();
			localStorage.setItem('token', data.jwt);
			if (data) {
				user = data.user.username;

			}
		} else {
			const message = await res.json();

		}
	}
    async function showScoreSystems() {

        const res = await fetch('http://10.10.105.95:1337/api/sessions?populate=*', {
		    method: 'GET',
		    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
	    });
	    sessions = await res.json();
        console.log(sessions["data"]);
  	    return { body: sessions["data"] };
}
</script>

<div>
<form on:submit|preventDefault={login}>
	<h1>ArrowsCore Login Test against API</h1>

	<div>
		<label for="email">Email</label>
		<input type="email" placeholder="Enter your email" bind:value={email} />
	</div>
	<div>
		<label for="password">Password</label>
		<input type="password" placeholder="Enter your password" bind:value={password} />
	</div>
	<div>
		<button class="submit" type="submit">Login</button>
	</div>
</form>


{#if user!=""}
user is: {user}
{showScoreSystems()}
{#await scoresystems}
await
{#each scoresystems["data"] as s, idx}
la s
{s}
{/each}
{/await}
{/if}
</div>


