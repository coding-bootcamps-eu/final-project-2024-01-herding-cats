<template>
  <header><img src="@/assets/cat-logo/cat-logo-large.svg" alt="Herding Cats Logotype" /></header>
  <main class="start-page-main">
    <h1>
      Off to corral some kitty chaos.<br />
      See you around!
    </h1>

    <div class="backtoLogIn">
      <router-link :to="{ name: 'home' }"><button>Back to LogIn</button></router-link>
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100vw;
  height: 25.7rem;
}
img {
  padding: 3rem;
  margin-left: 1.5rem;
}

h1 {
  margin-top: 8rem;
  color: white;
  font-weight: 400;
  text-shadow: 0px 0.2rem 0.2rem rgba(255, 255, 255, 0.25);
}

.backtoLogIn {
  margin-top: 5rem;
}
</style>
